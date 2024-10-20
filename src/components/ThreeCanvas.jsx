
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


const ThreeCanvas = ()=>{



    return <Canvas linear dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
    <ThreeCanvasUpdater />
    <ambientLight intensity={0.5} />
    <directionalLight
      position={[0, 0, 30]}
      shadow-mapSize={[256, 256]}
      shadow-bias={-0.0001}
      castShadow
    >
      <orthographicCamera
        attach="shadow-camera"
        args={[-10, 10, -10, 10]}
      />
    </directionalLight>
    <ThreeBackgroundVideo />
    <Effects />
    <FirstSectionCanvas />
  </Canvas>
}



export default ThreeCanvas;