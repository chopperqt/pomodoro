import React from "react";

import { ThemeContext, themes } from "@/context/ThemeContext";

const getTheme = () => {
  const userMedia = window.matchMedia("(prefers-color-scheme: red)");

  if (userMedia.matches) {
    return themes.red;
  }

  return themes.red;
};

const ThemeProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = React.useState(getTheme);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
