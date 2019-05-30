// Initialize Map
var map = L.map('map').setView([36.65079252503468, -119.15771484375], 6);


// Create Tile layers for Base Layers
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}" , {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite-streets",
  accessToken: API_KEY
});

// Create bubble layer, displaying Magnitude data
var bubbles = L.bubbleLayer(ca_cities, {
  property: 'mag',
  legend: true,
  max_radius : 40,
  scale: 'YlGnBu',
  tooltip : true
})


// Function creates plates dict with key as plate name and value as random color
function getNames(data) {
  var plates = {};
  var result = data.features;
  for (var i = 0; i < result.length; i++) {
    plates[result[i].properties.PlateA] = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }
  return plates;
};

// Create boundaries layer with random colors function displaying Fault line data
var plates_colors = getNames(boundary_lines);
var boundaries = L.geoJSON(boundary_lines, {
  "weight": 5,
  "opacity": 0.8,
  style: function(features) {
    console.log("Plate = " + features.properties.PlateA);
    return {"color": plates_colors[features.properties.PlateA]};
  }
});

// Set Default map to dark & magnitude
map.addLayer(darkmap);
bubbles.addTo(map);


// Establish params for container
var baseMaps = {
  "Dark": darkmap,
  "Light": lightmap,
  "Satellite": satellite
};

var overlayMaps = {
  "Magnitude": bubbles,
  "Fault Lines": boundaries
}

L.control.layers(baseMaps, overlayMaps).addTo(map);












// map.on('overlayadd', function (eventLayer) {
//   // Switch to the Permafrost legend...
//   if (eventLayer.name === 'Magnitude') {
//       this.removeLayer(bubble);
//       // legend2.addTo(this);
//   // } else { // Or switch to the treeline legend...
//   //     this.removeControl(legend2);
//   //     legend1.addTo(this);
//   // }
//   };
// });

// var popuLegend = L.control(baseMaps, overlayMaps);

// map.on('overlayadd', function(eventLayer){
//   if (eventLayer.name === 'Magnitude'){
//       map.addControl(popuLegend);
//       console.log("Add Control")
//   } 
// });

// var popuLegend = L.control(baseMaps, overlayMaps);

// map.on('overlayremove', function(eventLayer){
//   if (eventLayer.name === 'Magnitude'){
//        map.removeControl(popuLegend);
//        console.log("Remove Control")
//       //  map.addLayer("Magnitude")
//        map.removeLayer(bubbles);
//       //  if (this.options.legend) {
//       //    console.log("if remove");
//       //   this.removeLayer(this._scale, this._max);
//       //   }
//       } 

// });