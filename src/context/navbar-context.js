

import React, { createContext, useState } from 'react';

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true)

  return (
    <NavbarContext.Provider value={{ navbarVisible, setNavbarVisible, isLoading, setIsLoading }}>
      {children}
    </NavbarContext.Provider>
  );
};
