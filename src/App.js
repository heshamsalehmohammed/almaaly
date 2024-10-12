import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-addon.css";
import "./App.css";

import { PageProvider } from "./context/PageContext";
import Header from "./components/Header";
import BackgroundVideo from "./components/BackgroundVideo";
import FullpageSections from "./components/FullpageSections";

const App = () => {
  return (
    <PageProvider>
      <div id="App" className="App">
        <BackgroundVideo />
        <Header />
        <FullpageSections />
      </div>
    </PageProvider>
  );
};

export default App;
