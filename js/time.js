var dataTime = new Array(33390);
var dataTimesum = [0,0,0,0,0,0,0,0,0,0,0];
var sub;
var k=0;
// 获取月份与评论数量的统计数据
d3.json("data/useritem.json",function(error,da){
	for(var i = 0;i<da.RECORDS.length;i++)
	{
		sub = da.RECORDS[i].times;
		if(sub.charAt(5) != "-")
		{
			dataTime[k] = sub.substring(0,2);
			k++;
		}
	}	
	for(var i = 0;i<dataTime.length;i++)
	{
		switch(dataTime[i])
		{
			case '01': dataTimesum[0]++; break;
			case '02': dataTimesum[1]++; break;
			case '03': dataTimesum[2]++; break;
			case '04': dataTimesum[3]++; break;
			case '05': dataTimesum[4]++; break;
			case '06': dataTimesum[5]++; break;
			case '07': dataTimesum[6]++; break;
			case '08': dataTimesum[7]++; break;
			case '09': dataTimesum[8]++; break;
			case '10': dataTimesum[9]++; break;
			case '11': dataTimesum[10]++; break;
		}
	}
	// 夏天出来团购的人多,月份对比
	var padding = {top:20,right:57,bottom:20,left:43};
	var height = 300;
	var width = 390;
	// 创建一个分组用来组合要画的图表元素
	var svg = d3.select("#time")
				.append("svg")
				.attr("width",width)
				.attr("height",height);
	var xScale = d3.scale.linear()
				   .domain([1,11])
				   .range([0,width-padding.left-padding.right]);
	var yScale = d3.scale.linear()
				   .domain([0,d3.max(dataTimesum)])
				   .range([height-padding.top-padding.bottom,0]);
	var line = d3.svg.line().interpolate("basic")
	.x(function(d,i){return xScale(i+1);})
	.y(function(d){return yScale(d);});
	var path=svg.append("path")
	.attr("transform","translate("+padding.left+","+padding.top+")")
	.attr("d", line(dataTimesum))
	.style("fill","#fcaf17")
	.style("fill","none")
	.style("stroke-width",1)
	.style("stroke","#fcaf17")
	.style("stroke-opacity",0.9);
	var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom");
	
	var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left");
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
		.call(xAxis);
		
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate("+padding.left+","+padding.top+")")
		.call(yAxis);
	//添加系列的小圆点
	var circle = svg.selectAll("circle")
	.data(dataTimesum)
	.enter()
	.append("circle")
	.attr("transform","translate("+padding.left+","+padding.top+")")
	.attr("cx", function(d,i) {
	return xScale(i+1);
	})
	.attr("cy", function(d) {
	return yScale(d);
	})
	.attr("r",5)
	.attr("fill","#fcaf17"); 
	
	var tooltip=d3.select("#time")
			.append("div")
			.attr("class","tooltipt")
			.style("opacity",0.0);
	
	circle.on("click",function(d,i){
		console.log(1);
				d3.select(this)
				  .attr("fill","#1d953f");
				  tooltip.html(i+1+"月份有"+"<br />"+d+"条评论")
				  	.style("left",(d3.event.pageX)+"px")
				  	.style("top",(d3.event.pageY+20)+"px")
				  	.style("opacity",1.0);
		   })
	.on("mouseover",function(d,i){
	   		 d3.select(this)
	   		.attr("fill","#F00");
			tooltip.html(i+1+"月份有"+"<br />"+d+"条评论")
				.style("left",(d3.event.pageX)+"px")
				.style("top",(d3.event.pageY+20)+"px")
				.style("opacity",1.0);
	   })
	   .on("mouseout",function(d){
	   	   d3.select(this)
	   	  .transition()
	   	     .duration(250)
	   	     	.attr("fill","#fcaf17");
				tooltip.style("opacity",0.0);
	   	   	});
	
	
	
	svg.append("text")
	   .attr("x",1)
	   .attr("y",12)
	   .text("评论数量/条")
	   .attr("font-size",14)
	   .attr("fill","white");
	svg.append("text")
	   .attr("x",344)
	   .attr("y",295)
	   .text("月份/月")
	   .attr("font-size",14)
	   .attr("fill","white");
})