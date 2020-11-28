// Wee 17: leaflet-challenge homework

// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
// Store our API endpoint inside queryURL


// Store our API endpoint inside queryURL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create a map object. Use coordinates [37.09, -95.71]. This is from Geo-Json activity.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // view the data of response
  var features = data.features;
  console.log(features);

  for (var i = 0; i < features.length; i++) {
    var geometry = features[i].geometry.coordinates;
    var coordinates = {lat: geometry[1], lng: geometry[0]};
    var latLng = L.latLng(coordinates.lat, coordinates.lng);
    var magnitude = features[i].properties.mag;
    var title = features[i].properties.title;
    
    // Set colors for magnitude markers and legend
    var color = "";

    if (magnitude < 1) {
      color = "#80FF00";
    }
    else if (magnitude >= 1 && magnitude < 2) {
      color = "#BFFF00";
    }
    else if (magnitude >= 2 && magnitude < 3) {
      color = "#FFBF00";
    }
    else if (magnitude >= 3 && magnitude < 4) {
      color = "#FF8000";
    }
    else if (magnitude >= 4 && magnitude < 5) {
      color = "#FF4000";
    }
    else {
      color = "#FF0000";
    }
    // set circle markers for magnitude scales
    L.circle(latLng, {
      fillOpacity: 0.75,
      color: "none",
      fillColor: color,
      radius: magnitude * 40000
    }).bindPopup("<h1>" + title + "</h1>").addTo(myMap);

  }
});

// Define streetmap
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

