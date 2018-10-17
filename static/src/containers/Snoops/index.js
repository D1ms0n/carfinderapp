
import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as UpdateForm from "../../actions/UpdateForm";

import ApiService from './../../services/api';
import config from './../../configs';
import SnoopsList from './../../components/SnoopsList';

class SnoopsListContainer extends Component {

  constructor(props) {
    super(props);
    this.config = config;
    // this.apiService =  new ApiService();
    this.state = {
      snoops: []
    };
  }

  componentDidMount() {
    // this.apiService.getRequest(this.config.snoops)
    //   .then((result)=>{
    //     this.setState({
    //       snoops: result || []
    //     })
    //   }).catch((e)=>{
    //     console.log(e);
    //   });
  }

  render() {
    const {updateForm} = this.props.UpdateForm;
    return (
      <SnoopsList updateForm={updateForm}/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UpdateForm: bindActionCreators(UpdateForm, dispatch)
  }
};

export default connect(null,mapDispatchToProps)(SnoopsListContainer);
