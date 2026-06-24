"use client";

import { useTexture } from "@react-three/drei";
import { forwardRef, useMemo, useRef } from "react";
import * as THREE from "three";
import { imageFragmentShader, imageVertexShader } from "./shaders";

type GLImageProps = {
  imageUrl: string;
  scale: [number, number, number];
  position?: [number, number, number];
  curveStrength?: number;
  curveFrequency?: number;
  geometry: THREE.PlaneGeometry;
};

const GLImage = forwardRef<THREE.Mesh, GLImageProps>(
  (
    {
      imageUrl,
      scale,
      position = [0, 0, 0],
      curveStrength = 0,
      curveFrequency = 0,
      geometry,
    },
    forwardedRef,
  ) => {
    const localRef = useRef<THREE.Mesh>(null);
    const imageRef = forwardedRef || localRef;
    const texture = useTexture(imageUrl);

    const imageSizes = useMemo((): [number, number] => {
      const image = texture.image as HTMLImageElement | undefined;
      if (!image?.width || !image?.height) return [1, 1];
      return [image.width, image.height];
    }, [texture]);

    const shaderArgs = useMemo(
      () => ({
        uniforms: {
          uTexture: { value: texture },
          uScrollSpeed: { value: 0 },
          uPlaneSizes: { value: new THREE.Vector2(scale[0], scale[1]) },
          uImageSizes: {
            value: new THREE.Vector2(imageSizes[0], imageSizes[1]),
          },
          uCurveStrength: { value: curveStrength },
          uCurveFrequency: { value: curveFrequency },
        },
        vertexShader: imageVertexShader,
        fragmentShader: imageFragmentShader,
      }),
      [texture, curveStrength, curveFrequency, scale, imageSizes],
    );

    return (
      <mesh position={position} ref={imageRef} scale={scale}>
        <primitive object={geometry} attach="geometry" />
        <shaderMaterial {...shaderArgs} />
      </mesh>
    );
  },
);

GLImage.displayName = "GLImage";

export default GLImage;
