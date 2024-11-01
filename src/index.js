import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";


(function printNameInConsole() {

  var developedBy = `
______   _______  __   __  _______  ___      _______  _______  _______  ______     _______  __   __ 
|      | |       ||  | |  ||       ||   |    |       ||       ||       ||      |   |  _    ||  | |  |
|  _    ||    ___||  |_|  ||    ___||   |    |   _   ||    _  ||    ___||  _    |  | |_|   ||  |_|  |
| | |   ||   |___ |       ||   |___ |   |    |  | |  ||   |_| ||   |___ | | |   |  |       ||       |
| |_|   ||    ___||       ||    ___||   |___ |  |_|  ||    ___||    ___|| |_|   |  |  _   | |_     _|
|       ||   |___  |     | |   |___ |       ||       ||   |    |   |___ |       |  | |_|   |  |   |  
|______| |_______|  |___|  |_______||_______||_______||___|    |_______||______|   |_______|  |___|  
                                                                                                   
  `;
console.log('%c' + developedBy, 'color: green; font-size:12px;')

  var nameArt = `
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓████████▓▒░  ░▒▓███████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░  ░▒▓██████▓▒░  ░▒▓██████████████▓▒░    
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░   
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░        ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░   
░▒▓████████▓▒░ ░▒▓██████▓▒░    ░▒▓██████▓▒░  ░▒▓████████▓▒░ ░▒▓████████▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░   
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░               ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░   
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░               ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░   
░▒▓█▓▒░░▒▓█▓▒░ ░▒▓████████▓▒░ ░▒▓███████▓▒░  ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░    
`;
  console.log('%c' + nameArt, 'color: green; font-size:12px;');

  console.log('%chttps://www.linkedin.com/in/heshamsalehmohammed/','color: green; font-size:30px;')
})();



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
