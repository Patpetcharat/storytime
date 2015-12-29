import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {getCardsData} from './modules/data.js';
import {renderCardsComponent} from './components/cards.js';

$(document).ready(function(){
	console.log('ready');
	getCardsData();
});

renderCardsComponent('cards');

