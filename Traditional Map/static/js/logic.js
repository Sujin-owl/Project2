// Creating map object
var map = L.map("map", {
  center: [37.8, -96],
  zoom: 16
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 6,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";
// var link = "https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson"

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(map);
});



// legend.addTo(map);

// // // Perform an API call to Unemployment API to get unemployment information. Call createMarkers when complete
// // d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);