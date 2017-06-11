import Mousetrap from 'mousetrap';
import consts from './constants';
import axios from 'axios';

export default {

	bindings: () => {
		Mousetrap.bind('up', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/volume-up`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('down', (e)=> {
			e.preventDefault();
			const path = `${consts.host}:${consts.serverPort}/volume-down`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('w', (e)=> {
			const path = `${consts.host}:${consts.serverPort}/button-up`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('x', (e)=> {
			const path = `${consts.host}:${consts.serverPort}/button-down`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('a', (e)=> {
			const path = `${consts.host}:${consts.serverPort}/button-left`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('d', (e)=> {
			const path = `${consts.host}:${consts.serverPort}/button-right`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('s', (e)=> {
			const path = `${consts.host}:${consts.serverPort}/button-select`;
			axios.get(path)
			.then((response)=> console.log(response));
		});

		Mousetrap.bind('h', (e)=> {
			const path = `${consts.host}:${consts.serverPort}/button-home`;
			axios.get(path)
			.then((response)=> console.log(response));
		});
  	}
}