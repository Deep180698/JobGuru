import React, { useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

const NavigationServiceContext = React.createContext<NavigationContainerRef | null>(null);

export const NavigationServiceProvider = ({ children }) => {
  const navigationRef = useRef<NavigationContainerRef | null>(null);

  return (
    <NavigationServiceContext.Provider value={navigationRef}>
      {children}
    </NavigationServiceContext.Provider>
  );
};

export const useNavigation = () => {
  const navigationRef = React.useContext(NavigationServiceContext);

  if (!navigationRef) {
    throw new Error('useNavigation must be used within a NavigationServiceProvider');
  }

  return navigationRef;
};

export const navigate = (name, params) => {
  const navigationRef = useNavigation();
  navigationRef.current?.navigate(name, params);
};