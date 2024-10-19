import * as THREE from "three";
import React, {
  forwardRef,
  useLayoutEffect,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { extend, useLoader, useThree } from "@react-three/fiber";

extend({ TextGeometry });

const Text = forwardRef(
  (
    {
      children,
      vAlign = "center",
      hAlign = "center",
      fontSize,
      height,
      scale,
      color = "#000000",
      setLogoScreenPosition,
      ...props
    },
    ref
  ) => {
    const font = useLoader(
      FontLoader,
      "/three-fonts/minimized/Fira Sans Eight_Regular.json"
    );
    const config = useMemo(
      () => ({ font, size: fontSize, height }),
      [font, fontSize, height]
    );
    const { size, camera } = useThree();

    const mesh = useRef();
    useLayoutEffect(() => {
      const bbSize = new THREE.Vector3();
      mesh.current.geometry.computeBoundingBox();
      mesh.current.geometry.boundingBox.getSize(bbSize);
      mesh.current.position.x =
        hAlign === "center"
          ? -bbSize.x / 2
          : hAlign === "right"
          ? 0
          : -bbSize.x;
      mesh.current.position.y =
        vAlign === "center" ? -bbSize.y : vAlign === "top" ? 0 : -bbSize.y;

/*       if (size) {
        const vector = new THREE.Vector3();
        mesh.current.getWorldPosition(vector);
        vector.project(camera);

        const screenX = (vector.x * 0.5 + 0.5) * size.width;
        const screenY = (-vector.y * 0.5 + 0.5) * size.height;

        // Update the position in state
        setLogoScreenPosition({ x: screenX, y: screenY });
      } */
    }, [children, size, fontSize, height]);

    return (
      <group ref={ref} {...props} scale={scale}>
        <mesh ref={mesh}>
          <textGeometry args={[children, config]} />
          <meshStandardMaterial
            color={color}
            emissive="#ffffff"
            emissiveIntensity={2.0}
          />
        </mesh>
      </group>
    );
  }
);
export default Text;
