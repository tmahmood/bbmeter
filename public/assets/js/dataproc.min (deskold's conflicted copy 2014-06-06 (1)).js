function DataProc(opts) {
	this.opts = opts == null ?  opts : {};
	this.data = {
		questions: [
			"Is country going right direction",
			"Gender",
			"Who Would you vote for",
			"Where do you live",
			"Your age group",
			],
		data: [
			"No,Male,BNP,URBAN,18-25",
			"Yes,Male,AL,URBAN,18-25",
			"No,Female,New perty,URBAN,25-45",
			"No,Male,New perty,RURAL,25-45",
			"Yes,Male,AL,RURAL,25-45",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Female,Undecided,URBAN,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
			"No,Male,BNP,RURAL,18-25",
			"No,Female,New perty,RURAL,45-60",
			"No,Female,Undecided,URBAN,45-60",
			"Don't know,Male,Undecided,RURAL,18-25",
		]
	};

	this.width = 600;
	this.height = 300;
	this.dist = 4;
	this.displayopts = '#displayopts';

}

DataProc.prototype.initSVG = function() {
	this.svg = d3.select(this.displayopts).append("svg")
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

DataProc.prototype.calculateArea = function(len) {
	return (this.width / len) - (this.dist * 2);
};

DataProc.prototype.drawQuestionBoxes = function(){

	var lastx = 0;
	var lastx_g = 0;
	var me = this;


	this.questionboxes = {};
	var g = this.initg('rect_questions');

	function setPositionX(lx) {
		var posx = lx;
		lx = lx + me.area + me.dist;
		return [posx + me.dist, lx];
	};


	g.selectAll('rect').data(this.data.questions)
		.enter()
			.append('rect')
			.attr('x', function(d){
				var rx = setPositionX(lastx);
				lastx = rx[1];
				return rx[0];
			})
			.attr('y', 0)
			.attr('width', me.area)
			.attr('height', me.height - me.dist * 4)
			.attr('class', "boxes");

	this.initg('g_all_responses')
		.selectAll('g')
		.data(this.data.questions)
		.enter()
		.append('g')
			.attr('id', function(d, i){
				return 'g_responses_' + i;
			})
			.attr('x', function(d) {
				var rx = setPositionX(lastx_g);
				lastx_g = rx[1];
				return rx[0];
			})
			.attr('y', 0)
			.attr('width', me.area)
			.attr('height', me.height - me.dist * 4)

	return this;
};

DataProc.prototype.onPageLoad = function() {
	return this;
};

DataProc.prototype.procData = function() {

	this.area = this.calculateArea(this.data.questions.length);
	this.blockwidth = this.area / this.data.questions.length;
	this.blockheight = this.area / this.data.questions.length;

	this.perline = Math.round((this.area + this.dist) / this.blockwidth);
	this.totline = this.data.data.length / this.perline;

	this.gdata = [];
	for (var i = 0, len = this.data.data.length; i < len; i++) {
		var responses = this.data.data[i].split(',');
		for (var k = 0, rlen = responses.length; k < rlen; k++) {
			try {
				this.gdata[k].push(responses[k]);
			} catch (e) {
				this.gdata[k] = [];
				this.gdata[k].push(responses[k]);
			}
		}
	}
	return this;
};


DataProc.prototype.drawGraphs = function() {
	var me = this;
	var posy = 0;
	var basecolor = d3.rgb('#333333');

	for (var k in this.gdata) {

		var posx = 0;
		var posy = 0;

		var responses = this.gdata[k];
 		var color = basecolor.brighter(k)

		this.colordict = {};

		function generateColor(d) {
			if (d in me.colordict) {
				return me.colordict[d];
			}
			var r = Math.random(30,50) * 250;
			var g = Math.random(100,150) * 250;
			var b = Math.random(200,255) * 250;

			me.colordict[d] = d3.rgb(r, g, b);
			return me.colordict[d];
		}

		d3.select('g#g_responses_' + k)
			.selectAll('rect')
			.data(responses)
			.enter()
				.append('rect')
				.attr('width', me.blockwidth - me.dist)
				.attr('height', me.blockheight - me.dist)
				.attr('title', function(d) {
						return d;
					})
				.attr('x', function(d, col){
						// position by current response
						var tx = (me.area * k) +  (k * me.dist);
						var myc = Math.round(col % me.perline);
						var v = tx + (myc * me.blockwidth) + me.dist;
						d3.select(this).attr('fill', function(d) {
								return generateColor(d);
							});
						return v;
					})
				.attr('y', function(d, col){
						var myc = Math.floor(col / me.perline);
						var actY = me.blockheight * myc;
						return (actY) + me.dist;
					});
	}

	return this;
};


var dproc = new DataProc();

$(function(){
	dproc
		.onPageLoad()
		.procData()
		.initSVG()
		.drawQuestionBoxes()
		.drawGraphs();
});

