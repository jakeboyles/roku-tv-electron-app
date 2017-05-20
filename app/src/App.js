import React, { Component } from 'react';
import Volume from './Volume';
import Button from './Button';
import Channel from './Channel';
import Movie from './Movie';
import io from 'socket.io-client';
import consts from './constants';
import './App.css';
import loading from'../public/images/loading.gif';


class App extends Component {

  constructor(){
  	super();
  	this.state = {
  		connected:'hide',
  		channels:[],
  	}
  }

  componentDidMount() {
  	const socket = io.connect(`http://localhost:${consts.socketPort}`);
      socket.on('connected', ()=>{
      	this.setState({
      		connected:'show'
      	});
      });

      socket.on('channels', (channels)=>{
      	this.setState({
      		channels:channels
      	});
      	console.log(channels);
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

		    	<Button type="select" />
		    </div>

		    <div className="controls">
		    	<div className="inner">
			    	<Button type="up" />
			    	<Button type="left" />
			    	<Button type="home" />
			    	<Button type="right" />
			    	<Button type="down" />
			    	<Button type="rewind" />
			    	<Button type="play" />
		    		<Button type="fastforward" />
		    	</div>
		    </div>

		    <div className="apps">
		    	<h3>Apps</h3>
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
