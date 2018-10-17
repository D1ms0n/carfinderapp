import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: red,
    error: red,
    backgroundLayout: '#ffffff',
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      secondary: blueGrey,
    }
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      '"Segoe UI"',
    ].join(','),
  },
  headerLinksColor: grey,
  radius: 3
});

export default theme;