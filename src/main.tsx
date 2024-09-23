// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
} from 'react-router-dom';
import router from './Router';
import ModalProvider from './plugins/modal/ModalProvider';
import { ScreenSizeProvider } from './context/ScreenSizeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ScreenSizeProvider>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </ScreenSizeProvider>,
  // </React.StrictMode>,
);
