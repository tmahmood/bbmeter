function GraphCore(opts) {
	this.opts = opts == null ?  opts : {};
	this.colordict = {};
	this.event_set = false;
	this.loading = false;
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

		if (_data[0].colors != undefined) {
			chart.color(_data[0].colors);
		}

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
					.y(function(d) { return d.value / 100; })
					.staggerLabels(true)
					.tooltips(true)
					.showValues(false);

			if (data[0].colors != undefined) {
				chart.color(data[0].colors)
			}

			chart.yAxis.tickFormat(d3.format('%'));

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

		if (_data[0].colors != undefined) {
			chart.color(_data[0].colors)
		}

		chart.yAxis.tickFormat(d3.format('%'));
		d3.select(me.container + ' svg').text("")
			.datum(data)
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});
};

GraphCore.prototype.SimpleLine= function(_data, me) {
	var data = _data[0].values;
    nv.addGraph(function() {
		var chart = nv.models.lineWithFocusChart()
			.x(function(d) { return d[0] })
			.y(function(d) { return d[1] / 100 })
			.transitionDuration(750)
			.showLegend(true);

		if (_data[0].colors != undefined) {
			chart.color(_data[0].colors)
		}

		chart.xAxis.tickValues(_data['tickvalues']) //note: using epoch time = milliseconds since 1/1/1970
			.tickFormat(function(d) { return d3.time.format('%m/%y')(new Date(d))} )
			.axisLabel('Month / Year');

		chart.x2Axis.tickValues(_data['tickvalues'])
			.tickFormat(function(d) {return d3.time.format('%m/%y')(new Date(d))});

		chart.yAxis
			.tickFormat(d3.format('%x'))
			.axisLabel('Percentage');

		chart.y2Axis
			.tickFormat(d3.format('%x'))
			.axisLabel('Percentage');

		d3.select(me.container + ' svg ').text("")
			.datum(data)
			.transition().duration(500)
			.call(chart);

		nv.utils.windowResize(chart.update);
		return chart;
	});
}


GraphCore.prototype.makeSideMenu = function(me, graph) {

	d3.select('#questionlist').text("")
		.selectAll('li').data(me.questions_cleaned)
		.enter()
			.append('li')
				.append('a')
					.attr('href', function(d, i) { return "#" + i + "_" + d[1]; })
					.attr('id', function(d, i) { return i + "_" + d[1]; })
					.attr('class', 'selgraphtodisplay')
					.text(function(d){ return d[0]; });

	d3.select('svg').text("");

	$(document).on('click', '.selgraphtodisplay', function(ev){

		ev.preventDefault();

		$('#questionlist li').removeClass('active');
		$(this).parent().addClass('active');

		var dictkey = this.href.split('#').pop().split('_');
		var currentdata = me.data_points[dictkey[0]]

		var h = dictkey.join('_');

		var th = document.location.hash.split(',').shift();


		document.location.hash = th + ',' + h;

		graphcore.drawChart(dictkey[1], [currentdata] , me);
		d3.select(me.container + ' h1').text($(this).text());

		if (currentdata['description']!= undefined) {
			d3.select(me.container + ' h1')
				.append('p')
				.attr('id', 'gp_details')
				.text(currentdata.description);
		}

		var date = currentdata['date'];
		if (date != undefined) {
			d3.select(me.container + ' h1')
				.append('p')
				.attr('id', 'gp_date').text(date);
		}
	});

	$('#questionlist li a').first().trigger('click');

	return this;
};

