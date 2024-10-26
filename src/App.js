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
  const headerRef = useRef();
  const domRef = useRef()
  const threeSceneRef = useRef()

  return (
    <>
      <Header ref={headerRef} domRef={domRef} threeSceneRef={threeSceneRef}/>
      <ThreeCanvas ref={threeSceneRef} domRef={domRef}/>
      <ScrollArea ref={domRef} threeSceneRef={threeSceneRef} headerRef={headerRef}/>
      <SocialIcons />
    </>
  );
};
export default App;
