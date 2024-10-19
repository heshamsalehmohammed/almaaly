import { useCallback, useEffect, useRef, useState } from "react";
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
import { isPositiveNumber } from "./packages/PageScroll/utils";
import { Slide,Fade,JackInTheBox,Roll,Zoom,Bounce } from "react-awesome-reveal";
import SocialIcons from './components/SocilaIcons';
import { PrimeReactProvider } from "primereact/api";
import { Button } from 'primereact/button';   

gsap.registerPlugin(ScrollTrigger);
function Item({ url, scale, ...props }) {
  const visible = useRef(false);
  const [hovered, hover] = useState(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta
    );
    ref.current.material.zoom = THREE.MathUtils.damp(
      ref.current.material.zoom,
      visible.current ? 1 : 1.5,
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      hovered ? 1 : 0,
      4,
      delta
    );
  });
  return (
    <group {...props} renderOrder={3}>
      <Image
        ref={ref}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={scale}
        url={url}
      />
    </group>
  );
}

function CanvasScrolledItems({ setLogoScreenPosition }) {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const [hovered, hover] = useState(false);

  const mouse = useRef([0, 0]);
  return (
    <Scroll>
      <LogoText
        mouse={mouse}
        hover={hover}
        setLogoScreenPosition={setLogoScreenPosition}
      />
      <Item
        url="/images/1.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 6, -h, 0]}
      />
      <Item
        url="/images/2.jpg"
        scale={[2, w / 3, 1]}
        position={[w / 30, -h, 0]}
      />
      <Item
        url="/images/3.jpg"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 1, 0]}
      />
      <Item
        url="/images/4.jpg"
        scale={[w / 5, w / 5, 1]}
        position={[w / 4, -h * 1.2, 0]}
      />
      <Item
        url="/images/5.jpg"
        scale={[w / 5, w / 5, 1]}
        position={[w / 10, -h * 1.75, 0]}
      />
      <Item
        url="/images/6.jpg"
        scale={[w / 3, w / 3, 1]}
        position={[-w / 4, -h * 2, 0]}
      />
      <Item
        url="/images/7.jpg"
        scale={[w / 3, w / 5, 1]}
        position={[-w / 4, -h * 2.6, 0]}
      />
      <Item
        url="/images/8.jpg"
        scale={[w / 2, w / 2, 1]}
        position={[w / 4, -h * 3.1, 0]}
      />
      <Item
        url="/images/12.jpg"
        scale={[w / 2.5, w / 2, 1]}
        position={[-w / 6, -h * 4.1, 0]}
      />
    </Scroll>
  );
}

const AnimatedH1 = ({
  id,
  children,
  style,
  fromY = 100,
  toY = 0,
  fromOpacity = 0,
  toOpacity = 1,
  start = 0,
  end = 1,
  onClick,
}) => {
  const elementRef = useRef();
  const scroll = useScroll();
  const timelineRef = useRef();

  useEffect(() => {
    // Initialize GSAP timeline
    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current.fromTo(
      elementRef.current,
      { y: fromY },
      { y: toY, ease: "power4.out", duration: 1 }
    );

    // You can customize the animation further as needed
  }, [fromY, toY, fromOpacity, toOpacity]);

  useFrame(() => {
    if (scroll) {
      // Calculate the scroll progress between 'start' and 'end'
      const progress = scroll.range(start, end);
      timelineRef.current?.progress(progress);
    }
  });

  return (
    <h1
      id={id}
      ref={elementRef}
      style={{
        position: "absolute",
        ...style,
        willChange: "transform", // Performance optimization
      }}
      onClick={onClick}
    >
      {children}
    </h1>
  );
};

