function FilterTable(tablename, filterbox, nocolumn) {
	this.tablename = tablename;
	this.filterbox = filterbox;
	this.nocolumn  = nocolumn;
	this.lastreplace = {};
}

FilterTable.prototype.filterTable = function() {
	var me = this;
	$(document).on('keyup', me.filterbox, function(e) {
		searchtxt = $(this).prop('value');
		$(me.tablename + ' tbody tr').hide();
		for (var i=1; i <= me.nocolumn; i++) {
			$(me.tablename + ' tbody td:nth-child(' + i + ')').filter(function(index){
				if(me.matchSearchText(me.searchtxt, $(this))){
					$(this).parent().show();
				}
			});
		}
	});
}

FilterTable.prototype.highlightSearchResults = function() {
	txt = $(this.filterbox).val();
	for (var i=1; i <= this.nocolumn; i++) {
		var me = this;
		$(this.tablename + ' tr td:nth-child(' + i + ')').each(function(idx, elm){
			me.doSearch(elm, txt);
		});
	}
}

FilterTable.prototype.doSearch = function(elm, txt) {
	if (txt == undefined) {
		return;
	}

	var $elm = $(elm);
	var etxt = $elm.text();
	if (etxt.toLowerCase().indexOf(txt.toLowerCase()) !== -1) {

		if ($elm.find('a').length > 0) {
			var $a = $elm.find('a');
			var at = $a.text();
			at = at.replace(txt, '<b>' + txt + '</b>', 'i');
			$a.empty().append(at);
		} else {
			var position = etxt.indexOf(txt);
			var tlen = txt.length;
			var foundtxt = '<b>' + etxt.substr(position, tlen) + '</b>';
			etxt = etxt.replace(txt, foundtxt, 'i');
			$elm.empty().append(etxt);
		}
	}
}


FilterTable.prototype.matchSearchText = function (searchtext, $elm) {
	return $elm.text().toLowerCase().indexOf(searchtxt.toLowerCase()) !== -1;
}

