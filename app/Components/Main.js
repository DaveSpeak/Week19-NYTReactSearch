// Include React 
var React = require('react');

// Here we include all of the sub-components
var Search = require('./Children/Search');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');
var init=[' '];
// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			results: init,
			pubDate: init,
			webUrl: init,
			startYear: 0,
			endYear: 0,
			saved: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setTerm: function(term,startYear,endYear){
		this.setState({
			searchTerm: term,
			startYear:startYear,
			endYear: endYear
		})
	},

	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			// console.log("In the update module");
			// console.log(this.state.searchTerm);
			// console.log(this.state.startYear);
			// console.log(this.state.endYear);

			// Run the query for the address
			helpers.runQuery(this.state.searchTerm, this.state.startYear, this.state.endYear)
				.then(function(data){
					if (data != this.state.results)
					{
						// console.log("Address", data);
				console.log('back in the main');
				var headline=[];
				var pubData=[];
				var webUrl=[];
				for (var i=0;i<data.length;i++){
					headline.push(data[i].headline.main);
					pubData.push(data[i].pub_date);
					webUrl.push(data[i].web_url);
					// returnedData[i].headline=data[i].headline.main;
					// returnedData[i].pub_date=data[i].pub_date;
					// returnedData[i].web_url=data[i].web_url;
				}

						this.setState({
							results: headline,
							pubDate: pubData,
							webUrl: webUrl
						})
						// console.log('here are the results:');
						// console.log(this.state.results);
						// console.log(this.state.pubDate);
						// console.log(this.state.webUrl);
						// After we've received the result... then post the search term to our history. 
						helpers.postSaved(this.state.searchTerm)
							.then(function(data){
								console.log("Updated!");

								// After we've done the post... then get the updated history
								helpers.getSaved()
									.then(function(response){
										console.log("Current History", response.data);
										if (response != this.state.saved){
											console.log ("History", response.data);

											this.setState({
												saved: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
						)
					}
				}.bind(this))
				
			}
	},

	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getSaved()
			.then(function(response){
				if (response != this.state.saved){
					console.log ("History", response.data);

					this.setState({
						saved: response.data
					})
				}
			}.bind(this))
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article Scrubber</h2>
						<p className="text-center"><em>Search for and annotate articles of interest!</em></p>
					</div>

					<div className="row">
					
						<Search setTerm={this.setTerm}/>

					</div>

					<div className="row">
				
						<Results results={this.state.results} />

					</div>

				</div>

				<div className="row">

					<Saved saved={this.state.saved}/> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;