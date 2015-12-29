import React from 'react';
import ReactDOM from 'react-dom';

import {getCardsData} from '../modules/data.js';

class Cards extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			data:[]
		};
	}
	componentDidMount(){
		getCardsData(this);
	}	
	render(){
		return(
			<div>
				<Card text="test" />
			</div>
		);
	}
}

class Card extends React.Component{
	render(){
		return(
			<div>
				<h1>This is a single card component</h1>
				<div>This is the text: {this.props.text}</div>
			</div>
		);
	}
}

export function renderCardsComponent(id) {
	ReactDOM.render(
		<Cards />,
		document.getElementById(id)
	);
}