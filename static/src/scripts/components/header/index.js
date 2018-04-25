import React, { Component } from 'react';
import { Link } from 'react-router';

import messages from '../../services/messages';
import ApiService from './../../services/api';
import config from './../../configs';

class Header extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            signinshown: false,
            menushown: false,
            snoops: []
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.getSnoops = this.getSnoops.bind(this);
        this.signIn = this.signIn.bind(this);
        this.closeClickOutside = this.closeClickOutside.bind(this);
    }
    togglePopup(e){
        e.stopPropagation();
        this.setState({
            signinshown: !this.state.signinshown
        });
    }
    toggleMenu(){
        this.setState({
            menushown: !this.state.menushown
        })
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
    closeClickOutside(selector){
        const modal = document.querySelector('.modal_form');
        window.addEventListener('click', (e) => {
            if ( e.target.className.indexOf('modal_form') === -1 
                && e.target.parentElement.className.indexOf('modal_form') === -1 
                && e.target.parentElement.parentElement.className.indexOf('modal_form') === -1 ) {
                this.setState({
                    signinshown: false
                });
            }
        });
    }
    signIn(e){
        e.preventDefault(); 
        e.stopPropagation();
        const form = document.getElementById('signInForm');
        console.log(form.elements.email.value);
        console.log(form.elements.password.value);
    }
    componentDidMount(){
        this.getSnoops();
        this.closeClickOutside();
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
                                <div onClick={() => this.toggleMenu()}  
                                    className={"burger " + ( this.state.menushown === true ? '' : 'active')}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <nav className={"snoops " + ( this.state.menushown === true ? 'active' : '')}>
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
                
                <div className={"modal_form " + ( this.state.signinshown === true ? 'active' : '')}>
                    <form className="form" id="signInForm" onSubmit={this.signIn}>
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
