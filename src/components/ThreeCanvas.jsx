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
  Environment,
  Lightformer,
} from "@react-three/drei";
import ThreeCanvasUpdater from "./ThreeCanvasUpdater";
import { FirstSectionCanvas } from "./Sections/FirstSection";
import Effects from "../Effects";
import { useSelector } from "react-redux";
import { selectScrollTop, selectThreshold } from "../redux/scrollSlice";
import LayerCardSection from "./Sections/LayerCardSection";

const ThreeCanvasContent = () => {
  const group = useRef();
  const backgroundRef = useRef();
  const { viewport, size } = useThree();

  const scrollTop = useSelector(selectScrollTop);
  const threshold = useSelector(selectThreshold);

  const vec = new THREE.Vector3();
  const pageLerp = useRef(scrollTop / size.height);

  const pageRef = useRef();

  useFrame(() => {

    pageRef.current = pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      scrollTop / size.height,
      0.5
    );
    const y = pageRef.current * viewport.height;
    const sticky = threshold * viewport.height;
    group.current.position.lerp(
      vec.set(
        0,
        pageRef.current < threshold ? y : sticky,
        pageRef.current < threshold ? 0 : pageRef.current * 2.5
      ),
      0.1
    );

    backgroundRef.current.position.lerp(
      vec.set(0, 0, pageRef.current < threshold ? 0 : pageRef.current * 2.5),
      0.1
    );
  });

  return (
    <>
      <ThreeBackgroundVideo ref={backgroundRef} />
      <group ref={group}>
        <FirstSectionCanvas />
        <LayerCardSection />
      </group>
    </>
  );
};

const ThreeCanvas = () => {
  return (
    <Canvas
      shadows
      linear
      dpr={[1, 2]}
      camera={{ fov: 100, position: [0, 0, 30], near: 0.1, far: 1000 }}
    >
      <ThreeCanvasUpdater />
      <color attach="background" args={["#f1f1f3"]} />
      <ambientLight intensity={0.5} />

      <directionalLight position={[0, 0, 10]} intensity={1} castShadow />

      <Effects />
      <ThreeCanvasContent />
    </Canvas>
  );
};

export default ThreeCanvas;
