import {
  createBrowserRouter,
} from 'react-router-dom';
import App from './page/App';
import NotFound from './page/NotFound';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Problem from './page/Problem';
import My from './page/My';
import OAuth from './page/OAuth';
import Error from './page/Error';

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
    path: '/problem',
    element: <Problem />,
  },
  {
    path: '/my',
    element: <My />,
  },
  {
    path: '/oauth/token',
    element: <OAuth />,
  },
  {
    path: 'error',
    element: <Error />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
].sort((a) => (a.path === '/*' ? -1 : 1)));

export default router;
