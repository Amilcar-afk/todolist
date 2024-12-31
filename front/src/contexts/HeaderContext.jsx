import React, { createContext, useState, useEffect } from 'react';

export const HeaderContext = createContext(null);

const HeaderProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("flowbite-theme-mode");
    return savedMode === "dark";
  });
  
  useEffect(() => {
    localStorage.setItem("flowbite-theme-mode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <HeaderContext.Provider value={{ setDarkMode: setIsDarkMode, isDarkMode }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
