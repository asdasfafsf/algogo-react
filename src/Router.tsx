import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './page/App';
import NotFound from './template/NotFound';
import SignUp from './page/SignUp';
import Login from './page/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
].sort((a) => (a.path === '/*' ? -1 : 1)));

export default router;
