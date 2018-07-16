import React, { Component } from 'react';
import { Link } from 'react-router';

import messages from '../../services/messages';

class Results extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return (
            <div>
                <div className="results">

                    <div className="results_item">
                        <div className="preview"></div>
                        <div className="title">
                            <Link to="here">
                                <span>Qqqqqqq qqqqqqq</span>
                            </Link>
                        </div>
                        <div className="information">
                            Yyyyyyy yyyyyy
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Results;
