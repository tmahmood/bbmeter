function Demography(opts) {
	this.opts = opts == null ?  opts : {};
	this.datafile = 'data/catss_survey_demog.json';
	this.visualizer = new Visualizer(this.datafile, '#displayopts');
}

var demography = new Demography();

$(function(){
	demography.visualizer
		.onPageLoad()
		.loadData();
});

