import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const getTheme = (darkMode) => {
  const theme = createMuiTheme({
    palette: {
      primary: grey,
      type: darkMode ? 'dark' : 'light',
    },
  });
  return theme;
};

export { getTheme };
