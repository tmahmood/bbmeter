function Visualizer(datafile, container, sepchar) {
	this.container = container;
	var me = this;
	this.data_points = {};
	this.data = [];
	this.headers = [];
	this.datafile = datafile;
	this.sepchar = sepchar;
	this.loading = false;
}

Visualizer.prototype.loadData = function(datafile) {
	if (datafile == undefined) {
		datafile = this.datafile;
	}

	var me = this;
	me.questions_cleaned = [];
	d3.json(datafile, function(jdata){
			me.data_points = jdata;
			for (var ky in jdata) {
				me.questions_cleaned.push([jdata[ky].key, jdata[ky].type]);
			}
			graphcore.makeSideMenu(me);
			me.loading = false;
		});
	return this;
};

Visualizer.prototype.onPageLoad = function() {
	this.width = $('main').width();
	this.height = $(document).height();
	this.svg = graphcore.initSVG(this.container);
	return this;
};
