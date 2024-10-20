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
import LayerCardSection from "./Sections/LayerCardSection";

const ThreeCanvasContent = () => {
  const group = useRef();
  const backgroundRef = useRef();
  const { viewport, size } = useThree();

  const scrollTop = useSelector(selectScrollTop);
  const threshold = useSelector(selectThreshold);

  const vec = new THREE.Vector3();
  const pageLerp = useRef(scrollTop / size.height);

  const pageRef = useRef()

  useFrame(() => {
    const lerpFactor = 0.2;

    pageRef.current = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      scrollTop / size.height,
      lerpFactor
    ));
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
        vec.set(
          0,
          0,
          pageRef.current < threshold ? 0 : pageRef.current * 2.5
        ),
        0.1
      );
    
  });

  return (
   <>
    <ThreeBackgroundVideo ref={backgroundRef}/>
    <group ref={group}>
      <FirstSectionCanvas />
      <LayerCardSection />
    </group>
   </>
  );
};

const ThreeCanvas = () => {
  return (
    <Canvas linear dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
      <ThreeCanvasUpdater />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <spotLight
          castShadow
          angle={0.3}
          penumbra={1}
          position={[0, 10, 20]}
          intensity={5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      <Effects />
      <ThreeCanvasContent />
    </Canvas>
  );
};

export default ThreeCanvas;
