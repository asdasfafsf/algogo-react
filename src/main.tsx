import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import ModalProvider from './plugins/modal/ModalProvider';
import { ScreenSizeProvider } from './context/ScreenSizeContext';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from '@components/errors/ErrorBoundary';

const RootComponent = (
  <ErrorBoundary>
    <ScreenSizeProvider>
      <AppProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AppProvider>
    </ScreenSizeProvider>
  </ErrorBoundary>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);

// 개발 환경에서만 StrictMode 적용
if (process.env.NODE_ENV === 'development') {
  root.render(RootComponent);
  // root.render(<React.StrictMode>{RootComponent}</React.StrictMode>);
} else {
  root.render(RootComponent);
}