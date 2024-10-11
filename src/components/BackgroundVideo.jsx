// Import images and video from assets
import videoBg from "../assets/videos/video-bg.mp4";

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



export default BackgroundVideo;