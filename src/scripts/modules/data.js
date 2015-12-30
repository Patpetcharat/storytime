import $ from 'jquery';

export function getCardsData(component) {
	var url = './assets/data/cards.json';

	fetch(url)
		.then(function(res){
			res.json().then(function(data) {  
				var characters = data.characters;
				var situations = data.situations;

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

				var data;
				data.characters = selectedCharacters;
				data.situations = selectedSituations;

				//console.log('component:', component);
				component.setState({
					data: data
				});
			}); 
		}).catch(function(err) {  
			console.log('Fetch Error:', err);  
		});
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}