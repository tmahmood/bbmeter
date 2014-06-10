function Compendium(opts) {
	this.opts = opts == null ?  opts : {};
	this.datafile = 'data/compendium.json';
	this.visualizer = new Visualizer(this.datafile, '#displayopts');
}

var compendium = new Compendium();

$(function(){
	compendium.visualizer
		.onPageLoad()
		.loadData();
});

