var width  = 200;
	var height = 215;
	
	var svg = d3.select("#mianyang").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(0,0)");
	
	var projection = d3.geo.mercator()
						.center([104, 32])
						.scale(4000)
    					.translate([width/2.5-16, height/2.5+9]);
	
	var path = d3.geo.path()
					.projection(projection);
	
	
	var color = d3.scale.category20();
	
	
	d3.json("./data/mianyang.json", function(root) {
		
		
		console.log(root);
		
		svg.selectAll("path")
			.data( root.features )
			.enter()
			.append("path")
			.attr("stroke","#000")
			.attr("stroke-width",1)
			.attr("fill", "yellow")
			.attr("d", path )
			.on("mouseover",function(d,i){
                 d3.select(this)
                .attr("opacity",0.5);
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                .attr("opacity",1.0);
            });	
	});