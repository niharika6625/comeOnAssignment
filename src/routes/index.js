import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from '../helper/constants';
import CasinoPage from '../pages/Casino';
import InGamePage from '../pages/InGame';
import LoginPage from '../pages/Login';
import PrivateRoute from '../components/PrivateRoute/index.jsx';

const { LOGIN, CASINO, INGAME } = ROUTE_PATH;

const routes = createBrowserRouter([
  {
    path: LOGIN,
    element: <LoginPage />,
  },
  {
    path: CASINO,
    element: <PrivateRoute><CasinoPage /></PrivateRoute>,
  },
  {
    path: INGAME,
    element: <PrivateRoute><InGamePage /></PrivateRoute>,
  },
  {
    path: '*',
    element: <LoginPage />,
  },
  
]);

export default routes;
