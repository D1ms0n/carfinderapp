import React, { Component } from 'react';
import { Link } from 'react-router';

import messages from '../../services/messages';

class Header extends Component {
    constructor(props) {
        super(props);      
        this.state = {
            dropdownshown: false,
            menushown: false
        };
        this.toggleActions = this.toggleActions.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleActions(){
        this.setState({
            dropdownshown: !this.state.dropdownshown
        })
    }
    toggleMenu(){
        this.setState({
            menushown: !this.state.menushown
        })
    }
    componentDidMount(){
    }
    render() {
        return (
            <div>
                <header className="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="header_top">
                                <Link to='about'>{messages.messages.about}</Link>
                                <div className="float-right">
                                    <div onClick={() => this.toggleActions()} 
                                        className={"user_name " + ( this.state.dropdownshown === true ? 'active' : '')}>
                                        UserName
                                    </div>
                                    <div className={"actions " + ( this.state.dropdownshown === true ? 'fade' : '')}>
                                        <ul>
                                            <li>action 1</li>
                                            <li>action 2</li>
                                            <li>action 3</li>
                                        </ul>
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
                                        Some name
                                    </h1>
                                </div>
                                <div onClick={() => this.toggleMenu()}  
                                    className={"burger hidden " + ( this.state.menushown === true ? '' : 'active')}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <nav className={"menu hidden " + ( this.state.menushown === true ? 'active' : '')}>
                                    <ul>
                                        <li>nav 1</li>
                                        <li>nav 2</li>
                                        <li>nav 3</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                
            </div>
        );
    }
}
export default Header;
