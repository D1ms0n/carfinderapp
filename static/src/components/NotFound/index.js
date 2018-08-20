import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import styles from './styles';

const NotFound = (props) => {
  const {classes} = props;
  return (
    <div className={classes.FourOhFour}>
      <div className={classes.bg} style={{ backgroundImage: 'url(https://gagadget.com/media/uploads/2015-08/nothing_to_see_here_naked_gun.gif)'}}> </div>
      <div className={classes.code}>404</div>
    </div>
  )
};

export default withStyles(styles)(NotFound);