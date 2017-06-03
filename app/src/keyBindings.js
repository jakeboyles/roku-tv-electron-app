import Mousetrap from 'mousetrap';
import consts from './constants';
import axios from 'axios';

export default {

	bindings: () => {
		Mousetrap.bind('up', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/volume-up`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('down', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/volume-down`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('w', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/button-up`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('x', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/button-down`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('a', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/button-left`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('d', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/button-right`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('s', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/button-select`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });

	      Mousetrap.bind('h', ()=> {
	      	const path = `${consts.host}:${consts.serverPort}/button-home`;
		    axios.get(path)
		    .then((response)=> console.log(response));
	      });
  	}
}