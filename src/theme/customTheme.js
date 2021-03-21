import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const getTheme = (darkMode) => {
  const theme = createMuiTheme({
    palette: {
      primary: darkMode ? grey : red,
      type: darkMode ? 'dark' : 'light',
    },
  });
  return theme;
};

export { getTheme };
