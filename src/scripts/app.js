import $ from 'jquery';

import init from './modules/test.js';

$(document).ready(function(){
	document.body.innerHTML += '<div>Hello World</div>';
	init();
});