function DataProc(opts) {
	this.opts = opts == null ?  opts : {};
	this.visualizer = new Visualizer('data/catss_survey_1.json', '#displayopts');
}

var dproc = new DataProc();

$(function(){
	dproc.visualizer
		.onPageLoad()
		.loadData();
});

