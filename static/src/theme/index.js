
import {createMuiTheme} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
    error: red,
    text: {
      secondary: blueGrey,
    }
  },
  radius: 3
});

console.log(theme);
export default theme;