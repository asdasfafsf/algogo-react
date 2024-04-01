/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, {
  createContext, useState, useEffect, useContext,
} from 'react';

interface ScreenSizeContextType {
  isMobile: boolean;
}

interface ScreenSizeContextProps {
  children: React.ReactNode;
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

export const ScreenSizeProvider = ({ children }: ScreenSizeContextProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540); // 예시: 768px 미만을 모바일로 간주
    };

    handleResize(); // 초기 실행

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isMobile }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = (): ScreenSizeContextType => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error('useScreenSize must be used within a ScreenSizeProvider');
  }
  return context;
};
