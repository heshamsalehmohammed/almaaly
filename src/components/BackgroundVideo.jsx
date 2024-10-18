// Import images and video from assets
import * as THREE from "three";
import videoBg from "../assets/videos/video-bg.mp4";
import { useAspect, useVideoTexture } from "@react-three/drei";
import { useMemo } from "react";

const BackgroundVideo = () => {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={videoBg} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
    </>
  );
};




function ThreeBackgroundVideo() {
  const size = useAspect(1800, 1000);

  return (
    <group>
      {/* Main Video Plane */}
      <mesh scale={size} position={[0, 0, -0.2]} renderOrder={1}>
        <planeGeometry />
        <VideoMaterial url={videoBg} />
      </mesh>
      {/* Gradient Overlay Plane */}
      <mesh scale={size} position={[0, 0, -0.1]} renderOrder={2}>
        <planeGeometry />
        <GradientOverlayMaterial />
      </mesh>
    </group>
  );
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function GradientOverlayMaterial() {
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;
    const context = canvas.getContext("2d");

    // Create gradient
    const gradient = context.createLinearGradient(0, 0, 0, 2);
    gradient.addColorStop(0, "#4096ee");
    gradient.addColorStop(1, "#39ced6");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 2);

    // Use the canvas as a texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }, []);

  return (
    <meshBasicMaterial
      map={gradientTexture}
      opacity={0.75}
      transparent={true}
      depthTest={true} // Ensure depth testing is enabled
      depthWrite={true} // Ensure the depth buffer is written to
    />
  );
}



export {BackgroundVideo,ThreeBackgroundVideo};