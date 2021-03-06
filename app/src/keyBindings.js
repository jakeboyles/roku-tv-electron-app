import Mousetrap from 'mousetrap';
import consts from './constants';
import axios from 'axios';

export default {

	bindings: () => {
		Mousetrap.bind('u', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/volume-up`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('d', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/volume-down`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('up', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/button-up`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('down', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/button-down`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('left', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/button-left`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('right', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/button-right`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('return', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/button-select`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('h', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/button-home`;
			axios.get(path)
			.then((response)=> console.log(response));
		});
  	}
}