function Visualizer(datafile, container) {
	this.container = container;
	var me = this;
	this.data_points = {};
	this.data = [];
	this.headers = [];
	this.datafile = datafile;
}

Visualizer.prototype.loadData = function() {
	var me = this;
	me.questions_cleaned = [];
	d3.json(this.datafile, function(jdata){
			me.data_points = jdata;
			for (var ky in jdata) {
				me.questions_cleaned.push([jdata[ky].key, jdata[ky].type]);
			}
			graphcore.makeSideMenu(me);
		});
	return this;
};

Visualizer.prototype.onPageLoad = function() {
	this.width = $('main').width();
	this.height = $(document).height();
	this.svg = graphcore.initSVG(this.container);
	return this;
};
