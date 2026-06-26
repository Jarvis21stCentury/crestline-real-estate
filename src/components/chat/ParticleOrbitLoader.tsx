"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 24;
const ORBIT_COUNT = 3;

export function ParticleOrbitLoader({ size = 80 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const orbits: { radius: number; speed: number; phase: number; tilt: number }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const orbitIndex = i % ORBIT_COUNT;
      const radius = 0.8 + orbitIndex * 0.4;
      const speed = 1.2 - orbitIndex * 0.3 + (Math.random() - 0.5) * 0.3;
      const phase = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5;
      const tilt = (orbitIndex - 1) * 0.3;

      orbits.push({ radius, speed, phase, tilt });

      const color = new THREE.Color();
      color.setHSL(
        0.58 + Math.random() * 0.04,
        0.4 + Math.random() * 0.3,
        0.55 + Math.random() * 0.3
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const orbit = orbits[i];
        const angle = t * orbit.speed + orbit.phase;
        const i3 = i * 3;

        positions[i3] = Math.cos(angle) * orbit.radius;
        positions[i3 + 1] = Math.sin(angle * 0.7) * orbit.tilt;
        positions[i3 + 2] = Math.sin(angle) * orbit.radius;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.15;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [size]);

  return <div ref={mountRef} style={{ width: size, height: size }} />;
}
