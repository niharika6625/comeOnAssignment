import "./assets/css/styles.css";
import {
  RouterProvider,
} from 'react-router-dom';
import logo from "../src/assets/images/logo.svg";
import routes from './routes/index.js'
function App() {
  return (
    <>
      <div className="ui one column center aligned page grid">
        <div className="column twelve wide">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="main container">
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
