d3.json("data/clouds.json",function(error,da){
	 var fill = d3.scale.category20();
	   d3.layout.cloud().size([190,205]) //size([x,y])  词云显示的大小
	   //map 返回新的object数组
	       .words(["团购", "味道", "好吃", "环境", "不错", "喜欢", "服务","菜品","新鲜","价格","口味","划算","服务态度","服务员","感觉","特别","很多","下次","推荐","满意"].map(function(d) {
	           return {"text": d, "size": 14 + Math.random() * 10};
	       }))
	       //~~的作用是单纯的去掉小数部分，不论正负都不会改变整数部分
	       //这里的作用是产生0 1
	       .rotate(function() { return ~~(Math.random() * 2) * 90; })
	       .font("Impact")
	       .fontSize(function(d) { return d.size; })
	       .on("end", draw)//结束时运行draw函数
	       .start();
	   //append()使用函数在指定元素的结尾添加内容
	   //transform:translate(x,y)  定义2d旋转，即平移，向右平移x,向下平移y
	   function draw(words) {
	       d3.select("#clouds").append("svg")
	           .attr("width", 200)
	           .attr("height", 215)
	           .append("g")
	           .attr("transform", "translate(100,105)")
	           .selectAll("text")
	           .data(words)
	           .enter().append("text")
	           .style("border","1px solid blue")
	           .style("font-size", function(d) { return d.size + "px"; })
	           .style("font-family", "Impact")
	           .style("fill", function(d, i) { return fill(i); })//fill 在前面15行定义为颜色集
	           .attr("text-anchor", "middle")
	           .attr("transform", function(d) {
	               return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	           })
	           .text(function(d) { return d.text; });
	   }
})