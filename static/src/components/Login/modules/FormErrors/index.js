
import React, { Component } from 'react';

class FormErrors extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const formErrors = this.props.formErrors;
    return(
      <ul>
        {Object.keys(formErrors).map((fieldName, index) => {
          if(formErrors[fieldName].length > 0){
            return (
              <li key={index}>
                {fieldName} {formErrors[fieldName]}
              </li>
            )
          } else {
            return '';
          }
        })}
      </ul>
    )
  }
}


export default FormErrors;