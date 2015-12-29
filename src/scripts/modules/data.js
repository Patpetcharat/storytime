import $ from 'jquery';

export function getCardsData() {
	var url = './assets/data/test_character_cards.json';

	// $.ajax({
	// 	url: url,
	// 	dataType: 'json',
	// 	cache: false,
	// 	success: function(data) {
	// 		console.log('success:', data);
	// 		//this.setState({data: data});
	// 	}.bind(this),
	// 	error: function(xhr, status, err) {
	// 		console.log('error:', err);
	// 		//console.error(this.props.url, status, err.toString());
	// 	}.bind(this)
	// });

	fetch(url)
		.then(function(res){
			res.json().then(function(data) {  
				console.log('data:', data.cards);  
			}); 
		}).catch(function(err) {  
			console.log('Fetch Error:', err);  
		});
}