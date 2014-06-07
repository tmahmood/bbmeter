function DataProc(opts) {
	this.opts = opts == null ?  opts : {};
	this.container = '#displayopts';
	var me = this;
	this.calc = {};
	this.data = [];
	this.headers = [];
}

DataProc.prototype.initSVG = function() {
	this.svg = d3.select(this.container).append("svg")
		.attr("width", this.width)
		.attr("height", this.height)
		.attr('class', 'container');
	return this;
};

DataProc.prototype.initg = function(uid, perent) {
	if (perent != undefined) {
		return perent.append('g').attr('id', uid);
	}
	return this.svg.append("g").attr('id', uid);
};

DataProc.prototype.onPageLoad = function() {
	this.width = $('main').width();
	this.height = $(document).height();
	return this;
};


DataProc.prototype.generateColor = function(d) {
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


DataProc.prototype.loadData = function() {
	var me = this;

	this.csv = d3.csv('/data/data.csv', function(row) {
			me.data.push(row);
			for (var i in row) {

				var res = row[i];
				var k = i.trim().replace(/\r\n/g, '').replace(/ /g, '');

				if (k == 'Phone') {
					continue;
				}

				if (! (k in me.calc) ) {
					me.calc[k] = {
							key: k.replace(/_/g, ' '),
							values: []
						};
				}

				var found = false;

				for (var ik in me.calc[k].values) {
					var vobj = me.calc[k].values[ik];
					if (vobj.label == res) {
						me.calc[k].values[ik].value++;
						found = true;
						break;
					}
				}
				if (!found) {
					me.calc[k].values.push({
							label: res,
							value: 1
						});
				}
			}
		}, function(error, rows) {
			me.drawGraph();
		});

	return this;
};

DataProc.prototype.drawGraph = function() {
	  var me = this;
	  nv.addGraph(function() {
			 var chart = nv.models.discreteBarChart()
					.x(function(d) {
						return d.label;
					})
					.y(function(d) {
						return d.value;
					})
					.staggerLabels(true)
					.tooltips(true)
					.showValues(true)

			chart.yAxis.tickFormat(d3.format(',.1f'));

			d3.select(me.container + ' svg')
					.datum([me.calc['Your_Gender_?']])
					.transition()
					.duration(0)
					.call(chart);
			nv.utils.windowResize(chart.update);
			return chart;
		});
	return this;
};
var dproc = new DataProc();

$(function(){
	dproc
		.onPageLoad()
		.initSVG()
		.loadData();
});

