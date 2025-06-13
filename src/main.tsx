import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from '@components/errors/ErrorBoundary';
import router from './Router';
import ModalProvider from './plugins/modal/ModalProvider';
import { ScreenSizeProvider } from './context/ScreenSizeContext';
import { AppProvider } from './context/AppContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RootComponent = (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ScreenSizeProvider>
        <AppProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </AppProvider>
      </ScreenSizeProvider>
    </QueryClientProvider>
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
