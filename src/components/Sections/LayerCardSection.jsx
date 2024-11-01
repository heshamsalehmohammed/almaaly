import * as THREE from "three";
import { useRef, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import { Flex, Box, useReflow } from "@react-three/flex";
import { useAspect, Text as TextImpl } from "@react-three/drei";
import { getCurrentLanguage } from "../../helpers";

export const projectYToScene = (y, unit = "px", camera, viewport, size) => {
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

export const projectYToDOM = (yInScene, unit = "px", camera, viewport, size) => {
  // Calculate the distance from the camera to the scene (assuming objects are at z = 0)
  const cameraPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraPosition);
  const distance = cameraPosition.length(); // Distance from origin to camera

  // Calculate the vertical field of view in radians
  const fov = (camera.fov * Math.PI) / 180;

  // Calculate the height of the viewport at the given distance
  const viewportHeightAtDistance = 2 * Math.tan(fov / 2) * distance;

  // Calculate normalized device coordinate (NDC) Y
  const ndcY = (2 * yInScene) / viewportHeightAtDistance;

  // Convert NDC Y to pixel Y
  const yInPixels = ((-ndcY + 1) * size.height) / 2;

  // Convert pixels to 'vh' if necessary
  if (unit === "vh") {
    return (yInPixels / size.height) * 100;
  }

  return yInPixels;
};

function Text({
  bold = false,
  anchorX = "left",
  anchorY = "top",
  textAlign = "left",
  ...props
}) {
  const reflow = useReflow();
  const font = bold ? "/three-fonts/Inter-Bold.woff" : "/three-fonts/Inter-Regular.woff";
  return (
    <TextImpl
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      font={getCurrentLanguage() + font}
      onSync={reflow}
      {...props}
    />
  );
}

const Layercard = forwardRef(
  (
    {
      depth,
      boxWidth,
      boxHeight,
      text,
      textColor,
      color,
      map,
      textScaleFactor,
      domRef,
    },
    ref
  ) => {
    const { viewport } = useThree();

    return (
      <group ref={ref}>
        <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
          {/* Update planeBufferGeometry to PlaneGeometry */}
          <planeGeometry args={[boxWidth, boxHeight]} />
          <meshBasicMaterial
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
      </group>
    );
  }
);

const LayerCardSection = forwardRef(({ domRef, sceneStateRef }, ref) => {
  const { viewport, size, camera } = useThree();
  const layerCardRef = useRef();
  const [bW, bH] = useAspect(1920, 800, 0.5);
  const texture = useLoader(THREE.TextureLoader, "/students.jpg");
  const scale = Math.min(1, viewport.width / 128);

  // initial value will be overwritten 3la tool
  let y = 900;
  let yUnit = "vh";

  // when first render
  if (domRef?.current?.bottomElementRef?.current) {
    const { bottom } =
      domRef.current.bottomElementRef.current.getBoundingClientRect();
    y = bottom;
    yUnit = "px";
  }
  const positionTopRef = useRef(
    projectYToScene(y, yUnit, camera, viewport, size)
  );
  // end when first render

  useLayoutEffect(() => {
    /* first section height will be always 100vh i.e. 1 size.height */
    const h1 = size.height;
    const { height: h2 } =
      domRef.current.secondSectionRef.current.getBoundingClientRect();
    const { height: h3 } =
      domRef.current.thirdSectionRef.current.getBoundingClientRect();
    const { height: h4 } =
      domRef.current.fourthSectionRef.current.getBoundingClientRect();
    const { height: h5 } =
      domRef.current.bottomElementRef.current.getBoundingClientRect();

    const { height: h6 } =
      domRef.current.studentsGallarySectionRef.current.getBoundingClientRect();

    const { height: h7 } =
      domRef.current.quotesSectionRef.current.getBoundingClientRect();

    y = h1 + h2 + h3 + h4 + h5 + h6 + h7;
    positionTopRef.current = projectYToScene(y, yUnit, camera, viewport, size);
  }, [size]);

  useImperativeHandle(ref, () => {
    return {
      startScenePositionForScrollingZ: positionTopRef.current - bH,
      layerCardRef,
    };
  });

  return (
    <Flex
      dir="column"
      position={[-viewport.width / 2, positionTopRef.current, 0]}
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
            ref={layerCardRef}
          />
        </Box>
      </Box>
    </Flex>
  );
});

export default LayerCardSection;
