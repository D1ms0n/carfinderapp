import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles/index';
import text from '../../services/texts/index';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from "../Card/Card.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardHeader from "../Card/CardHeader.jsx";

const styles = (theme) => ({
  resultsWrapper: {
    textAlign: 'left',
    margin: 0,
    padding: 0
  },
  listItem: {
    padding: 0,
    marginBottom: 25,
    borderRadius: 0
  },
  gridContainer: {
    margin: 0,
    width: '100%'
  },
  paperRelative: {
    margin: 0
  },
  content: {
    width: '55%',
    float: 'right'
  },
  cover: {
    width: '45%',
    height: 300,
    float: 'left',
  },
  paper: {
    padding: 15,
    marginTop: 10,
    borderRadius: 0,
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    textAlign: 'center'
  }
});

class Results extends Component {

  render() {
    const {items, classes,loading} = this.props;
    const noResults = text.texts.noResults;
    return (
      <Grid className={classes.grid} item lg={9} md={8} sm={7} xs={11}>
        <Paper className={classes.paper}>
          <List className={classes.resultsWrapper}>
            { items.length === 0 ? noResults : null }
            { items.map( (item,index) => {
              return (
                <ListItem key={index} className={classes.listItem}>
                  <Card>
                    <CardHeader color="info">
                      <Typography variant="headline">{item.name}</Typography>
                      <Typography variant="subheading" gutterBottom>
                        {item.price}
                      </Typography>л
                    </CardHeader>
                    <CardBody>
                      <Typography variant="body2" gutterBottom>
                        {item.description}
                      </Typography>
                      <Typography variant="caption" gutterBottom align="right">
                        {item.date}
                      </Typography>
                    </CardBody>
                  </Card>
                </ListItem>
              )})}
          </List>
          { loading ? <LinearProgress /> : null}
        </Paper>
      </Grid>
    );
  }
}

Results.propTypes = {
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.form.result,
    loading: state.loading.result
  }
};

export default withStyles(styles)(connect(mapStateToProps)(Results));
