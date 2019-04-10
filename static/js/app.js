// function buildMetadata(state) {

//   // @TODO: Complete the following function that builds the metadata panel

//   // Use `d3.json` to fetch the metadata for a sample
//   // var url = "/metadata/<sample>";
//   d3.json(`/api/v1.0/statedata/${state}`).then(function(response){
//   // Use d3 to select the panel with id of `#sample-metadata`
//   var selection = d3.select("#sample-metadata");
//   // Use `.html("") to clear any existing metadata
//   selection.html("");
//   // Use `Object.entries` to add each key and value pair to the panel
//   Object.keys(response).forEach((key) => {
//     selection.append("p")
//     .text(`${key}`)
//   });
//   console.log(p);
// })
// };
    
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

function buildCharts(state) {
  var drug = [];
  var unemploy = [];
  var time = [];
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // var url = "/samples/<sample>"
  d3.json(`/api/v1.0/statedata/${state}`).then(function(response){
    var data = response;
    var drug_values = data.number_drug_overdose_death;
    var unemploy_values = data.unemployment_data;
    console.log(drug_values);
    drug = Object.values(drug_values);
    console.log(drug);
    unemploy = Object.values(unemploy_values);
    time = Object.keys(unemploy_values);

    // @TODO: Build a Bubble Chart using the state data
  var trace1 = {
    x: drug,
    y: unemploy,
    type:"scatter",
    mode:"markers",
    marker:{
      color:unemploy,
      size:unemploy
    },
    text:time
  };
  var data1 = [trace1]
  var layout = {
    xaxis: {title:"Number of Drug Overdose Death"},
    yaxis:{title:"Unemployment Rate"}
  };
  Plotly.newPlot("bubble", data1, layout);
    // @TODO: Build a Bar Chart
 
  // var trace2 = {
  //   x:time,
  //   y:drug,
  //   // hovertext: otu_labels.slice(0,10),
  //   type:"bar",
  //   name: 'Drug_Death'
  // };
  // var trace3 = {
  //   x:time,
  //   y:unemploy,
  //   type:"bar",
  //   name:'Unemployment_Rate'

  // };
  // var layout = {
  //   height: 500,
  //   width: 500
  // }
  // data2 = [trace2, trace3];
  var data = [
    {
      type: 'bar',
      x: time,
      y: drug,
      base: -drug,
      marker: {
        color: 'orange'
      },
      name: 'drug'
    },
    {
      type: 'bar',
      x: time,
      y: unemploy,
      base: 0,
      marker: {
        color: 'lightblue'
      },
      name: 'unemploy'
    }]
  Plotly.newPlot("bar1",data);

});
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/api/v1.0/states").then((states) => {
    states.forEach((state) => {
      selector
        .append("option")
        .text(state)
        .property("value", state);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = states[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();