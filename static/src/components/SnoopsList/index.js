import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';

import text from './../../services/texts/index';
import styles from './styles';
import testResults from './testResults';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon  from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const snoopsTest = testResults.snoopsTest;

class SnoopsList extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  pushSearchItems = (params) => {
    this.props.updateForm(params);
  };

  render() {
    const {classes} = this.props;
    const snoops = snoopsTest;
    const noResults = (
      <div className={classes.noResultsContainer}>
        {text.texts.noResultsSnoops}
      </div>
    );
    return (
      <div>
        <Typography className={classes.title} variant='title' gutterBottom>
          {text.texts.snoops}
        </Typography>
        <List>
          { Array.isArray(snoops) && snoops.length > 0
            ? snoops.map(snoop => (
              <ListItem
                key={snoop.pk}
                dense
                button
                className={classes.listItem}
              >
                <Avatar
                  onClick={()=>{
                    this.pushSearchItems(snoop)
                  }}
                  className={classes.preview}
                  alt='preview'
                  src='https://cdn2.riastatic.com/photosnew/auto/photo/tesla_model-s__236718267bx.jpg'
                />
                <ListItemText
                  onClick={()=>{
                    this.pushSearchItems(snoop)
                  }}
                  className={classes.listItemText}
                  primary={`${snoop.manufacturer} ${snoop.model}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={this.handleClickOpen}
                    aria-label='Delete'
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <Divider />
              </ListItem>
            ))
            : noResults
          }
        </List>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are yor sure?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SnoopsList.propTypes = {
  classes: PropTypes.object.isRequired,
  updateForm: PropTypes.func.isRequired
};

export default withStyles(styles)(SnoopsList);
