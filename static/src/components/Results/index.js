import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {withStyles} from '@material-ui/core/styles/index';
import localisation from "../../services/translations";
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from "./../Card/Card.jsx";
import CardBody from "./../Card/CardBody.jsx";
import CardHeader from "./../Card/CardHeader.jsx";
import CardFooter from "./../Card/CardFooter.jsx";

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Room from '@material-ui/icons/Room';
import BatteryFull from '@material-ui/icons/BatteryFull';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import DirectionsCar from '@material-ui/icons/DirectionsCar';


class Results extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {items,classes,loading} = this.props;
    const noResults = localisation.noResults;
    return (
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
                      {item.price}, <Room /> {item.place}
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
    login: state.login,
    localisationCode: state.localisation.result
  }
};

export default withStyles(styles)(connect(mapStateToProps)(Results));
