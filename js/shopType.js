shop = new Object();
			var a = [];
			shop.name = new Array();
			shop.reviewNum = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			var s;
			var k = 0,t=0;
			d3.json("data/item.json",function(error,da){
				for(var i = 0;i<da.RECORDS.length;i++)
				{
					s = da.RECORDS[i].item_info;
					k = 0;
					a[i] = "";
					while(s.charAt(k) != " "){
						a[i] += s.charAt(k);
						k++;
					}
				}
				for(var i = 0;i<a.length-1;i++)
				{
					for(var j = i+1;j<a.length;j++)
					{
						if(a[i] == a[j]){
							a[j] = "";
						}
					}
				}
				for(var i = 0;i<a.length;i++)
				{
					if(a[i] != ""){
						shop.name[t] = a[i];
						t++;
					}
				}
				
				for(var i = 0;i<da.RECORDS.length;i++)
				{
					k=0;
					s="";
					while(da.RECORDS[i].item_info.charAt(k) != " "){
						s += da.RECORDS[i].item_info.charAt(k);
						k++;
					}
					for(var j = 0;j<shop.name.length;j++)
					{
						if(s == shop.name[j]){
							var d = parseInt(da.RECORDS[i].review_count);
							shop.reviewNum[j] += d;
						}
					}
				}
				var str = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W");
				// 绘图
				var width = 500;
				var height = 330;
				var padding = {top:20,right:0,bottom:60,left:63};
				var svg = d3.select("#shopType").append("svg")
										.attr("width",width)
										.attr("height",height);
				
				var xAxisScale = d3.scale.ordinal()
								.domain(d3.range(1,shop.name.length+1))
								.rangeRoundBands([0,340]);
									
				var yAxisScale = d3.scale.linear()
								.domain([0,d3.max(shop.reviewNum)])
								.range([250,0]);
									
				var xAxis = d3.svg.axis()
								.scale(xAxisScale)
								.orient("bottom")
								.tickFormat(function(d,i) { return str[i]; });
				
				var yAxis = d3.svg.axis()
								.scale(yAxisScale)
								.orient("left");
				 
				var xScale = d3.scale.ordinal()
								.domain(d3.range(shop.name.length))
								.rangeRoundBands([0,340],0.05);
									
				var yScale = d3.scale.linear()
								.domain([0,d3.max(shop.reviewNum)])
								.range([0,250]);
				
				var rect = svg.selectAll("rect")
				   .data(shop.reviewNum)
				   .enter()
				   .append("rect")
				   .attr("x", function(d,i){
						return padding.left + xScale(i);
				   } )
				   .attr("y",function(d,i){
						return height-padding.bottom- yScale(d) ;
				   })
				   .attr("width", function(d,i){
						return xScale.rangeBand();
				   })
				   .attr("height",yScale)
				   .attr("fill","#ffce7b");
				
				var text = svg.selectAll("text")
					.data(shop.name)
					.enter().append("text")
					.attr("x", function(d,i){
					   if(i<7)
						return 347;
					   else
					     return 427;
				   })
				   .attr("y",function(d,i){
					   if(i<7)
						return 20+i*14;
						else
						return 35+(i-8)*14
				   })
				   .attr("dx", "0em")
				   	.attr("dy","0em")
					.attr("font-size", 12)
					.attr("fill","white")
					.text(function(d,i){
						return str[i]+" : "+d;
					});	
				
				var tooltip=d3.select("#shopType")
						.append("div")
						.attr("class","tooltip")
						.style("opacity",0.0);	
				
				rect.on("click",function(d,i){
							d3.select(this)
							  .attr("fill","#1d953f");
							  tooltip.html(shop.name[i]+"有"+d+"条评论")
							  	.style("left",(d3.event.pageX)+"px")
							  	.style("top",(d3.event.pageY+20)+"px")
							  	.style("opacity",1.0);
					   })
				.on("mouseover",function(d,i){
				   		 d3.select(this)
				   		.attr("fill","#F00");
						tooltip.html(shop.name[i]+"有"+d+"条评论")
							.style("left",(d3.event.pageX)+"px")
							.style("top",(d3.event.pageY+20)+"px")
							.style("opacity",1.0);
				   })
				    .on("mousemove",function(d){
				   	/* 鼠标移动时，更改样式 left 和 top 来改变提示框的位置 */
				   	tooltip.style("left",(d3.event.pageX)+"px")
				   			.style("top",(d3.event.pageY+20)+"px");
				   })
				   .on("mouseout",function(d){
				   	  d3.select(this)
				   	  .transition()
				   	     .duration(500)
				   	     	.attr("fill","#ffce7b");
							tooltip.style("opacity",0.0);
				   	   	});
				
				 svg.append("text")
				    .attr("x",15)
				    .attr("y",13)
				    .text("评论数量/条")
				    .attr("font-size",13)
				    .attr("fill","#FFCCCC");	  
				svg.append("g")
					.attr("class","axis")
					.attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
					.call(xAxis);
					
				svg.append("g")
					.attr("class","axis")
					.attr("transform","translate("+padding.left+","+padding.top+")")
					.call(yAxis);
				
					
				});