// Previous Month
var earthquakeMo = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Previous Week
var earthquakeWk = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Fault-line boundaries
var boundariesSrc = "demo/boundaries.geojson"

var ca_cities = d3.json(earthquakeWk, function(data) {
  console.log(data)
});

