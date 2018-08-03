import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import styles from './styles';

const NotFound = (props) => {
  const {classes} = props;
  return (
    <div className={classes.FourOhFour}>
      <div className={classes.bg} style={{ backgroundImage: 'url(http://i.giphy.com/l117HrgEinjIA.gif)'}}> </div>
      <div className={classes.code}>404</div>
    </div>
  )
};

export default withStyles(styles)(NotFound);