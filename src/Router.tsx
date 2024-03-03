import {
    createBrowserRouter
} from 'react-router-dom';
import App from './App';
import NotFound from '../template/NotFound';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/*',
        element: <NotFound />
    }
].sort(a => a.path === '/*' ? -1 : 1));


export default router;