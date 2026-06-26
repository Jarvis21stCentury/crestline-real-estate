"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap-init";

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform vec2 u_mouse;
  uniform float u_time;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float dist = distance(uv, u_mouse);
    float proximity = 1.0 - smoothstep(0.0, 0.4, dist);

    float angle = u_time * 2.0 + dist * 10.0;
    vec2 offset = vec2(
      sin(angle + uv.y * 8.0) * 0.02,
      cos(angle + uv.x * 8.0) * 0.02
    );

    uv += offset * u_intensity * proximity;

    vec4 color = texture2D(u_image, uv);

    float r = texture2D(u_image, uv + vec2(0.003, 0.0) * u_intensity * proximity).r;
    float b = texture2D(u_image, uv - vec2(0.003, 0.0) * u_intensity * proximity).b;
    color.r = r;
    color.b = b;

    gl_FragColor = color;
  }
`;

interface ImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}

export function ImageDistortion({
  src,
  alt,
  className = "",
  intensity = 1.0,
}: ImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let disposed = false;

    const init = async () => {
      const THREE = await import("three");

      if (disposed) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width || 400;
      const height = rect.height || 300;
      const dpr = Math.min(window.devicePixelRatio, 2);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
      camera.position.z = 1;

      const textureLoader = new THREE.TextureLoader();
      const texture = await new Promise<InstanceType<typeof THREE.Texture>>((resolve) => {
        textureLoader.load(src, resolve);
      });

      if (disposed) {
        renderer.dispose();
        return;
      }

      const uniforms = {
        u_image: { value: texture },
        u_intensity: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_time: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
      });

      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let animId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        animId = requestAnimationFrame(animate);
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
      };

      const onMouseMove = (e: MouseEvent) => {
        const r = container.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = 1.0 - (e.clientY - r.top) / r.height;
        uniforms.u_mouse.value.set(x, y);
      };

      const onMouseEnter = () => {
        gsap.to(uniforms.u_intensity, { value: intensity, duration: 0.6, ease: "power3.out" });
        animate();
        setReady(true);
      };

      const onMouseLeave = () => {
        gsap.to(uniforms.u_intensity, {
          value: 0,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            cancelAnimationFrame(animId);
            renderer.render(scene, camera);
            setReady(false);
          },
        });
      };

      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
      container.addEventListener("mousemove", onMouseMove);

      const ro = new ResizeObserver(([entry]) => {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) renderer.setSize(w, h);
      });
      ro.observe(container);

      cleanupRef.current = () => {
        disposed = true;
        cancelAnimationFrame(animId);
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
        container.removeEventListener("mousemove", onMouseMove);
        ro.disconnect();
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
      };
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cleanupRef.current) {
          init();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);

    return () => {
      disposed = true;
      observer.disconnect();
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [src, intensity]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
