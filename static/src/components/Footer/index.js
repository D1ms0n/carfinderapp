import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';

import styles from './styles';

import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';

const scroll = require('window-scroll');

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollToTopIsShown: false,
      scrollPositionToShowScroll: 250
    };
    this.showScrollToTop = this.showScrollToTop.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.showScrollToTop);
  }
  showScrollToTop(){
    if ( scroll.getScrollY() > this.state.scrollPositionToShowScroll ){
      this.setState( ()=> ({
        scrollToTopIsShown: true
      }));
    } else {
      this.setState( ()=> ({
        scrollToTopIsShown: false
      }));
    }
  }
  scrollToTop(){
    const startScrollPosition = 0;
    const animItaration = 5;
    (function smoothscroll(){
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > startScrollPosition) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(startScrollPosition,currentScroll - (currentScroll/animItaration));
      }
    })();
  }
  render() {
    const {classes} = this.props;
    return (
      <div>
        <footer className="shop_footer">
          <div className={'scrollToTop ' + (this.state.scrollToTopIsShown === true ? 'active' : '')}
            onClick={this.scrollToTop}>
            <IconButton aria-label="Share" className={classes.iconWrap} >
              <ExpandLess />
            </IconButton>
          </div>
        </footer>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);