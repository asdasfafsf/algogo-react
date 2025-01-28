import React, {
  createContext, useContext, useEffect,
} from 'react';
import useMeStore from '@zustand/MeStore';

type AppContextType = null;

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const { setMe } = useMeStore.getState();
    const storedData = localStorage.getItem('me');
    if (storedData) {
      setMe(JSON.parse(storedData));
    } else {
      setMe(null);
    }
  }, []);

  return (
    <AppContext.Provider value={null}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
