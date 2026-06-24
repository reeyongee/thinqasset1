"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Carousel from "./Carousel";
import { IMAGE_LIST } from "./constants";
import { shuffleImages } from "./utils";

function HeroCarouselContent() {
  const sharedGeometry = useMemo(
    () => new THREE.PlaneGeometry(1, 1, 12, 12),
    [],
  );

  const columnImages = useMemo(
    () => Array.from({ length: 4 }, () => shuffleImages(IMAGE_LIST)),
    [],
  );

  const ribbonProps = {
    imageSize: [0.62, 0.78] as [number, number],
    gap: 0,
    geometry: sharedGeometry,
  };

  return (
    <group position={[0.25, 0, 0]}>
      <Carousel
        {...ribbonProps}
        images={columnImages[0]}
        wheelFactor={0.3}
        position={[-0.6, 0, 0]}
        curveFrequency={0.4}
        curveStrength={0.6}
      />
      <Carousel
        {...ribbonProps}
        images={columnImages[1]}
        wheelFactor={0.4}
      />
      <Carousel
        {...ribbonProps}
        images={columnImages[2]}
        wheelFactor={0.5}
        position={[0.6, 0, 0]}
        curveFrequency={0.4}
        curveStrength={-0.6}
      />
      <Carousel
        {...ribbonProps}
        images={columnImages[3]}
        wheelFactor={0.6}
        position={[1.2, 0, 0]}
        curveFrequency={0.4}
        curveStrength={-0.9}
      />
    </group>
  );
}

export function HeroCarouselScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    IMAGE_LIST.forEach((src) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="hero__carousel__stage">
      <Canvas
        className="hero__carousel__canvas"
        dpr={[1, 1.25]}
        frameloop={active ? "always" : "never"}
        camera={{
          position: [0, 0, 4.25],
          rotation: [0, 0, Math.PI / 5],
          fov: 42,
        }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <HeroCarouselContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
