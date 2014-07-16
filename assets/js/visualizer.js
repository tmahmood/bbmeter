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

Visualizer.prototype.loadData = function(datafile, graph) {
	if (datafile == undefined) {
		datafile = this.datafile;
	}

	var me = this;
	me.questions_cleaned = [];

	d3.json(datafile, function(jdata){
			me.data_points = jdata;
			me.groups = [];

			for (var ky in jdata) {

				if (jdata[ky]['group'] != undefined) {
					if (me.groups.indexOf(jdata[ky].group) < 0) {
						me.groups.push(jdata[ky]['group']);
					}
				} else {
					jdata[ky]['group'] = 'No Group';
					if (me.groups.indexOf("No Group") < 0) {
						me.groups.push('No Group');
					}
				}

				me.questions_cleaned.push([jdata[ky].key, jdata[ky].type, jdata[ky].group]);

			}

			graphcore.makeSideMenu(me, graph);
			me.loading = false;

			if (graph != '') {
				$('#' + graph).trigger('click');
			}
		});

	return this;
};

Visualizer.prototype.onPageLoad = function() {
	this.width = $('main').width();
	this.height = $(document).height();
	this.svg = graphcore.initSVG(this.container);
	return this;
};
