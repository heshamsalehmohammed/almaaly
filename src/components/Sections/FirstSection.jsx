import React, { forwardRef, useRef } from "react";
import * as THREE from "three";
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
import { Button } from "primereact/button";
import SoFar from "../../assets/images/so-far.jpeg";
import {
  Slide,
  Fade,
  JackInTheBox,
  Roll,
  Zoom,
  Bounce,
} from "react-awesome-reveal";
import Text from "../../Text";
import { useSelector } from "react-redux";
import {
  selectThreeCamera,
  selectThreeSize,
  selectThreeViewport,
} from "../../redux/threeSlice";

function LogoText({domRef}) {
  const visible = useRef(false);
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const { viewport } = useThree();
  const height = viewport.height;

  const TextScaleFactor = Math.min(1, viewport.width / 128);

  useFrame((state, delta) => {
    const mouse =  domRef.current.domStateRef.current.mouse
    if (ref.current) {
      ref.current.position.y = THREE.MathUtils.damp(
        ref.current.position.y,
        height / 3 + 1,
        2,
        delta
      );
      ref.current.position.x = THREE.MathUtils.lerp(
        ref.current.position.x,
        mouse[0] * 2,
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
        color="#ffffff" // Use a bright color for better Bloom effect'
        emissive="#ffffff" // Bright enough to trigger bloom
        emissiveIntensity={2.0} // Higher than the bloom threshold
      >
        Almaaly
      </Text>
    </group>
  );
}

export const FirstSectionCanvas = ({domRef}) => {
  return <LogoText domRef={domRef}/>;
};

export const FirstSectionHtml = forwardRef((props, ref) => {
  const viewport = useSelector(selectThreeViewport);
  const size = useSelector(selectThreeSize);
  const camera = useSelector(selectThreeCamera);

  if (!viewport || !size || !camera) return null;

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

  return (
    <div
      ref={ref}
      className="row justify-content-center vw-100 page-1 pt-3"
      style={{
        position: "absolute",
        top: `${screenY}px`,
      }}
    >
      <div className="col-12 pt-4 mt-sm-4">
        <div
          className="welcome-box text-shadow-1"
          style={{
            fontWeight: "bolder",
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
      <div className="col-6 pt-4 mt-5 d-flex flex-wrap justify-content-center justify-content-sm-start">
        <Slide direction="up" delay={300}>
          <Fade delay={300}>
            <Button
              className="pe-4 m-2"
              iconPos="right"
              style={{
                width: "180px",
                borderRadius: "25px",
                background: "#000080",
                borderColor: "#000080",
                boxShadow: "none",
              }}
              label="Contact Us"
              icon="fa-solid fa-arrow-right-long ms-0"
              onClick={() => {
                debugger;
              }}
            />
          </Fade>
          <Fade delay={300}>
            <Button
              className="pe-4 m-2"
              iconPos="right"
              style={{
                width: "180px",
                borderRadius: "25px",
                background: "#fff",
                borderColor: "#fff",
                boxShadow: "none",
                color: "rgb(15 23 42 / 1)",
              }}
              label="Join Us"
              icon="fa-solid fa-arrow-right-long ms-0"
            />
          </Fade>
        </Slide>
      </div>
    </div>
  );
});
