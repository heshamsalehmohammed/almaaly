import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
import ThreeCanvasUpdater from "./components/ThreeCanvasUpdater";

function CanvasScrolledItems() {
  return <FirstSectionCanvas />;
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
    <Scroll html>
      <FirstSectionHtml />
      <SecondSection />
      <ThirdSection />
      <FourthSection />

      <BottomPage />
    </Scroll>
  );
};

const App = () => {
  const scrollAreaRef = useRef();
  const fixedElementRef = useRef();
  const { current: state } = useRef({});
  const onScroll = (e) => (state.top = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollAreaRef.current }), []);
  useEffect(() => {
    document.body.style.cursor =
      "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto";
  }, []);

  const getMaxScroll = () => window.innerHeight * 3; // 400vh
  const ticking = useRef(false);
  const maxScrollRef = useRef(getMaxScroll());

  // Function to calculate max scroll

  const handleScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollTop = scrollAreaRef.current.scrollTop;
        const maxScroll = maxScrollRef.current;
        const clampedScrollTop = Math.min(scrollTop, maxScroll);
        fixedElementRef.current.style.transform = `translateY(-${clampedScrollTop}px)`;
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  const handleResize = () => {
    maxScrollRef.current = getMaxScroll();
    // Optionally, adjust the transform if needed
    const scrollTop = scrollAreaRef.current.scrollTop;
    const clampedScrollTop = Math.min(scrollTop, maxScrollRef.current);
    fixedElementRef.current.style.transform = `translateY(-${clampedScrollTop}px)`;
  };

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    scrollArea.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      scrollArea.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <Canvas linear dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
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
        <CanvasScrolledItems />
      </Canvas>
      <div
        className="scrollArea"
        ref={scrollAreaRef}
        onScroll={onScroll}
        onPointerMove={(e) =>
          (state.mouse = [
            (e.clientX / window.innerWidth) * 2 - 1,
            (e.clientY / window.innerHeight) * 2 - 1,
          ])
        }
      >
        <div style={{ width: "100vw", height: `${4 * 100}vh`, zIndex: "1000" }}>
          <div className="fixed-element">
            <div class="fixed-element-Content" ref={fixedElementRef}>
              <FirstSectionHtml />
              <SecondSection />
              <ThirdSection />
              <FourthSection />
            </div>
          </div>

          <BottomPage />
        </div>
      </div>
      <SocialIcons />
    </>
  );
};
export default App;
