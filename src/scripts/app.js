import $ from 'jquery';

import {init} from './modules/test.js';

$(document).ready(function(){
	console.log('ready');
	document.body.innerHTML += '<div>Hello World</div>';
	init();
});