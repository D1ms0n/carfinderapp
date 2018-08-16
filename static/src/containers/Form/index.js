import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FormActions from '../../actions/FormActions';
import * as PreLoaderActions from '../../actions/PreLoaderActions';

import Form from '../../components/Form/index';
import Results from '../../components/Results/index';
import Grid from '@material-ui/core/Grid';

class FormContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  render() {
    const {submitForm} = this.props.FormActions;
    const {togglePreLoader} = this.props.PreLoaderActions;
    const {items,loading,history} = this.props;
    return (
      <Grid
        container
        spacing={24}
        justify='center'
      >
        <Grid item lg={3} md={4} sm={4} xs={11}>
          <Form
            history={history}
            submitForm={submitForm}
            togglePreLoader={togglePreLoader}
          />
        </Grid>
        <Grid item lg={9} md={8} sm={7} xs={11}>
          <Results
            items={items}
            loading={loading}
          />
        </Grid>
      </Grid>
    );
  }
}

FormContainer.propTypes = {
  FormActions: PropTypes.object.isRequired,
  PreLoaderActions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.form.result,
    loading: state.loading.result,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    FormActions: bindActionCreators(FormActions, dispatch),
    PreLoaderActions: bindActionCreators(PreLoaderActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
