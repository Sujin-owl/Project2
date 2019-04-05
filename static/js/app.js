// call our own API route

var url = '/api/v1.0/drug_data';
d3.json(url).then(function (data) {
  console.log(data.Drugs[0])
});

// var url = '/api/v1.0/unemployment';

// d3.json(url).then(function (data) {
//   console.log(data.Unemployment[0].Abbreviation == "DE")
// });