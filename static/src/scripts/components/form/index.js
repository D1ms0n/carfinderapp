import React, { Component } from 'react';

class Form extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            menushown: true,
        };        
    }   
    render() {
        return (
            <div>            
                <form>
                    <label>Label</label>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </form>        
            </div>
        );
    }
}

export default Form;