const HtmlScrolledItems = ({ logoScreenPosition }) => {
  const scroll = useScroll(); // Get the scroll API
  /*   const { viewport,size } = useThree();
  const height = viewport.height; */

  const { viewport, size, camera } = useThree();

  // Calculate font size
  const fontSize = 20 * Math.min(1, viewport.width / 128);
  const fontResolution = 1000;
  const scale = fontSize / fontResolution;

  // Calculate lower Y offset using boundingBox.yMin
  const lowerYOffset = 2 * -486 * scale;

  // Set text position
  const positionY = viewport.height / 4 + 1;
  const lowerYScene = positionY + lowerYOffset;

  // Convert to screen Y
  const vector = new THREE.Vector3(0, lowerYScene, 0);
  vector.project(camera);

  // Convert NDC to screen Y coordinates
  const screenY = (-vector.y * 0.5 + 0.5) * size.height;

  const scrollToSection = (section) => {
    // Set scroll position manually
    const totalPages = 6; // Make sure this matches your ScrollControls pages
    const targetScroll = section / totalPages;
    scroll.el.scrollTop = targetScroll * scroll.el.scrollHeight; // Scroll to the calculated position
  };

  return (
    <Scroll html style={{ width: "100vw", zIndex: 10 }}>
      <div
        className="row justify-content-center vw-100 page-1 pt-5 pt-sm-5"
        style={{
          position: "absolute",
          top: `${screenY}px`,
        }}
      >
        <div className="col-12 pt-1 pt-sm-5 mt-sm-5">
          <div
            className="welcome-box"
            style={{
              color: "#000",
              fontWeight: "bolder",
              textShadow: "0 2px 20px #000000e0",
            }}
          >
            <Slide direction="up">
              <p className="col-sm-6 col-md-8 col-lg-6 desc pt-2 pb-0 mt-4 mb-1 ps-5 pe-5 color-inherit">
                Embark on a journey of educational excellence with Almaaly.
                Discover our rich history and commitment to nurturing future
                leaders.
              </p>
            </Slide>
          </div>
        
        </div>
        <div class="col-6 pt-5 d-flex flex-wrap justify-content-start">
          <Fade cascade>
                    <Button className="pe-4 m-2" iconPos="right" style={{width: '180px',borderRadius:"25px",background:'#000080',borderColor:"#000080",boxShadow:'none'}} label="Contact Us" icon="fa-solid fa-arrow-right-long ms-0" />

        
              <Button className="pe-4 m-2" iconPos="right" style={{width: '180px',borderRadius:"25px",background:'#fff',borderColor:"#000080",boxShadow:'none',color:'rgb(15 23 42 / 1)'}} label="Join Us" icon="fa-solid fa-arrow-right-long ms-0" />
  </Fade>
            </div>
      </div>
      <AnimatedH1
        id="h1-all"
        style={{
          top: `100vh`,
          right: "20vw",
          fontSize: "25em",
        }}
        fromY={200}
        toY={0}
        fromOpacity={0}
        toOpacity={1}
        start={0}
        end={0.2}
        onClick={() => scrollToSection(5)}
      >
        all
      </AnimatedH1>

      <AnimatedH1
        id="h1-hail"
        style={{
          top: "130vh",
          left: "10vw",
          fontSize: "10em",
        }}
        fromY={100}
        toY={0}
        fromOpacity={0}
        toOpacity={1}
        start={0.2}
        end={0.4}
      >
        hail
      </AnimatedH1>

      <AnimatedH1
        id="h1-thee"
        style={{
          top: "210vh",
          right: "10vw",
          fontSize: "10em",
        }}
        fromY={100}
        toY={0}
        fromOpacity={0}
        toOpacity={1}
        start={0.4}
        end={0.6}
      >
        thee,
      </AnimatedH1>

      <AnimatedH1
        id="h1-thoth"
        style={{
          top: "300vh",
          left: "10vw",
          fontSize: "10em",
        }}
        fromY={100}
        toY={0}
        fromOpacity={0}
        toOpacity={1}
        start={0.6}
        end={0.8}
      >
        thoth
      </AnimatedH1>

      <AnimatedH1
        id="h1-hermes"
        style={{
          top: "400vh",
          right: "10vw",
          fontSize: "10em",
        }}
        fromY={100}
        toY={0}
        fromOpacity={0}
        toOpacity={1}
        start={0.8}
        end={1.0}
      >
        her
        <br />
        mes.
      </AnimatedH1>
    </Scroll>
  );
};

function LogoText({ hover, setLogoScreenPosition }) {
  const visible = useRef(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { viewport } = useThree();
  const height = viewport.height;

  const TextScaleFactor = Math.min(1, viewport.width / 128);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y = THREE.MathUtils.damp(
        ref.current.position.y,
        height / 4 + 1,
        2,
        delta
      );
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        state.mouse.x * 2,
        0.1
      );
      /*       ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        state.mouse.y / 2,
        0.1
      ); */
      ref.current.rotation.y = 0.01;
    }
  });

  return (
    <group ref={ref} renderOrder={4}>
      <Text
        fontSize={20 * TextScaleFactor}
        height={5}
        scale={[1, 1, 0.1]}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        color="#ffffff" // Use a bright color for better Bloom effect'
        emissive="#ffffff" // Bright enough to trigger bloom
        emissiveIntensity={2.0} // Higher than the bloom threshold
        setLogoScreenPosition={setLogoScreenPosition}
      >
        Almaaly
      </Text>
    </group>
  );
}

/* const MINIMAL_DELTA_Y_DIFFERENCE = 1;
let isScrolling = false;
const FullPageScroll = ()=>{
  const componentIndexRef = useRef(0);
  const scroll = useScroll(); // Get the scroll API

  const scrollPage = (section) => {
    const totalPages = 6; // Make sure this matches your ScrollControls pages
    const targetScroll = section / totalPages;
    scroll.el.scrollTop = targetScroll * scroll.el.scrollHeight; // Scroll to the calculated position
    isScrolling = false;
  };

  const scrollWindowDown = useCallback((event) => {
    if (!isScrolling && componentIndexRef.current >= 0 && componentIndexRef.current < 5) {
        isScrolling = true;
        scrollPage(componentIndexRef.current + 1);
        componentIndexRef.current++
    }
  }, [
    scrollPage,
  ]);


  const scrollWindowUp = useCallback((event) => {
    if (!isScrolling  && componentIndexRef.current > 0 && componentIndexRef.current <= 5) {
        isScrolling = true;
        scrollPage(componentIndexRef.current - 1);
        componentIndexRef.current--
    }
  }, [
    scrollPage,
  ]);

  const wheelScroll = useCallback(
    event => {      
      
      if (Math.abs(event.deltaY) > MINIMAL_DELTA_Y_DIFFERENCE) {
        if (isPositiveNumber(event.deltaY)) {
          scrollWindowDown(event);
        } else {
          scrollWindowUp();
        }
      }
    },
    [scrollWindowDown, scrollWindowUp],
  );

  useEffect(()=>{

    scroll.el.addEventListener('wheel',wheelScroll)
  },[])


  return null;
} */

const App = () => {
  const [logoScreenPosition, setLogoScreenPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.cursor =
      "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto";
  }, []);

  return (
    <PageProvider>
      <Header />
      <Canvas linear dpr={[1, 2]} camera={{ fov: 100, position: [0, 0, 30] }}>
        <ambientLight intensity={0.5} />
        <ThreeBackgroundVideo />

        <Effects />
        <ScrollControls pages={5}>
          <CanvasScrolledItems setLogoScreenPosition={setLogoScreenPosition} />
          <HtmlScrolledItems logoScreenPosition={logoScreenPosition} />
        </ScrollControls>
      </Canvas>
      <SocialIcons/>
    </PageProvider>
    
  );
};
export default App;
