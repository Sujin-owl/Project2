// call our own API route
// Since the data is already stored an array of traces, we 
// simply pass the API's response into the plot function.

var url = '/api/v1.0/drug_data';
d3.json(url).then(function(data) {
    console.log(data)
  });

var url = '/api/v1.0/unemployment';
d3.json(url).then(function(data) {
    console.log(data)
});