import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const Effects = ({domRef,sceneStateRef}) => {
  const vignetteRef = useRef();

  const darknessTarget = useRef(0.9); // To store the target darkness value

  useFrame((_, delta) => {
 
    const scrollY = domRef.current.domStateRef.current.normalizedScrollTop; // Normalized scroll value (0 to 1)
    const start = 0.5 * sceneStateRef.current.clientHeight / sceneStateRef.current.scrollableHeight; // Corresponds to 50vh
    const end = sceneStateRef.current.clientHeight / sceneStateRef.current.scrollableHeight; // Corresponds to 100vh

    // Interpolate darkness between 0.9 and 0
    const progress = (scrollY - start) / (end - start);
    darknessTarget.current = Math.max(0, Math.min(0.9 * (1 - progress), 0.9)); // Clamp between 0 and 0.9

    // Smoothly interpolate using THREE.MathUtils.lerp
    if (vignetteRef.current) {
      vignetteRef.current.darkness = THREE.MathUtils.lerp(
        vignetteRef.current.darkness, // Current value
        darknessTarget.current, // Target value
        delta * 5 // Damping factor (adjust for smoothness)
      );
    }
  });
  return (
    <EffectComposer>
      <Bloom
        blendFunction={BlendFunction.ADD}
        intensity={1.5} // Adjust intensity as needed
        luminanceThreshold={1} // Lower threshold for selective bloom
        luminanceSmoothing={0.9}
        height={300}
      />

      <Noise opacity={0.02} />

      <Vignette eskil={false} offset={0.01} darkness={0.9} ref={vignetteRef} />
    </EffectComposer>
  );
};

export default Effects;
