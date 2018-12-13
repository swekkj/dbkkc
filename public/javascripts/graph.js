

var arc = d3.arc().innerRadius(100).outerRadius(240);

var svg = d3.select("svg");
var width = +svg.attr("width");
var height = +svg.attr("height");
var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 +")");

var url = 'localhost:3000/signin'

var data = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
var arcs = d3.pie()(data);

console.log("arcs: ", arc(arcs[0]))

var background = g.selectAll("path")
    .data(arcs)
    .enter()
    .append("path")
    .style("fill", function(d,i){
      return d3.color("hsl(120, 50%, " + d.value + "%)");
    })
    .attr("d", arc)
