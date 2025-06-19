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
import Landing from './page/Landing';
import TodayProblem from './page/TodayProblem';
import OAuthV2Callback from './page/OAuthV2Callback';
import OAuthV2ConnectCallback from './page/OAuthV2ConnectCallback';
import OAuthV2DisconnectCallback from './page/OAuthV2DisconnectCallback';

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
    element: <App />,
  },
  {
    path: '/problem/today',
    element: <TodayProblem />,
  },
  {
    path: '/problem/:problemUuid',
    element: <Problem />,
  },
  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/me',
    element: <My />,
  },
  {
    path: '/oauth/v2/callback/:provider',
    element: <OAuthV2Callback />,
  },
  {
    path: '/oauth/v2/connect/callback/:provider',
    element: <OAuthV2ConnectCallback />,
  },
  {
    path: '/oauth/v2/disconnect/callback/:provider',
    element: <OAuthV2DisconnectCallback />,
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
