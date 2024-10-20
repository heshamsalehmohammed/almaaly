import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import { ThreeBackgroundVideo } from "./components/BackgroundVideo";
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./bootstrap-addon.css";

import "./App.css";
import Text from "./Text";
import Effects from "./Effects";
import { Slide, Fade } from "react-awesome-reveal";
import SocialIcons from "./components/SocilaIcons";
import { Button } from "primereact/button";

import { Geometry, Base, Addition } from "@react-three/csg";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import SecondSection from "./components/Sections/SecondSection";
import ThirdSection from "./components/Sections/ThirdSection";
import FourthSection from "./components/Sections/FourthSection";
import BottomPage from "./components/BottomPage";
import {
  FirstSectionCanvas,
  FirstSectionHtml,
} from "./components/Sections/FirstSection";

function CanvasScrolledItems() {
  return (
    <Scroll>
      <FirstSectionCanvas />
    </Scroll>
  );
}

const HtmlScrolledItems = () => {
  const scroll = useScroll(); // Get the scroll API

  const scrollToSection = (section) => {
    // Set scroll position manually
    const totalPages = 6; // Make sure this matches your ScrollControls pages
    const targetScroll = section / totalPages;
    scroll.el.scrollTop = targetScroll * scroll.el.scrollHeight; // Scroll to the calculated position
  };

  return (
    <Scroll html style={{ width: "100vw", zIndex: 10 }}>
      <FirstSectionHtml />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </Scroll>
  );
};

const App = () => {
  useEffect(() => {
    document.body.style.cursor =
      "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto";
  }, []);

  return (
    <PageProvider>
      <Header />

      <Canvas linear dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
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

        <ScrollControls pages={4}>
          <Effects />
          <CanvasScrolledItems />
          <HtmlScrolledItems />
        </ScrollControls>
      </Canvas>

      <SocialIcons />
    </PageProvider>
  );
};
export default App;
