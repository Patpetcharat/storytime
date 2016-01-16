import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {getCardsData} from '../modules/data.js';

class Cards extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			"data":{
				"characters" : [],
				"situations" : []
			}
		}
	}
	componentDidMount(){
		getCardsData(this);
	}
	regenerateCards(){
		getCardsData(this);
	}
	componentDidUpdate(){
		$(this).trigger('CardsDidUpdate');
	}
	render(){
		var characterCards = this.state.data.characters.map(function(character, i) {
			return (
				<Card key={i} text={character} type="character"/>
			);	
		});

		var situationCards = this.state.data.situations.map(function(situation, i) {
			return (
				<Card key={i} text={situation} type="situation"/>
			);	
		});

		return(
			<div>
				<div className="characters section">
					<h1 className="lato medium">the Character</h1>
					{characterCards}
				</div>
				<div className="situations section">
					<h1 className="lato dark">the Elements</h1>
					{situationCards}
				</div>
			</div>
		);
	}
}

class Card extends React.Component{
	render(){
		return(
			<div className={"card " + this.props.type}>
				<div className="text">{this.props.text}</div>
			</div>
		);
	}
}

export function renderCardsComponent(id) {
	return ReactDOM.render(
		<Cards />,
		document.getElementById(id)
	);
}

export function regenerateCards(){

}