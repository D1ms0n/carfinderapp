import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';
import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
    error: red,
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