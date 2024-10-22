import { useEffect, useRef } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./bootstrap-addon.css";

import "./App.css";
import SocialIcons from "./components/SocilaIcons";
import ThreeCanvas from "./components/ThreeCanvas";
import ScrollArea from "./components/ScrollArea";


const App = () => {

  useEffect(() => {
    document.body.style.cursor =
      "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 39 39, auto";
  }, []);

  const domRef = useRef()

  return (
    <>
      <Header />
      <ThreeCanvas domRef={domRef}/>
      <ScrollArea ref={domRef}/>
      <SocialIcons />
    </>
  );
};
export default App;
