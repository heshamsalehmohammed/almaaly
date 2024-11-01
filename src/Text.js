import * as THREE from "three";
import { forwardRef, useLayoutEffect, useRef, useMemo } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { extend, useLoader, useThree } from "@react-three/fiber";
import { getCurrentLanguage } from './helpers';

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
      ...props
    },
    ref
  ) => {
    const font = useLoader(
      FontLoader,
      `${getCurrentLanguage()}/three-fonts/minimized/FiraSansEight_Regular.json`
    );
    const config = useMemo(
      () => ({ font, size: fontSize, depth:height }),
      [font, fontSize, height]
    );
    const { size } = useThree();

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

    }, [children, size, fontSize, height,hAlign,vAlign]);

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
