import $ from 'jquery';

export function getCardsData(component) {
	var url = './assets/data/cards.json';

	var characters = JSON.parse(window.localStorage.getItem('characters')) || [];
	var situations = JSON.parse(window.localStorage.getItem('situations')) || [];

	if(characters && characters.length >= 2){
		setCardsData(component, characters, situations);
	}else{
		fetch(url).then(function(res){
			res.json().then(function(data) {
				characters = data.characters;
				situations = data.situations;
				
				setCardsData(component, characters, situations);
			}); 
		}).catch(function(err) {
			console.log('Fetch Error:', err);  
		});
	}
}

function setCardsData(component, characters, situations){
	console.log('characters:', characters);
	console.log('situations:', situations);

	var selectedCharacters = [];
	var selectedSituations = [];

	for (var i=0; i<2; i++){
		var index = getRandomInt(0, characters.length-1);
		selectedCharacters.push(characters[index].text);
		characters.splice(index, 1);
	}

	for (var i=0; i<2; i++){
		var index = getRandomInt(0, situations.length-1);
		selectedSituations.push(situations[index].text);
		situations.splice(index, 1);
	}

	window.localStorage.setItem('characters', JSON.stringify(characters));
	window.localStorage.setItem('situations', JSON.stringify(situations));	

	var data = {};
	data.characters = selectedCharacters;
	data.situations = selectedSituations;

	//console.log('component:', component);
	component.setState({
		data: data
	});
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}