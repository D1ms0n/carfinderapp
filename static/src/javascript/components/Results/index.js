import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles/index';
import text from './../../services/texts/index';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Room from '@material-ui/icons/Room';
import BatteryFull from '@material-ui/icons/BatteryFull';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import Card from "./../Card/Card.jsx";
import CardBody from "./../Card/CardBody.jsx";
import CardHeader from "./../Card/CardHeader.jsx";
import CardFooter from "./../Card/CardFooter.jsx";

const styles = (theme) => ({
  resultsWrapper: {
    textAlign: 'left',
    margin: 0,
    padding: 0
  },
  listItem: {
    padding: 0,
    margin: 0,
    marginBottom: 10,
    marginTop: 10
  },
  card: {
    borderRadius: theme.radius
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
    paddingTop: 1,
    marginTop: 10,
    borderRadius: theme.radius,
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  secondaryText:{
    color: theme.palette.text.secondary[500],
  },
  whiteText: {
    color: '#ffffff'
  },
  cardHeader: {
    background: `linear-gradient(60deg, ${theme.palette.primary[500]}, ${theme.palette.primary[500]})!important`,
    boxShadow: theme.shadows[2]
  },
  lastBtn: {
    marginRight: 'auto'
  }
});

class Results extends Component {

  render() {
    const {items,classes,loading} = this.props;
    const noResults = text.texts.noResults;
    return (
      <Grid className={classes.grid} item lg={9} md={8} sm={7} xs={11}>
        <Paper className={classes.paper}>
          <List className={classes.resultsWrapper}>
            { items.length === 0 ? noResults : null }
            { items.map( (item,index) => {
              return (
                <ListItem key={index} className={classes.listItem}>
                  <Card className={classes.listItem}>
                    <CardHeader className={classes.cardHeader} color='success'>
                      <Typography className={classes.whiteText} variant="headline">{item.name}</Typography>
                      <Typography className={classes.whiteText} variant="subheading" gutterBottom>
                        {item.price}
                      </Typography>
                    </CardHeader>

                    <CardBody>
                      <CardMedia
                        className={classes.cover}
                        image={item.img}
                        title={item.name}
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Grid
                            className={classes.gridContainer}
                            container
                            spacing={24}
                            justify='center'
                            direction='row'
                          >
                            <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={12}>
                              <Typography variant="body2" gutterBottom>
                                <Room /> {item.place}
                              </Typography>
                            </Grid>
                            <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={12}>
                              <Typography variant="body2" gutterBottom>
                                <BatteryFull /> {item.engine}
                              </Typography>
                            </Grid>
                            <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={12}>
                              <Typography variant="body2" gutterBottom>
                                <DirectionsWalk/> {item.millage}
                              </Typography>
                            </Grid>
                            <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={12}>
                              <Typography variant="body2" gutterBottom>
                                <DirectionsCar /> {item.transmission}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography variant="body2" gutterBottom>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </div>
                    </CardBody>

                    <CardFooter>
                      <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="Share" className={classes.lastBtn}>
                        <ShareIcon />
                      </IconButton>
                      <Typography className={classes.secondaryText} variant="caption" gutterBottom align="right">
                        {item.date}
                      </Typography>
                    </CardFooter>
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
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.form.result,
    loading: state.loading.result
  }
};

export default withStyles(styles)(connect(mapStateToProps)(Results));
