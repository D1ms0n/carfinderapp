
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import text from './../../services/texts/index';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon  from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  resultsWrapper: {
    textAlign: 'left',
    margin: 0,
    padding: 0
  },
  noResultsContainer: {
    textAlign: 'center'
  },
  title: {
    paddingLeft: 20,
    paddingTop: 20
  }
});

class SnoopsList extends Component {
  render() {
    const {items, classes} = this.props;
    const noResults = (
      <div className={classes.noResultsContainer}>
        {text.texts.noResults}
      </div>
    );

    return (

      <div>
        <Typography className={classes.title} variant="title" gutterBottom>
          Title
        </Typography>
        <List>
          { items.length === 0 ? noResults : null }
          {items.map(value => (
            <ListItem key={value} dense button className={classes.listItem}>
              <Avatar alt="preview" src="https://material-ui.com/static/images/remy.jpg" />
              <Badge color='secondary' badgeContent={1}>
                <ListItemText primary={`Line item ${value + 1}`} />
              </Badge>
              <ListItemSecondaryAction>
                <IconButton aria-label='Delete'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
              <Divider />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

SnoopsList.propTypes = {
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(SnoopsList);
