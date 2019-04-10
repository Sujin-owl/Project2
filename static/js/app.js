// call our own API route

var url = '/api/v1.0/drug_data';
d3.json(url).then(function (data) {
  console.log(data.Drugs[0])
});

var url = '/api/v1.0/unemployment';

d3.json(url).then(function (data) {
  console.log(data.Unemployment[0].Abbreviation == "DE")
});

chartGroup.call(toolTip);

chartGroup.selectAll("rect")
.data(dataArray)
.enter()
.append("rect")
.attr("x", (d, i) => xScale(dataCategories[i]))
.attr("y", d => yScale(d))
.attr("width", xScale.bandwidth())
.attr("height", d => chartHeight - yScale(d))
.attr("fill", "green")
// event listener for onclick event
.on("click", function(d, i) {
  alert(`Hey! You clicked bar ${dataCategories[i]}!`);
})
// event listener for mouseover
.on("mouseover", function() {
  d3.select(this)
        .attr("fill", "red");
})
// event listener for mouseout
.on("mouseout", function() {
  d3.select(this)
        .attr("fill", "green");
});


makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);