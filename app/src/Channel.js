import React, { Component } from 'react';
import axios from 'axios';
import consts from './constants';
import './App.css';

class Channel extends Component {

  constructor(props){
    super();
  }

  click(){
    axios.get(`${consts.host}:${consts.serverPort}/app-${this.props.channelid}`)
    .then((res)=> {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="Channel">
        <button id={this.props.channelname} className="button app" onClick={this.click.bind(this)}>{this.props.channelname}</button>
      </div>
    );
  }
}

export default Channel;
