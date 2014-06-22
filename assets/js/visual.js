function Visual(opts) {
	this.opts = opts == null ?  opts : {};
	this.visualizer = new Visualizer(null, '#displayopts', ',').onPageLoad();
}

var visual = new Visual();

$(function(){
	visual.onMenuItemClick();
	if (document.location.hash != '') {
		visual.loadGraphByHash(document.location.hash.split('#').pop());
	}
});

Visual.prototype.onMenuItemClick = function() {
	var me = this;


	$(document).on('click', '._nv_graphs', function(ev){
		ev.preventDefault();
		if (me.visualizer.loading) {
			return;
		}
		me.visualizer.loading = true;
		var hash = this.href.split('#').pop();
		document.location.hash = hash;
		me.loadGraphByHash(hash);
		$('._nv_graphs').removeClass('active');
		$(this).addClass('active');
	});

	$(document).on('click', '._txt_', function(ev){
		ev.preventDefault();
		if (me.loadingtexts) {
			return;
		}
		me.loadingtexts = true;
		$('._nv_graphs').removeClass('active');
		$('#graphcontent').hide();
		$('#frontend').removeClass('distback');
		console.log("txt");
	});
}

Visual.prototype.loadContentByHash = function(hash) {
	if (hash == '') {
		$('#graphcontent').hide();
		$('#frontend').removeClass('distback');
	} else {
		console.log('test');
	}
};

Visual.prototype.loadGraphByHash = function(hash) {
	$('#frontend').addClass('distback');
	$('#graphcontent').slideDown();
	var s = hash.split(this.visualizer.sepchar);
	var filename = 'data/' + s[0] + '.json';
	this.visualizer.loadData(filename);
};

