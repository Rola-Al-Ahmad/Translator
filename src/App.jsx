import logo from "./assets/logo.svg";
import TranslatorCard from "./components/TranslatorCard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="app-container">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="content-container">
          <TranslatorCard cardName="translatorArea" />
          <TranslatorCard cardName="translatorResult" />
        </div>
      </div>
    </>
  );
}

export default App;
