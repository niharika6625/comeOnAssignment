import { RouterProvider } from "react-router-dom";
import logo from "../src/assets/images/logo.svg";
import routes from "./routes/index.js";
import "./assets/css/styles.css";
function App() {
  return (
    <>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src={logo} alt="logo" className="logo-animation" />
        </div>
      </div>
      <div className="main container">
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
