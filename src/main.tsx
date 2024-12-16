// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
} from 'react-router-dom';
import router from './Router';
import ModalProvider from './plugins/modal/ModalProvider';
import { ScreenSizeProvider } from './context/ScreenSizeContext';
import { AppProvider } from './context/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ScreenSizeProvider>
    <AppProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </AppProvider>
  </ScreenSizeProvider>,
  // </React.StrictMode>,
);
