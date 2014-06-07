var $root = $('html, body');
var idg = null;

function Core() {
	// this is the core application class
}

var core = new Core();

$(function(){

	idg = new IDGenerator('ele');
	//initDataTables();
	initDatePickers();
	initUIElements();

	notification_Event();
	goToTop_Event();
	selectRow_event();
	Window_Event();
	Init_ReplaceWithBtn();
	init_UpdateInline();
	onBackPage();
	delayed_init();
});

function onBackPage() {
	$(document).on('click', '#backpage', function(ev){
		ev.preventDefault();
		window.history.back();
	});
}

function delayed_init() {
	if (calllater.length === 0) {
		return;
	}
	for (var i = calllater.length - 1; i >= 0; i--) {
		call = calllater[i];
		if (typeof call == 'function') {
			call();

		} else {
			var myFunc = window[call];
			myFunc();
		}
	}
}

function init_UpdateInline() {
	$(document).on('click', '.updateinline', function(ev){
		ev.preventDefault();
		updateInlineContent(this);
	});
	checkAllUpdateInlineLinks();
}

function checkAllUpdateInlineLinks() {
	$('.updateinline').each(function(idx, elm){
		if ($(elm).attr('autoinit') != undefined) {
			updateInlineContent(elm);
		}
	});
}


function updateInlineContent(elm) {
	var $elm = $(elm);

	if ($elm.attr('loadat') != undefined) {
		var $target = $('#' + $elm.attr('loadat'));
	} else {
		var $target = $elm;
	}

	$target.empty().append('...');

	$.get(elm.href, function(res){

		$target.empty().append(res);
		if ($elm.attr('ondone')) {
			var call = $elm.attr('ondone')
			var myFunc = window[call];
			myFunc(elm);
		}
	});
}

function Init_ReplaceWithBtn() {

	$('.replacewithbtn').each(function(idx, elm){
		$elm = $(elm);
		id = idg.getNextId();

		href = $elm.attr('href');
		txt = $elm.attr('text');
		targetid = '#' + elm.id;

		a = createElement({
			element: 'a',
			id: id,
			class: 'btn',
			text: txt,
			attr: { href: href }
		});

		$(targetid).after(a);

		$elm.hide();

		// trigger the origin's click
		$(document).on('click', '#' + id, function(ev){
			ev.preventDefault();
			$(targetid).trigger('click');
		});
	});

}

function replaceWithBtn(target) {
	$target = $(target);
	url = $target.prop('href');
	title = $target.text();
	askqs = target.title;
	role = $target.attr('role');
	nobuttons = $target.attr('nobuttons');
}


function selectRow_event () {
	$(document).on('click', '.multisel td:first-child', function(){
		$(this).parent().toggleClass( "rowselected" );
	});
}

function initDatePickers () {
	$('.datepicker').datepicker({
		dateFormat: "yy-mm-dd",
		changeMonth: true,
		changeYear: true });
}

function goToTop_Event () {
	$(document).on('click', '.gototopbtn a', function(ev){
		ev.preventDefault();
		$root.animate({
			scrollTop: $('#' + this.href.split('#').pop()).offset().top
		}, 500);
	});
}

function notification_Event () {
	$(document).on('click', '#notifications li', function(){
		$(this).hide();
	});
}

function formatNiceDate (datestring) {
	date = datestring.split(' ').shift();

	var d = new Date(Date.parse(date));
	var month=new Array();

	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	var n = month[d.getMonth()];

	return n + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function notification (message, type, keepit) {
	if (message === '') {
		return;
	}

	if (message == 'You are not logged in') {
		window.location = location;
	}

	if (keepit == undefined && ['error', 'warn'].indexOf(type) >= 0) {
		keepit = true;
	}

	div = createElement( { element:'div', attr: { class: type, keepit: keepit } } );
	checkurl = message.split('|');
	$(div).append(checkurl[0]);

	if (checkurl.length  > 1) {
		a = createElement({ element: 'a', attr: { href: checkurl[1] }, text: 'click here' });
		$(div).append(a);
	}

	$('#notifications').show();
	$('#notifications').append(div);

	if (keepit === true) {
		$(document).on('click', '#notifications', function (ev) {
			$('#notifications').hide().empty();
		});
	} else {
		setTimeout(function() {
			$('#notifications div').each(function(idx, elm) {
				$elm = $(elm);
				if ($elm.attr('keepit') == undefined) {
					$elm.empty().hide();
				}
			});
		}, 5000);
	}
}

function initUIElements () {
	$('select').select2();
	$('#tabs').tabs();
	updateSelectElement();
}

function updateSelectElement() {
	$('select').each(function(idx, elm) {
		$elm = $(elm);
		$existing = $('#' + elm.id + '_old');
		if ($existing.length > 0) {
			$elm.select2('val', $existing.val());
		}
	});
}


function showAjaxLoader($elm) {

	div = createElement({
							element: 'div',
							attr: { style: 'text-align: center;' }
						});
	img = getImage('ajax-loader.gif');
	$(div).append(img);
	return $elm.empty().append(div);
}

function toInt(v)
{
	return 1 * v;
}


Core.prototype.list_values = function(dict) {
	return $.map(dict, function(key, value) {
		return value;
	});
};



Core.prototype.list_keys = function(dict) {
	return $.map(dict, function(key, value) {
		return key;
	});
}
