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
import LayerCardSection from "./Sections/LayerCardSection";

const ThreeCanvasContent = ({ domRef }) => {
  const group = useRef();
  const backgroundRef = useRef();
  const smoothScroll = useRef(0);
  const layerCardSectionRef = useRef()

  const { viewport, size } = useThree();
  const vec = new THREE.Vector3();


  useFrame((state, delta) => {
    const scrollEl = domRef?.current?.scrollAreaRef?.current;

    if (!scrollEl) return

    const scrollTop = scrollEl.scrollTop;
    const scrollHeight = scrollEl.scrollHeight;
    const clientHeight = scrollEl.clientHeight;
    const scrollableHeight = scrollHeight - clientHeight;
    const scrollCurrent = scrollTop / scrollableHeight;

    const pages = scrollHeight / clientHeight;
    const totalDistance = viewport.height * (pages - 1);

    // Damping factor
    const dampingFactor = 100;

    // Smoothly interpolate the scroll offset
    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current,
      scrollCurrent,
      dampingFactor,
      delta
    );



    const positionTop = layerCardSectionRef.current.positionTop;
    const threshold = -positionTop / totalDistance;
  
    // Positions
    const yPosition =
      smoothScroll.current < threshold
        ? smoothScroll.current * totalDistance
        : threshold * totalDistance;
    const zScrollFactor = 250; // Adjust as needed
    const zPosition =
      smoothScroll.current < threshold
        ? 0
        : (smoothScroll.current - threshold) * zScrollFactor;

    group.current.position.lerp(
      vec.set(
        0,
         yPosition,
         zPosition
      ),
      0.2
    );

     backgroundRef.current.position.lerp(
      vec.set(0, 0, smoothScroll.current < threshold ? 0 : zPosition),
      0.2
    ); 
  });

  return (
    <>
      <ThreeBackgroundVideo ref={backgroundRef} />
      {/* my scrollable group */}
      <group ref={group}>
        <FirstSectionCanvas domRef={domRef} />
        <LayerCardSection domRef={domRef} ref={layerCardSectionRef}/>
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
