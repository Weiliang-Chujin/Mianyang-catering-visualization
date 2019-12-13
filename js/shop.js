// 星级和商家数量
var dataShopsum = [0,0,0,0,0,0];
d3.json("data/item.json",function(error,da){
	for(var i = 0;i<da.RECORDS.length;i++)
	{
		if(da.RECORDS[i].star == 0.0){
			dataShopsum[0]++;
		}else if(da.RECORDS[i].star == 1.0){
			dataShopsum[1]++;
		}else if(da.RECORDS[i].star == 2.0){
			dataShopsum[2]++;
		}else if(da.RECORDS[i].star == 3.0){
			dataShopsum[3]++;
		}else if(da.RECORDS[i].star == 4.0){
			dataShopsum[4]++;
		}else if(da.RECORDS[i].star == 5.0){
			dataShopsum[5]++;
		}
	}
		// 绘图
		var width = 390;
		var height = 125;
		var padding = {top:20,right:20,bottom:20,left:40};
		var svg = d3.select("#star").append("svg")
								.attr("width",width)
								.attr("height",height);
		var yScale = d3.scale.ordinal()
						.domain(d3.range(dataShopsum.length))
						.rangeRoundBands([0,100],0.05);
							
		var xScale = d3.scale.linear()
						.domain([0,d3.max(dataShopsum)])
						.range([0,300]);
		
		var yAxisScale = d3.scale.ordinal()
						.domain(d3.range(0,dataReviewsum.length))
						.rangeRoundBands([0,100]);
							
		var xAxisScale = d3.scale.linear()
						.domain([0,d3.max(dataReviewsum)])
						.range([0,300]);
		
		var yAxis = d3.svg.axis()
						.scale(yAxisScale)
						.orient("left")
						.tickFormat(function(d,i) { return i+"星级"; });
		
		var rect = svg.selectAll("rect")
		   .data(dataShopsum)
		   .enter()
		   .append("rect")
		   .attr("y", function(d,i){
				return padding.top + yScale(i);
		   })
		   .attr("x",function(d,i){
				return padding.left;
		   })
		   .attr("height", function(d,i){
				return yScale.rangeBand();
		   })
		   .attr("width",function(d,i){
				return xScale(d);
		   })
		   .attr("fill","#00a6ac"); 
	    rect.on("click",function(d,i){
				d3.select(this)
				  .attr("fill","#1d953f");
		   })
		.on("mouseover",function(d,i){
		   		d3.select(this)
					.attr("fill","red");
		   })
		   .on("mouseout",function(d){
		   	   d3.select(this)
			    .transition()
		        .duration(500)
		   	   	.attr("fill","#00a6ac");
		   });
	    svg.selectAll("text")
		   .data(dataShopsum)
		   .enter()
		   .append("text")
		   .attr("x", function(d, i){
	             return padding.left + xScale(d);
			 })
			.attr("y", function(d,i){
				 return padding.top + yScale(i);
			 })
		    .attr("dx", yScale.rangeBand()/2)
			.attr("dy", "1em")
		   .attr("text-anchor", "begin")
		   .attr("font-size", 14)
		   .attr("fill","white")
		   .text(function(d,i){
				return d+"家";
		   });
		   
		   svg.append("g")
		   	.attr("class","axis")
		   	.attr("transform","translate("+padding.left+","+padding.top+")")
		   	.call(yAxis);	
			
			svg.append("text")
			  .attr("x",245)
			  .attr("y",20)
			  .text("店铺数量（共"+d3.sum(dataShopsum)+"家）")
			  .attr("font-size", 14)
			  .attr("fill","white");   
})