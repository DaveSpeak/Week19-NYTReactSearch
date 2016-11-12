// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
var nytAPI = "8aaababbcb3b4a1090ba37660f62ff69";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(location,startYear,endYear){

		//Call the query
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q="
		 + location + "&begin_date="+ startYear +"0101"+"&end_date="+endYear+"0101";

		return axios.get(queryURL)
			.then(function(response){

				return response.data.response.docs;
		})

	},

	// This function hits our own server to retrieve the record of query results
	getSaved: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postSaved: function(location){

		return axios.post('/api', {location: location})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;