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
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-addon.css";
import "./App.css";
import Text from "./Text";
import Effects from "./Effects";
import { isPositiveNumber } from "./packages/PageScroll/utils";

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

function CanvasScrolledItems() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const [hovered, hover] = useState(false);

  const mouse = useRef([0, 0]);
  return (
    <Scroll>
      <Number mouse={mouse} hover={hover} />
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

const HtmlScrolledItems = () => {
  const scroll = useScroll(); // Get the scroll API

  const scrollToSection = (section) => {
    // Set scroll position manually
    const totalPages = 6; // Make sure this matches your ScrollControls pages
    const targetScroll = section / totalPages;
    scroll.el.scrollTop = targetScroll * scroll.el.scrollHeight; // Scroll to the calculated position
  };

  return (
    <Scroll html style={{ width: "100%", zIndex: 10 }}>
      <AnimatedH1
        id="h1-all"
        style={{
          top: `50vh`,
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

function Number({ hover }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        state.mouse.x * 2,
        0.1
      );
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        state.mouse.y / 2,
        0.1
      );
      ref.current.rotation.y = 0.3;

    }
  });

  return (
    <group ref={ref} renderOrder={4}> {/* Assign to layer 1 */}
      <Text
        size={10}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        color="#ffffff" // Use a bright color for better Bloom effect'
        emissive="#ffffff" // Bright enough to trigger bloom
        emissiveIntensity={2.0} // Higher than the bloom threshold
      >
        4
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
       {/* <FullPageScroll/> */}
          <CanvasScrolledItems />
          <HtmlScrolledItems />
        </ScrollControls>   
      </Canvas>
    </PageProvider>
  );
};
export default App;
