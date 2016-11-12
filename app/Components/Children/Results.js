// Include React 
var React = require('react');

// This is the results component
var Results = React.createClass({

	buttonClick: function(){

	// Set the parent to have the search term
	// this.props.setTerm(this.state.term,this.state.startYear, this.state.endYear);
	console.log('clicked in the results');

	},


	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Results</h3>
				</div>
				<div className="panel-body text-center">
					{this.props.results.map(function(search, i,j)
						{	var ident=search;
							return <div>
							<p key={i}>{search}</p>
							<button key={j} type="button" className="btn btn-primary" id={ident} onClick={buttonClick}>Save</button>
							</div>
						}
					)}
				</div>
			</div>

		)
	}
});

function buttonClick(){
	console.log('clicked the button ');
}
// Export the component back for use in other files
module.exports = Results;