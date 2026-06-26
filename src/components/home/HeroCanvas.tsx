"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap-init";

const PARTICLE_COUNT = 35000;

function getParticleColor(): THREE.Color {
  const roll = Math.random();
  const color = new THREE.Color();

  if (roll < 0.6) {
    color.setHSL(
      0.59 + Math.random() * 0.03,
      0.5 + Math.random() * 0.2,
      0.5 + Math.random() * 0.15
    );
  } else if (roll < 0.85) {
    color.setHSL(
      0.58 + Math.random() * 0.03,
      0.1 + Math.random() * 0.1,
      0.7 + Math.random() * 0.15
    );
  } else {
    color.setHSL(0.583, 0.05, 0.85 + Math.random() * 0.1);
  }

  return color;
}

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const vertexCount = torusKnot.attributes.position.count;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vi = i % vertexCount;
      const x = torusKnot.attributes.position.getX(vi);
      const y = torusKnot.attributes.position.getY(vi);
      const z = torusKnot.attributes.position.getZ(vi);

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      const color = getParticleColor();
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    torusKnot.dispose();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const currentPos = new THREE.Vector3();
    const originalPos = new THREE.Vector3();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const returnForce = new THREE.Vector3();
    const mouseWorld = new THREE.Vector3();

    let scrollProgress = 0;

    const st = ScrollTrigger.create({
      trigger: container.parentElement,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

      // Weaken return force as scroll progresses — particles disperse
      const returnStrength = 0.001 * (1 - scrollProgress * 0.7);
      const damping = 0.95 - scrollProgress * 0.03;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        currentPos.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
        originalPos.set(
          originalPositions[i3],
          originalPositions[i3 + 1],
          originalPositions[i3 + 2]
        );
        velocity.set(velocities[i3], velocities[i3 + 1], velocities[i3 + 2]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          direction.subVectors(currentPos, mouseWorld).normalize().multiplyScalar(force);
          velocity.add(direction);
        }

        returnForce.subVectors(originalPos, currentPos).multiplyScalar(returnStrength);
        velocity.add(returnForce);
        velocity.multiplyScalar(damping);

        positions[i3] += velocity.x;
        positions[i3 + 1] += velocity.y;
        positions[i3 + 2] += velocity.z;

        velocities[i3] = velocity.x;
        velocities[i3 + 1] = velocity.y;
        velocities[i3 + 2] = velocity.z;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.05;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      st.kill();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}
