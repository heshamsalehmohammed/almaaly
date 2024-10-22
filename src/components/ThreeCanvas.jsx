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
import {  selectThreshold } from "../redux/scrollSlice";
import LayerCardSection from "./Sections/LayerCardSection";

const ThreeCanvasContent = ({ domRef }) => {
  const group = useRef();
  const backgroundRef = useRef();
  const { viewport, size } = useThree();

  const threshold = useSelector(selectThreshold);
  const vec = new THREE.Vector3();

  useFrame(() => {
    let scrollTop =  domRef?.current?.domStateRef?.current?.scrollTop ?? 0;
    let pageLerp = scrollTop / size.height;
    let page = pageLerp = THREE.MathUtils.lerp(
      pageLerp,
      scrollTop / size.height,
      0.5
    );


    
    let y = page * viewport.height;
    let sticky = threshold * viewport.height;






    group.current.position.lerp(
      vec.set(
        0,
        page < threshold ? y : sticky,
        page < threshold ? 0 : page * 2.5
      ),
      0.1
    );

    backgroundRef.current.position.lerp(
      vec.set(0, 0, page < threshold ? 0 : page * 2.5),
      0.1
    );
  });

  return (
    <>
      <ThreeBackgroundVideo ref={backgroundRef} />
      <group ref={group}>
        <FirstSectionCanvas domRef={domRef} />
        <LayerCardSection domRef={domRef} />
      </group>
    </>
  );
};

const ThreeCanvas = ({ domRef }) => {
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

      <Effects domRef={domRef} />
      <ThreeCanvasContent domRef={domRef} />
    </Canvas>
  );
};

export default ThreeCanvas;
