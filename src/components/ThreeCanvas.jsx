import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Header from "./Header";
import { ThreeBackgroundVideo } from "./BackgroundVideo";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useIntersect,
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  useGLTF,
  Html,
} from "@react-three/drei";
import ThreeCanvasUpdater from "./ThreeCanvasUpdater";
import { FirstSectionCanvas } from "./Sections/FirstSection";
import Effects from "../Effects";
import { useSelector } from "react-redux";
import { selectScrollTop, selectThreshold } from "../redux/scrollSlice";

const ThreeCanvasContent = () => {
  const group = useRef();
  const { viewport, size } = useThree();

  const scrollTop = useSelector(selectScrollTop);
  const threshold = useSelector(selectThreshold);

  const vec = new THREE.Vector3();
  const pageLerp = useRef(scrollTop / size.height);

  useFrame(() => {

    const lerpFactor = 0.3;


    const page = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      scrollTop / size.height,
      lerpFactor
    ));
    const y = page * viewport.height;
    const sticky = threshold * viewport.height;
    group.current.position.lerp(
      vec.set(
        0,
        page < threshold ? y : sticky,
        page < threshold ? 0 : page * 1.25
      ),
      lerpFactor
    );
  });

  return (
    <group ref={group}>
      <FirstSectionCanvas />
    </group>
  );
};

const ThreeCanvas = () => {
  return (
    <Canvas linear dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
      <ThreeCanvasUpdater />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[0, 0, 30]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>
      <ThreeBackgroundVideo />
      <Effects />
      <ThreeCanvasContent />
    </Canvas>
  );
};

export default ThreeCanvas;
