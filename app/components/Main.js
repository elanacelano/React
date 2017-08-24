// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./app/components/children/Form");
var Results = require("./app/components/children/Results");

// Helper Function
var helpers = require("./app/utils/helpers.js");

//import styles from
var styles = require('./app.css');

// connection with MongoDB
mongoose.connect('mongodb://localhost/myapp');

// This is the main component.
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", results: "" };
  },

  // If the component updates we'll run this code
  componentDidUpdate: function(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then(function(data) {
        if (data !== this.state.results) {
          console.log("HERE");
          console.log(data);

          this.setState({ results: data });
        }

        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },
  // We use this function to allow children to update the parent with searchTerms.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h1 className="text-center">NY Times</h1>
              <h2 className="text-center">a journey through the times</h2>
            <a href="#/search"><button className="btn btn-default">Search</button></a>
            </div>
          <div clasName="row">
          <div ClassName=" text-center">
        </div> 
      </div> 
          <div className="container">
                  {this.props.children}
          </div>        
        </div>
      </div>
    );
  }
);
//             <p className="text-center">
//               <em>Enter a term to search</em>
//             </p>
//           </div>

//           <div className="col-md-6">

//             <Form setTerm={this.setTerm} />

//           </div>

//           <div className="col-md-6">

//             <Results article={this.state.results} />

//           </div>

//         </div>

//       </div>
//     );
//   }
// });

// Export the component back for use in other files
module.exports = Main;













