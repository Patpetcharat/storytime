import React from 'react';
import ReactDOM from 'react-dom';

class Cards extends React.Component{
	render(){
		return(
			<div>
				<h1>This is a cards component</h1>
				<Card text="This is a test" />
			</div>
		);
		
	}
}

class Card extends React.Component{
	render(){
		return(
			<h1>This is a single card component</h1>
		);
	}
}

export function renderCardsComponent(id) {
	ReactDOM.render(
		<Cards />,
		document.getElementById(id)
	);
}