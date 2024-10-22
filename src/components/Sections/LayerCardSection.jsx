import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { Flex, Box, useFlexSize, useReflow } from "@react-three/flex";
import {
  Loader,
  Line,
  useAspect,
  Text as TextImpl,
  useGLTF,
  Detailed,
  Environment,
  MeshDistortMaterial,
  Html,
} from "@react-three/drei";
import { useSelector } from "react-redux";
import {
  selectMouse,
  selectScrollTop,
  selectThreshold,
} from "../../redux/scrollSlice";
import { Geometry, Base, Addition, Brush } from "@react-three/csg";
import ContactUs from "./ContactUs";

function projectYToScene(y, unit = "px", camera, viewport, size) {
  let yInPixels = y;

  // Convert 'vh' to pixels if necessary
  if (unit === "vh") {
    yInPixels = (y / 100) * size.height;
  }

  // Calculate the distance from the camera to the scene (assuming objects are at z = 0)
  const cameraPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  const distance = cameraPosition.length(); // Distance from origin to camera

  // Calculate the vertical field of view in radians
  const fov = (camera.fov * Math.PI) / 180;

  // Calculate the height of the viewport at the given distance
  const viewportHeightAtDistance = 2 * Math.tan(fov / 2) * distance;

  // Map the pixel y to normalized device coordinates (NDC) [-1, 1]
  const ndcY = -(yInPixels / size.height) * 2 + 1;

  // Calculate the world y position
  const yInScene = (ndcY * viewportHeightAtDistance) / 2;

  return yInScene;
}

function Text({
  bold = false,
  anchorX = "left",
  anchorY = "top",
  textAlign = "left",
  ...props
}) {
  const reflow = useReflow();
  const font = bold ? "/Inter-Bold.woff" : "/Inter-Regular.woff";
  return (
    <TextImpl
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      font={font}
      onSync={reflow}
      {...props}
    />
  );
}

function Layercard({
  depth,
  boxWidth,
  boxHeight,
  text,
  textColor,
  color,
  map,
  textScaleFactor,
  domRef
}) {
  const ref = useRef();
  const { viewport, size } = useThree();

  const threshold = useSelector(selectThreshold);

  
  useFrame(() => {
    
    let scrollTop =  domRef?.current?.domStateRef?.current?.scrollTop ?? 0
    let pageLerp = scrollTop / size.height;
    let page = (pageLerp = THREE.MathUtils.lerp(
      pageLerp,
      scrollTop / size.height,
      0.15
    ));
    if (depth >= 0)
      ref.current.opacity =
        page < threshold * 1.7 ? 1 : 1 - (page - threshold * 1.7);
  });

  return (
    <>
      <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
        {/* Update planeBufferGeometry to PlaneGeometry */}
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial
          ref={ref}
          color={color}
          map={map}
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>
      <Text
        bold
        position={[boxWidth / 2, -boxHeight / 2, depth + 1.5]}
        maxWidth={(viewport.width / 3) * 1}
        anchorX="center"
        anchorY="middle"
        fontSize={0.6 * textScaleFactor}
        lineHeight={1}
        letterSpacing={-0.05}
        color={textColor}
      >
        {text}
      </Text>
    </>
  );
}


const LayerCardSection = ({ domRef }) => {
  const { viewport, size, camera } = useThree();
  const [bW, bH] = useAspect(1920, 800, 0.5);
  const texture = useLoader(THREE.TextureLoader, "/students.jpg");
  const scale = Math.min(1, viewport.width / 128);

  let scrollTop =  domRef?.current?.domStateRef?.current?.scrollTop ?? 0;
  let y = 900;
  let yUnit = "vh";

  if (domRef?.current?.bottomElementRef?.current) {
    const { bottom } =
      domRef.current.bottomElementRef.current.getBoundingClientRect();
    y = bottom + scrollTop;
    yUnit = "px";
  }

  const positionTop = projectYToScene(y, yUnit, camera, viewport, size);

  return (
    <Flex
      dir="column"
      position={[-viewport.width / 2, positionTop, 0]}
      size={[viewport.width, viewport.height, 0]}
    >
      <Box dir="row" width="100%" height="100%" align="center" justify="center">
        <Box>
          <Layercard
            depth={0}
            color={"#cccccc"}
            textColor={"#ffffff"}
            text={
              "For why should it stop\nhere rather than here?\nSo that a thing\nwill either be at rest\nor must be moved\nad infinitum."
            }
            boxWidth={bW}
            boxHeight={bH}
            map={texture}
            textScaleFactor={6 * scale}
          />
          <pointLight position={[bW / 2, -bH / 2, 10]} intensity={1.5} />
          {/* <Hat  position={[bW / 2, -bH / 2, -2]}/> */}
        </Box>
      </Box>
    </Flex>
  );
};

export default LayerCardSection;
