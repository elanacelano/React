// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "096a8ab095c145d4be3a6697ee63e7ab";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

  runQuery: function(article) {

    console.log(article);

    // Figure out the geolocation
    var queryURL = "http://api.opencagedata.com/geocode/v1/json?query=" + location + "&pretty=1&key=" + geocodeAPI;

    //var url = https://www.nytimes.com/

    return axios.get(queryLink).then(function(response) {

      console.log(response);
      return response.data.results[0].formatted;
    });

  }

};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;