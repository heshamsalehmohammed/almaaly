import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
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
import ContactUs from "./Sections/ContactUs";

const ThreeCanvasContent = ({ domRef, sceneStateRef }) => {
  const group = useRef();
  const backgroundRef = useRef();
  const smoothScroll = useRef(0);
  const layerCardRef = useRef();
  const { viewport, size } = useThree();

  useLayoutEffect(() => {
    sceneStateRef.current.scenePages =
      domRef.current.domStateRef.current.domPages;
    sceneStateRef.current.clientHeight = viewport.height;
    sceneStateRef.current.scrollHeight =
      viewport.height * domRef.current.domStateRef.current.domPages;
    sceneStateRef.current.scrollableHeight =
      viewport.height * (domRef.current.domStateRef.current.domPages - 1);
      sceneStateRef.current.startScenePositionForScrollingZ = layerCardRef.current.startScenePositionForScrollingZ;
    sceneStateRef.current.threshold =
      -layerCardRef.current.startScenePositionForScrollingZ /
      sceneStateRef.current.scrollableHeight;

      sceneStateRef.current.zScrollFactor = 30 * (domRef.current.domStateRef.current.domPages - 1);
  }, [viewport, domRef.current.domStateRef.current.domPages]);

  const vec = new THREE.Vector3();

  useFrame((state, delta) => {
    if (!domRef.current) return;
    // Damping factor
    const dampingFactor = 100;

    // Smoothly interpolate the scroll offset
    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current,
      domRef.current.domStateRef.current.normalizedScrollTop,
      dampingFactor,
      delta
    );

    // Positions
    sceneStateRef.current.yPosition =
      smoothScroll.current < sceneStateRef.current.threshold
        ? smoothScroll.current * sceneStateRef.current.scrollableHeight
        : sceneStateRef.current.threshold *
          sceneStateRef.current.scrollableHeight;

    sceneStateRef.current.zPosition =
      smoothScroll.current < sceneStateRef.current.threshold
        ? 0
        : (smoothScroll.current - sceneStateRef.current.threshold) * sceneStateRef.current.zScrollFactor;

    group.current.position.lerp(
      vec.set(
        0,
        sceneStateRef.current.yPosition,
        sceneStateRef.current.zPosition
      ),
      0.2
    );
    backgroundRef.current.position.lerp(
      vec.set(
        0,
        0,
        smoothScroll.current < sceneStateRef.current.threshold
          ? 0
          : sceneStateRef.current.zPosition
      ),
      0.2
    );
  });

  return (
    <>
      <ThreeBackgroundVideo ref={backgroundRef} />
      <group ref={group}>
        <FirstSectionCanvas domRef={domRef} />
        <LayerCardSection
          domRef={domRef}
          sceneStateRef={sceneStateRef}
          ref={layerCardRef}
        />
      </group>
    </>
  );
};

const ThreeCanvas = forwardRef(({ domRef },ref) => {

  const sceneStateRef = useRef({
    scrollableHeight: 0,
    scrollHeight: 0,
    clientHeight: 0,
    scenePages: 0,
    startScenePositionForScrollingZ:0,
    threshold: 0,
    yPosition: 0,
    zPosition: 0,
    zScrollFactor: 250,
  });

  useImperativeHandle(ref, () => {
    return {
      sceneStateRef,
    };
  });

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

      <Effects domRef={domRef} sceneStateRef={sceneStateRef} />
      <ThreeCanvasContent domRef={domRef} sceneStateRef={sceneStateRef} />
    </Canvas>
  );
});

export default ThreeCanvas;
