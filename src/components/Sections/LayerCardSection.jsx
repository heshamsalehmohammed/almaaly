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
  Html
} from "@react-three/drei";
import { useSelector } from "react-redux";
import { selectMouse, selectScrollTop, selectThreshold } from "../../redux/scrollSlice";
import { Geometry, Base, Addition, Brush } from '@react-three/csg'
import ContactUs from './ContactUs';

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
}) {
  const ref = useRef();
  const { viewport, size } = useThree();

  const scrollTop = useSelector(selectScrollTop);
  const scrollThreshold = useSelector(selectThreshold);

  const pageLerp = useRef(scrollTop / size.height);
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      scrollTop / size.height,
      0.15
    ));
    if (depth >= 0)
      ref.current.opacity =
        page < scrollThreshold * 1.7 ? 1 : 1 - (page - scrollThreshold * 1.7);
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

function Hats({
  speed = 1,
  count = 8000,
  position= [0,0,0],
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -position[2]]);
  const { nodes, materials } = useGLTF("/glbs/blender-threejs-journey-20k-hat-transformed.glb");

  // Reference to the InstancedMesh
  const meshRef = useRef();

  // Initialize instance data
  const instances = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const z = Math.round(easing(i / count) * position[2]);
      temp.push({
        index: i,
        z,
        speed,
        // Randomly distribute along Y
        y: (THREE.MathUtils.randFloatSpread(height * 2.5) + height / 2.5) - height / 4,
        // Random X position
        x: THREE.MathUtils.randFloatSpread(width/3),
        // Spin speed
        spin: THREE.MathUtils.randFloat(8, 12),
        // Random rotations
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
      });
    }
    return temp;
  }, [count, position[2], easing, height, width, speed]);

  // Create a separate array to store per-instance data
  const instanceData = useRef(instances);

  useEffect(() => {
    // Set initial matrix for each instance
    instanceData.current.forEach((data, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(data.x, data.y, -data.z);
      matrix.makeRotationFromEuler(new THREE.Euler(data.rX, 0, data.rZ));
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    instanceData.current.forEach((data, i) => {
      // Update position
      data.y += delta * data.speed;
      if (data.y > height/5 * (data.index === 0 ? 4 : 1)) {
        data.y = -(height/5 * (data.index === 0 ? 4 : 1));
      }

      // Update rotations
      data.rX += delta / data.spin;
      data.rZ += delta / data.spin;

      // Optional: Update rotation around Y axis for some effect
      const rotationY = Math.sin(data.index * 1000 + state.clock.elapsedTime / 10) * Math.PI;

      // Create a new matrix
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3(
        data.index === 0 ? 0 : data.x,
        data.y,
        -data.z
      );
      const rotation = new THREE.Euler(data.rX, rotationY, data.rZ);

      matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), new THREE.Vector3(1, 1, 1));

      // Update the instance matrix
      meshRef.current.setMatrixAt(i, matrix);
    });
    // Indicate that the instance matrix needs to be updated
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <bufferGeometry attach="geometry" {...nodes.Plane006_1.geometry} />
        <meshStandardMaterial
          attach="material"
          {...materials.boxCap}

        />
      </instancedMesh>
     
    </>
  );
}



function Hat(props) {
  const group = useRef()
  const shadow = useRef()
  const { nodes, materials } = useGLTF("/glbs/blender-threejs-journey-20k-hat-transformed.glb");

const mouse = useSelector(selectMouse)

  useFrame(({ clock }) => {
    const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2
    group.current.position.y = t / 3
    group.current.rotation.x = group.current.rotation.z += 0.005
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse[0] / 2, 0.05)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, mouse[1] / 4, 0.03)
  })


  useEffect(() => {
    materials.Material = new THREE.MeshStandardMaterial({ color: materials.Material.color });
    materials.boxCap = new THREE.MeshStandardMaterial({ color: materials.boxCap.color });
  }, [materials]);
  return (
    <group {...props} dispose={null}>
      <group ref={group}>
        <mesh castShadow receiveShadow renderOrder={1} emissive="#ffffff" // Bright enough to trigger bloom
        emissiveIntensity={2.0} // Higher than the bloom threshold
        > 
        <Geometry useGroups >
          <Base geometry={nodes.Plane006.geometry} material={materials.Material} />
          <Addition geometry={nodes.Plane006_1.geometry} material={materials.boxCap} />
        </Geometry>

        </mesh>
     
      </group>
    </group>
  )
}


const LayerCardSection = () => {
  const { viewport, size, camera } = useThree();
  const [bW, bH] = useAspect(1920, 800, 0.5);
  const texture = useLoader(THREE.TextureLoader, "/students.jpg");
  const scale = Math.min(1, viewport.width / 128);

  const positionTop = projectYToScene(900, "vh", camera, viewport, size);

  return (
    <Flex
      dir="column"
      position={[-viewport.width / 2, positionTop, 0]}
      size={[viewport.width, viewport.height, 0]}
    >
      <Box dir="row" width="100%" height="100%" align="center" justify="center">
        <Box >
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
