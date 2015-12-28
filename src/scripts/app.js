import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {init} from './modules/test.js';

$(document).ready(function(){
	console.log('ready');
	init();
});

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('cards')
);