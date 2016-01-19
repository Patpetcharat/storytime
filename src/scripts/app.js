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

		if($(window).width() < 768){
			$('.cards-container').each(function(){
				TweenLite.set($(this), {height:$(this).height()});
			});
		}else{
			TweenLite.set('.cards-container', {height:'auto'});
		}

		TweenLite.delayedCall(transitionTime, function(){
			CardsComponent.regenerateCards();
		});

		// Track Event
		ga('send', 'event', 'Regenerate', 'click', 'Main Regenerate Button');
	});

	// Handle event triggered when cards are regenerated
	$(CardsComponent).on('CardsDidUpdate', function(){
		$('#cards .card').each(function(index, value){
			TweenLite.fromTo($(this), duration, {
				x:100, opacity:0
			}, {
				x:0, opacity:1, delay:stagger*index
			});
		});

		if($(window).width() < 768){
			$('.cards-container').each(function(){
				var newHeight = 0;

				$(this).children().each(function(){
					newHeight += $(this).outerHeight();
					console.log('newHeight', newHeight);
				});

				newHeight += parseInt($(this).css('padding-bottom'), 10);

				TweenLite.to($(this), 0.25, {height: newHeight});
			});
		}
	});
});

