    function draw(selector, url, xTitle) {
    var margin = {top: 80, right: 80, bottom: 80, left: 80},
        width = ((window.innerWidth < 400) ? window.innerWidth : window.innerWidth * 0.5) - margin.left - margin.right,
        height = .405 * width;
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    // create yAxis
    var yAxis = d3.svg.axis().scale(y0).ticks(6).orient("left");
    var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    d3.json(url,
        function (data) {
      x.domain(data.map(function(d) { return d.month; }));
    //scale the data range
    //sets the max automatically to the maximum of either years
      y0.domain([0, d3.max(data, function(d) { return Math.max(d.current); })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
    	.append("text")
    	  .attr("x", width * 1.14)
    	  .attr("dx", "-2em")
    	  .style("text-anchor", "end")
    	  .text(xTitle);
      svg.append("g")
    	  .attr("class", "y axis axis")
    	  .attr("transform", "translate(0,0)")
    	  .call(yAxis)
    	.append("text")
    	  .attr("y", 6)
    	  .attr("dy", "-2em")
    	  .style("text-anchor", "end")
    	  .text("Infections");

      bars = svg.selectAll(".bar").data(data).enter();

      bars.append("rect")
          .attr("class", "bar2")
          .attr("x", function(d) { return x(d.month); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y0(d.current); })
    	  .attr("height", function(d,i,j) { return height - y0(d.current); })
          .on("mouseover", function(d) {
            tooltip.transition()		
                .duration(200)		
                .style("opacity", .9);		
            tooltip.html(d.current + " infections")	
                .style("font", "10px sans-serif")
                .style("font-weight", "bold")
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

    function type(d) {
      d.current = +d.current;
      return d;
    }
    });
    }
