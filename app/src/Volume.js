import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import consts from './constants';


class Volume extends Component {

  constructor(props){
    super();
  }

  click(){
    const path = `${consts.host}:${consts.serverPort}/volume-${this.props.type}`;
    
    axios.get(path)
    .then((res)=> {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="Volume">
        <button id={this.props.type} className="button" onClick={this.click.bind(this)}></button>
      </div>
    );
  }
}

export default Volume;
