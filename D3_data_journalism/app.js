// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".row")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// IMport Data
d3.csv("data.csv").then(function(SmokerData){

    // Parse Data/Cast as numbers
    // ==============================
    SmokerData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
      });    

    // Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(SmokerData, d => d.age), d3.max(SmokerData, d => d.age)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(SmokerData, d => d.smokes), d3.max(SmokerData, d => d.smokes)])
      .range([height, 0]);

    // Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //  Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("g")
      .text(SmokerData, d => d.abbr);

    // Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(SmokerData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");


    circlesGroup.append("text")
      //We return the abbreviation to .text, which makes the text the abbreviation.
      .text(function (d) {
          return d.abbr;
      })
      //Now place the text using our scale.
      .attr("dx", function (d) {
          return xLinearScale(d['age']) - 10;
      })
      .attr("dy", function (d) {
          // When the size of the text is the radius,
          // adding a third of the radius to the height
          // pushes it into the middle of the circle.
          return yLinearScale(d['smokes']) + 10 / 2.5;
      })
      .attr("font-size", 15)
      .attr("class", "stateText")
    

    

    
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height-100))
      .attr("dy", "1em")
      .attr("class", "axisText")
      

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Average Age (yrs)");

    


}).catch(function(error) {
    console.log(error);
  });