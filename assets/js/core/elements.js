///////////////////////////////////////////////////////////////////////
//
function getBasicTable(headers) {
	////////////
	var tbl = createElement({element: 'table'});
	var thd = createElement({element: 'thead'});
	var tr  = createElement({element: 'tr'});
	var tbody = createElement({ element: 'tbody' });
	for (var k in headers) {
		var th = headers[k];
		var thr = createElement({element: 'th', text: th});
		$(tr).append(thr);
	}
	//////////////////////////////////
	$(thd).append(tr);
	$(tbl).append(thd);
	$(tbl).append(tbody);
	return tbl;
}

function addTableRow(table, cols, asheader) {
	$tbody = $(table).find('tbody');
	var tr = createElement({ element: 'tr' });
	$tbody.append(tr);
	tdtype = asheader == undefined ? 'td' : 'th';
	for (var i=0; i < cols.length; i++) {
		var col = cols[i];
		var td = createElement({ element: tdtype, text: col });
		if (!isNaN(col)) {
			$(td).addClass('number');
		}
		$(tr).append(td);
	}
	return table;
}


function addTableFooter(table, cols) {
	$table = $(table);
	tbody = createElement({ element: 'tfoot' });
	$table.append(tbody);
	$tbody = $(tbody);
	var tr = createElement({ element: 'tr' });
	$tbody.append(tr);
	for (var i=0; i < cols.length; i++) {
		var col = cols[i];
		var td = createElement({ element: 'th', text: col });
		$(tr).append(td);
	}
	return table;
}

function createElement (opt) {
	el = document.createElement(opt.element);
	for (attr in opt.attr) {
		$(el).attr(attr, opt.attr[attr]);
	}

	for (prop in opt.prop) {
		$(el).prop(prop, opt.prop[prop]);
	}

	if (opt.text != undefined) {
		if (typeof(opt.text) == "object") {
			$(el).append(opt.text);
		} else {
			$(el).text(opt.text);
		}
	}

	if (opt.class != undefined) {
		$(el).addClass(opt.class);
	}

	if (opt.id != undefined) {
		el.id = opt.id;
	}
	return el;
}
// creates image btn
function getImageBtn (prop) {
	if (!('url' in prop) ) {
		return 'no url provided';
	}

	if (!('id' in prop)) {
		prop.id = idg.getNextId();
	}

	if (!('title' in prop)) {
		prop.title = 'title' + prop.id;
	}

	if (!('class' in prop)) {
		prop.class = "image_button_" + prop.id;
	}

	a = document.createElement('a');
	a.href = prop.url;
	a.id = prop.id;
	$(a).addClass(prop.class);
	a.title = prop.title;


	if ('extra' in prop) {
		for (k in prop.extra) {
			$(a).attr(k, prop.extra[k]);
		}
	}

	$(a).append(getImage(prop.img));
	return a;
}

function getImage (img, alt) {
	imge = document.createElement('img');
	imge.src = 'assets/imgs/' + img;
	if (alt != undefined) {
		imge.alt = alt;
	}
	return imge;
}

