import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {renderCardsComponent} from './components/cards.js';

$(document).ready(function(){
	var CardsComponent = renderCardsComponent('cards');

	$('#regenerate').click(function(){
		CardsComponent.regenerateCards();
	});	
});

