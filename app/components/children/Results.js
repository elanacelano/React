// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>New York Times</h1>
          <h2>A Journey Through The Times</h2>      
          <p>{this.props.article}</p>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;