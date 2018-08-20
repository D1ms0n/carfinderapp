import React, {Component} from 'react';


class Repo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Hello, {this.props.match.params.repoName}!</h1>
      </div>
    )
  }
}

export default Repo;