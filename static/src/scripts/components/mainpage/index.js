import React, { Component } from 'react';

import Header from './../header/index';
import Footer from './../footer/index';
import Form from './../form/index';

class Mainpage extends Component {

    constructor(props) {
        super(props); 
    }   
    render() {
        return (
            <div>            
                <Header />    
                <Form />
                <Footer />          
            </div>
        );
    }
}

export default Mainpage;
