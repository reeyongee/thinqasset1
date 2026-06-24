"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollRampRef, scrollVelocityRef } from "../scrollVelocity";
import GLImage from "./GLImage";
import { mod } from "./utils";

const IDLE_DRIFT = 0.0042;

type CarouselProps = {
  images: string[];
  position?: [number, number, number];
  rotation?: [number, number, number];
  imageSize: [number, number];
  gap: number;
  wheelFactor?: number;
  wheelDirection?: 1 | -1;
  curveStrength?: number;
  curveFrequency?: number;
  geometry: THREE.PlaneGeometry;
};

export default function Carousel({
  images,
  position,
  rotation,
  imageSize,
  gap,
  wheelFactor = 1,
  wheelDirection = 1,
  curveStrength = 0,
  curveFrequency = 0,
  geometry,
}: CarouselProps) {
  const imageRefs = useRef<THREE.Mesh[]>([]);
  const reducedMotionRef = useRef<boolean | null>(null);

  const totalHeight = images.length * gap + images.length * imageSize[1];

  useFrame(() => {
    if (reducedMotionRef.current === null) {
      reducedMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }

    const velocity = scrollVelocityRef.current;
    const ramp = scrollRampRef.current;
    const factor = wheelFactor * wheelDirection;
    const idleDrift = reducedMotionRef.current ? 0 : IDLE_DRIFT * factor;
    const scrollDelta =
      idleDrift + velocity * 0.005 * factor * ramp;
    const scrollUniform = scrollDelta;

    imageRefs.current.forEach((ref) => {
      if (!ref) return;

      ref.position.y -= scrollDelta;
      ref.position.y =
        mod(ref.position.y + totalHeight / 2, totalHeight) - totalHeight / 2;

      const material = ref.material as THREE.ShaderMaterial;
      material.uniforms.uScrollSpeed.value = scrollUniform;
    });
  });

  const positions = useMemo(
    () =>
      images.map(
        (_, index) =>
          [0, index * (imageSize[1] + gap), 0] as [number, number, number],
      ),
    [gap, imageSize, images],
  );

  return (
    <group position={position ?? [0, 0, 0]} rotation={rotation ?? [0, 0, 0]}>
      {images.map((url, index) => (
        <GLImage
          key={`${url}-${index}`}
          imageUrl={url}
          scale={[imageSize[0], imageSize[1], 1]}
          geometry={geometry}
          curveStrength={curveStrength}
          curveFrequency={curveFrequency}
          position={positions[index]}
          ref={(el) => {
            if (el) imageRefs.current[index] = el;
          }}
        />
      ))}
    </group>
  );
}
