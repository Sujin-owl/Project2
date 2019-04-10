// call our own API route

var url = '/api/v1.0/combined';
d3.json(url).then(function (data) {
  console.log(data)
});
