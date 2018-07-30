
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import PropTypes from 'prop-types';

import text from './../../services/texts/index';
import ApiService from './../../services/api';
import config from './../../configs';
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

const snoopsTest = testResults.snoopsTest;

class SnoopsList extends Component {

  constructor(props) {
    super(props);
    this.config = config();
    this.state = {
      snoops: []
    };
  }

  pushSearchItems(params) {
    this.props.updateForm(params);

  }

  componentDidMount() {
    const apiService = new ApiService();
    apiService.getRequest(this.config.snoops)
      .then((result)=>{
        this.setState({
          snoops: result || []
        })
      }).catch((e)=>{
        console.log(e);
      });
  }

  render() {
    const {classes} = this.props;
    //const {snoops} = this.state;
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
                onClick={()=>{this.pushSearchItems(snoop)}}
                key={snoop.pk}
                dense
                button
                className={classes.listItem}
              >
                <Avatar alt='preview' src='https://cdn2.riastatic.com/photosnew/auto/photo/tesla_model-s__236718267bx.jpg' />
                <ListItemText primary={`${snoop.manufacturer} ${snoop.model}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label='Delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                <Divider />
              </ListItem>
            ))
            : noResults
          }
        </List>
      </div>
    );
  }
}

SnoopsList.propTypes = {
  classes: PropTypes.object.isRequired,
  updateForm: PropTypes.func.isRequired
};

export default withStyles(styles)(SnoopsList);
