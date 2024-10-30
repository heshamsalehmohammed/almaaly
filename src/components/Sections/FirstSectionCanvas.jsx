import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useIntersect } from "@react-three/drei";
import Text from "../../Text";

function LogoText({domRef}) {
  const visible = useRef(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { viewport } = useThree();
  const height = viewport.height;

  const TextScaleFactor = Math.min(1, viewport.width / 128);

  useFrame((state, delta) => {
    const mouse =  domRef.current.domStateRef.current.mouse
    if (ref.current) {
      ref.current.position.y = THREE.MathUtils.damp(
        ref.current.position.y,
        height / 3 + 1,
        2,
        delta
      );
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        mouse[0] * 2,
        0.1
      );
      /*       ref.current.rotation.x = THREE.MathUtils.lerp(
          ref.current.rotation.x,
          state.mouse.y / 2,
          0.1
        ); */
      ref.current.rotation.y = 0.01;
    }
  });

  return (
    <group ref={ref} renderOrder={4}>
      <Text
        fontSize={20 * TextScaleFactor}
        height={5}
        scale={[1, 1, 0.1]}
        color="#ffffff" // Use a bright color for better Bloom effect'
        emissive="#ffffff" // Bright enough to trigger bloom
        emissiveIntensity={2.0} // Higher than the bloom threshold
      >
        Almaaly
      </Text>
    </group>
  );
}

export const FirstSectionCanvas = ({domRef}) => {
  return <LogoText domRef={domRef}/>;
};

