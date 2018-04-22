import React, { Component } from 'react';

import Header from './../header/index';
import Footer from './../footer/index';
import Form from './../form/index';

class InstaShop extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            menushown: true,
        };        
    }   
    render() {
        return (
            <div>            
                <Header/>    
                <Form/>
                <Footer/>          
            </div>
        );
    }
}

export default InstaShop;
