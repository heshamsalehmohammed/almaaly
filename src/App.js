import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import BackgroundVideo from "./components/BackgroundVideo";
import FullpageSections from "./components/FullpageSections";



const App = () => {
  return (
    <PageProvider>
      <BackgroundVideo />
      <Header />
      <FullpageSections />
    </PageProvider>
  );
};

export default App;
