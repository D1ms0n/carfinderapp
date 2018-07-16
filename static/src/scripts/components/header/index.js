import React, { Component } from 'react';
import { Link } from 'react-router';

import messages from '../../services/messages';
import ApiService from './../../services/api';
import config from './../../configs';

class Header extends Component {
    constructor() {
        super();      
        this.state = {
            signinshown: false,
            snoops: []
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.getSnoops = this.getSnoops.bind(this);
        this.sendUserParams = this.sendUserParams.bind(this);
    }
    togglePopup(){
        if (!this.state.signinshown) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            signinshown: !prevState.signinshown,
        }));
    }
    handleOutsideClick(e) {
        if (this.signin.contains(e.target)) {
          return;
        }
        this.togglePopup();
    }
    getSnoops(){
        let apiService = new ApiService();
        apiService.getRequest(config().snoops)
            .then((result)=>{
                this.setState({
                    snoops: result
                })
            })
            .catch((e)=>{
                console.log(e);
            })
    }
    sendUserParams(e){
        e.preventDefault(); 
        e.stopPropagation();
        const form = document.getElementById('signInForm');
        console.log(form.elements.email.value);
        console.log(form.elements.password.value);
    }
    componentDidMount(){
        this.getSnoops();
    }
    render() {
        return (
            <div>
                <header className="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="header_top">
                                <div className="float-right">
                                    <div onClick={this.togglePopup} 
                                        className={"user_name " + ( this.state.dropdownshown === true ? 'active' : '')}>
                                        {messages.messages.signIn}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="float-left">
                                    <h1>
                                        {messages.messages.name}
                                    </h1>
                                </div>
                                <nav className="snoops">
                                    <ul>
                                        {this.state.snoops.map((item,index) => 
                                            <li>
                                                <Link
                                                    target="_blank"
                                                    key={index} 
                                                    to={window.location.origin+'?mileage_max='+item.mileage_max+'&mileage_min='+item.mileage_min+'&year_max='+item.year_max+'&year_min='+item.year_min+'&model='+item.model+'&manufacturer='+item.manufacturer}>
                                                       <span>{item.manufacturer} {item.model}</span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                <div ref={signin => { this.signin = signin; }} 
                    className={"modal_form " + ( this.state.signinshown === true ? 'active' : '')}>
                    <form className="form" id="signInForm" onSubmit={this.sendUserParams}>
                        <input className="input" placeholder="email" name="email" type="text" />
                        <input className="input" placeholder="pass" name="password" type="password" />
                        <input className="input submit" type="submit" value={messages.messages.submit} />
                    </form>
                </div>
            </div>
        );
    }
}
export default Header;
