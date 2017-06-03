import React, { Component } from 'react';
import Volume from './Volume';
import Button from './Button';
import Channel from './Channel';
import Movie from './Movie';
import io from 'socket.io-client';
import consts from './constants';
import keybindings from './keyBindings';
import './App.css';
import loading from'../public/images/loading.gif';
import axios from 'axios';



class App extends Component {

  constructor(){
  	super();
  	this.state = {
  		connected:'hide',
  		channels:[],
  	}
  }

  componentDidMount() {
  	const socket = io.connect(`${consts.host}:${consts.socketPort}`);
      socket.on('connected', ()=>{
      	this.setState({
      		connected:'show'
      	});

      	keybindings.bindings();

      });

      socket.on('channels', (channels)=>{
      	this.setState({
      		channels:channels
      	});
      });

      socket.emit('new', true);
  }

  render() {
    return (
	<div className="App">
		<div id="loading" className={this.state.connected}>
			<h4>Finding Your Rokus</h4>
			<img className="logo" src={loading} />
		</div>
		<div className={this.state.connected}>
			<h1>Roku</h1>
		  	<div className="volumes">
		    	<Volume type="up" />
		    	<Volume type="down" />

		    	<Button type="home" />
		    </div>

		    <div className="controls">
		    	<div className="inner">
			    	<Button type="up" />
			    	<Button type="left" />
			    	<Button type="select" />
			    	<Button type="right" />
			    	<Button type="down" />
			    	<Button type="rewind" />
			    	<Button type="play" />
		    		<Button type="fastforward" />
		    	</div>
		    </div>

		    <div className="apps">
		    	{this.state.channels.map(channel=>{
		    		return <Channel channelname={channel.name} id="{channel.id}" />
		    	})}
		    </div>
		</div>
	</div>
    );
  }
}

export default App;
