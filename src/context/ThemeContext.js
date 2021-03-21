import { useContext, createContext, useState, useEffect } from 'react';
import { getTheme } from '../theme/customTheme';
import {
  getCookieValue,
  checkCookieExistence,
  setCookieValue,
} from '../utils/cookie';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ThemeContext = createContext({});

const ThemeProvider = ({ children, value, ...rest }) => {
  const systemDarkModePreference = useMediaQuery(
    '(prefers-color-scheme: dark)'
  );
  const hasUserPreference = checkCookieExistence('site_color_scheme');
  const userDarkModePreference = getCookieValue('site_color_scheme') === 'dark';
  const [currentDarkModeState, setDarkModeState] = useState(
    hasUserPreference ? userDarkModePreference : systemDarkModePreference
  );
  const [theme, setTheme] = useState(value || getTheme(currentDarkModeState));

  useEffect(() => {
    setTheme(getTheme(currentDarkModeState));
  }, [currentDarkModeState]);
  const toggleTheme = () => {
    setDarkModeState((prevDarkModeState) => {
      if (!prevDarkModeState) {
        setCookieValue('site_color_scheme', 'dark');
      } else {
        setCookieValue('site_color_scheme', 'light');
      }
      return !prevDarkModeState;
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
      {...rest}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};

export { ThemeProvider, useTheme };
