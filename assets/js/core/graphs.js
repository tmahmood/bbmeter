function GraphCore(opts) {
	this.opts = opts == null ?  opts : {};
	this.colordict = {};
}

var graphcore = new GraphCore();

GraphCore.prototype.initSVG = function(container) {
	return d3.select(container)
				.append("svg")
				.attr('class', 'container');
};

GraphCore.prototype.initg = function(uid, perent) {
	if (perent != undefined) {
		return perent.append('g').attr('id', uid);
	}
	return this.svg.append("g").attr('id', uid);
};

GraphCore.prototype.generateColor = function(d) {
	if (d in this.colordict) {
		return this.colordict[d];
	}

	var r = Math.random(1,50) * 250;
	var g = Math.random(1,50) * 250;
	var b = Math.random(1,50) * 250;

	this.colordict[d] = d3.rgb(r, g, b);

	var values = core.list_values(this.colordict);

	if (this.colordict in values) {
		return generateColor(d);
	}

	return this.colordict[d];
}


GraphCore.prototype.drawChart = function(charttype, data, me) {
	  if (data == undefined) {
		  throw "No data provided";
	  }
	  this[charttype](data, me);
};


GraphCore.prototype.Pie = function(_data, me) {
	//Regular pie chart example
	var data = _data[0].values;
	nv.addGraph(function() {
	  var chart = nv.models.pieChart()
		  .x(function(d) { return d.label })
		  .y(function(d) { return d.value })
		  .showLabels(true);

		d3.select(me.container + ' svg').text("")
			.datum(data)
			.transition()
			.duration(350)
			.call(chart);

		  return chart;
	});
}


GraphCore.prototype.DiscretBar = function(data, me) {

	  nv.addGraph(function() {
			 var chart = nv.models.discreteBarChart()
					.x(function(d) { return d.label; })
					.y(function(d) { return d.value; })
					.staggerLabels(true)
					.tooltips(true)
					.showValues(true)

			chart.yAxis.tickFormat(d3.format(',.1f'));

			d3.select(me.container + ' svg').text("")
					.datum(data)
					.transition()
					.duration(0)
					.call(chart);
			nv.utils.windowResize(chart.update);
			return chart;
		});
}


GraphCore.prototype.GroupedMultiBar= function(_data, me) {
	var data = _data[0].values;
	nv.addGraph(function() {
		var chart = nv.models.multiBarChart()
		  .transitionDuration(1500)
		  .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
		  .rotateLabels(0)      //Angle to rotate x-axis labels.
		  .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
		  .groupSpacing(0.1)    //Distance between each group of bars.
		  .x(function(d){ return d.label; })
		  .y(function(d){ return d.value / 100; })
		;

		chart.yAxis.tickFormat(d3.format('%'));
		d3.select(me.container + ' svg').text("")
			.datum(data)
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});
};

GraphCore.prototype.makeSideMenu = function(me) {

	d3.select('#questionlist').selectAll('li').data(me.questions_cleaned)
		.enter()
			.append('li')
				.append('a')
					.attr('href', function(d, i) { return "#" + i + "_" + d[1]; })
					.attr('class', 'selgraphtodisplay')
					.text(function(d){ return d[0]; });

	d3.select(me.container)
		.insert('h1', 'svg')
		.text("Select Question from the side menu");

	$(document).on('click', '.selgraphtodisplay', function(ev){
		ev.preventDefault();
		$('#questionlist li').removeClass('active');
		$(this).parent().addClass('active');
		var dictkey = this.href.split('#').pop().split('_');
		graphcore.drawChart(dictkey[1], [me.data_points[dictkey[0]]] , me);
		d3.select(me.container + ' h1').text($(this).text());
	});

	return this;
};

