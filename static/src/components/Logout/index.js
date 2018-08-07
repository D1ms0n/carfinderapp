import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as LoginActions from '../../actions/LoginActions';
import PropTypes from "prop-types";
import {CookiesService} from "../../services/cookies";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    if ( this.props.login ){
      this.props.LoginActions.login(false);
      CookiesService.deleteCookie('user');
      this.props.history.push('/');
    }
  }
  render() {
    return <div> </div>
  }
}
Logout.propTypes = {
  LoginActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    login: state.login,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
