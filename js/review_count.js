// 星级和评论数量
var dataReviewsum = [0,0,0,0,0,0];
var k;
d3.json("data/item.json",function(error,da){
	for(var i = 0;i<da.RECORDS.length;i++)
	{
		if(da.RECORDS[i].star == 0.0){
			k = parseInt(da.RECORDS[i].review_count);
			dataReviewsum[0] += k;
		}else if(da.RECORDS[i].star == 1.0){
			k = parseInt(da.RECORDS[i].review_count);
			dataReviewsum[1] += k;
		}else if(da.RECORDS[i].star == 2.0){
			k = parseInt(da.RECORDS[i].review_count);
			dataReviewsum[2] += k;
		}else if(da.RECORDS[i].star == 3.0){
			k = parseInt(da.RECORDS[i].review_count);
			dataReviewsum[3] += k;
		}else if(da.RECORDS[i].star == 4.0){
			k = parseInt(da.RECORDS[i].review_count);
			dataReviewsum[4] += k;
		}else if(da.RECORDS[i].star == 5.0){
			k = parseInt(da.RECORDS[i].review_count);
			dataReviewsum[5] += k;
		}
	}
	
		// 绘图
		var width = 395;
		var height = 125;
		var padding = {top:20,right:40,bottom:20,left:40};
		var svg = d3.select("#star").append("svg")
								.attr("width",width)
								.attr("height",height);
		var yScale = d3.scale.ordinal()
						.domain(d3.range(dataReviewsum.length))
						.rangeRoundBands([0,100],0.05);
							
		var xScale = d3.scale.linear()
						.domain([0,d3.max(dataReviewsum)])
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
		   .data(dataReviewsum)
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
		   .attr("fill","#faa755");
		   
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
		      	   	.attr("fill","#faa755");
		      });
		          
	   svg.selectAll("text")
		   .data(dataReviewsum)
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
				return d+"条";
		   });
			
		svg.append("g")
			.attr("class","axis")
			.attr("transform","translate("+padding.left+","+padding.top+")")
			.call(yAxis);
			
		svg.append("text")
		  .attr("x",245)
		  .attr("y",25)
		  .text("评论数量（共"+d3.sum(dataReviewsum)+"条）")
		  .attr("font-size", 14)
		  .attr("fill","white");
})