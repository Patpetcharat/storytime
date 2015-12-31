import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TweenLite from 'gsap';

import {renderCardsComponent} from './components/cards.js';

$(document).ready(function(){
	var CardsComponent = renderCardsComponent('cards');

	var duration = 0.5;
	var stagger = 0.1;

	$('#regenerate').click(function(){
		var transitionTime = $('#cards .card').length * stagger + duration;

		$('#cards .card').each(function(index, value){
			TweenLite.to($(this), duration, {
				x:-$(this).position().left, opacity:0, delay:stagger*index
			});
		});

		TweenLite.delayedCall(transitionTime, function(){
			CardsComponent.regenerateCards();
			// After the component updates, the  reveal animation will be 
			// triggered with a Cards Did Update event
		});
	});

	$(CardsComponent).on('CardsDidUpdate', function(){
		$('#cards .card').each(function(index, value){
			TweenLite.fromTo($(this), duration, {
				x:100, opacity:0
			}, {
				x:0, opacity:1, delay:stagger*index
			});
		});
	});
});

