// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Result Component
var Results = require("./components/children/Results");

// This code here allows us to render our main component (in this case Parent)
ReactDOM.render(<Results />, document.getElementById("app"));
