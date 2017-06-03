import React, { Component } from 'react';
import axios from 'axios';
import consts from './constants';
import './App.css';

class Channel extends Component {

  constructor(props){
    super();
    this.click = this.click.bind(this);
  }

  click(){
    axios.get(`${consts.host}:${consts.serverPort}/movie-${this.props.name}`)
    .then((response)=> {
      console.log(response);
    });
  }

  render() {
    return (
      <div className="App">
        <button id={this.props.name} className="button" onClick={this.click}>{this.props.name}</button>
      </div>
    );
  }
}

export default Channel;
