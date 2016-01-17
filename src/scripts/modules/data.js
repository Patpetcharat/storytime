import $ from 'jquery';

var fetchedData = null;
var url = './assets/data/cards.json';
var characters;
var situations;
var dataIsFetching = false;

var requiredDataObjects = [characters, situations];

var component;

export function getCardsData(_component) {
	component = _component;
	characters = JSON.parse(window.localStorage.getItem('characters')) || [];
	situations = JSON.parse(window.localStorage.getItem('situations')) || [];

	if(characters.length >= 2 && situations.length >= 2){
		console.log('already have enough data');
		setCardsData(component, characters, situations);
	}else{
		fetchData();
	}
}

function fetchData(){
	if(fetchedData){
		console.log('already fetched:', fetchedData);

		characters = fetchedData.characters.slice();
		situations = fetchedData.situations.slice();

		setCardsData(component, characters, situations);
	}else{
		if(dataIsFetching){
			console.log('fetching already in progress');
		}else{
			console.log('start fetching');

			$.getJSON( url, function(res) {
				console.log( "success: ", res );
				console.log(" success characters:", res.characters);
				
				//JSON.parse(res);
				fetchedData = res;

				if(characters.length < 2){
					characters = res.characters.slice();
				}

				if(situations.length < 2){
					situations = res.situations.slice();
				}

				dataIsFetching = false;
				
				setCardsData(component, characters, situations);
			})
			.fail(function() {
				console.log( "error" );
			});
		}
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