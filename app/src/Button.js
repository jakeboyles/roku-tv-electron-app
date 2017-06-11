import React, { Component } from 'react';
import axios from 'axios';
import consts from './constants';
import './App.css';

class Button extends Component {

  constructor(props){
    super();
  }

  click(){
    axios.get(`${consts.host}:${consts.serverPort}/button-${this.props.type}`)
    .then((res)=> {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="Button">
        <button id={this.props.type} className="button" onClick={this.click.bind(this)}></button>
      </div>
    );
  }
}

export default Button;
