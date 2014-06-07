function Window_Event () {
	$(document).on('click', '.askconfirm', function(ev){
		ev.preventDefault();
		createConfirmationWindow(this);
	});

	$(document).on('click', '.ajaxwindow', function(ev){
		ev.preventDefault();
		createAjaxPageWindow(this);
	});

	$(document).on('click', '.editwindow', function(ev){
		ev.preventDefault();
		createInputWindow(this);
	});
}

function checkWindowElementExists(elmid) {
	if ($('#' + elmid).length === 0) {
		$('main').append('<div id="' + elmid + '"></div>');
		return true;
	}
	return false;
}

function getWindowSize($target) {
	if ($target.attr('size') !== undefined) {
		size = $target.attr('size');
		if (size == 'max') {
			width = $(window).width() - 40;
			height = $(window).height() - 40;
		} else {
			sizes = $target.attr('size').split('x');
			width = sizes[0] * 1;
			height = sizes[1] * 1;
		}
	} else {
		width = 600;
		height = 300;
	}
	return [width, height];
}

/*
<a href="url/[id]" class="editwindow" size="500x550"
	datafn="callback_to_get_form_elements"
	onsave="callbact_on_form_submission">[TEXT]</a>
*/

function InputWindow(target) {

	checkWindowElementExists('inputwindow');
	this.$inputwindow = $('#inputwindow');

	this.target = target;
	this.$target = $(target);
	this.url = target.href;
	this.title = this.$target.text();
	this.size = getWindowSize(this.$target);
}

InputWindow.prototype.initiate = function() {
	this.$inputwindow.empty();
	this.cfg = {
		model: true,
		title: this.title,
		width: this.size[0],
		height: this.size[1]
	};
	return this;
};

InputWindow.prototype.initFunctions = function() {

	var datafn = this.$target.attr('datafn');
	fn = window[datafn];
	this.inputs = fn(this.target);
	if (this.inputs === false) {
		throw 'No matching elements found';
	}

	fn = this.$target.attr('onsave');
	this.onsave = window[fn];
	return this;
};

InputWindow.prototype.buildForm = function() {
	fset = createElement({ element: 'fieldset' });
	divmain = createElement({ element: 'div', class: 'impform' });
	$(divmain).append(fset);
	this.$inputwindow.append($(divmain));
	for (var i = 0; i < this.inputs.length; i++) {
		$item = $(this.inputs[i]);
		label = $item.attr('label');
		id = idg.getNextId();
		div = createElement({ element: 'div' });
		lbl = createElement({
			element: 'label',
			attr: { 'for': id },
			text: label
		});
		$(div).append(lbl);
		if ($item.attr('role') == 'text') {
			txt = $item.text();
		} else {
			txt = $item.val();
		}
		el = createElement({
			element: 'input',
			id: id,
			attr: {
				type: 'text',
				name: $item.attr('name'),
				value: txt
			}
		});
		$(div).append(el);
		$(fset).append(div);
	}
	return this;
};

InputWindow.prototype.display = function() {
	this.$inputwindow.dialog(this.cfg);
	var oninit = this.$target.attr('oninit');
	if (oninit in window) {
		var oifn = window[oninit];
		oifn(this.$target);
	}
	return this;
};

InputWindow.prototype.addButtons = function() {
	var me = this;
	this.cfg.buttons = {
		Save: function() {
			d = me.$inputwindow.find('fieldset').serialize();
			$.post(me.url, d, function(res){
					if (me.onsave !== undefined) {
						me.onsave(res);
					}
					notification(res.m, res.s == 1 ? "info": "error");
					me.$inputwindow.dialog('close');
			}).fail(function(res){
				notification(res, 'error');
			});
		}
	};
	return this;
};

/*
<a href="url/[id]" class="ajaxwindow" size="500x550"
	onint="callback_on_window_load">[TEXT]</a>
	use callOnAjaxWindowFormSubmit to handle form submits
*/

function createInputWindow(target) {
	inpw = new InputWindow(target);
	inpw.initiate()
		.initFunctions()
		.buildForm()
		.addButtons()
		.display();
}

function createAjaxPageWindow(target) {
	aj = new AjaxWindow(target)
			.initiate()
			.setWindowProperties()
			.setEventProcessing()
			.display();
}

function AjaxWindow(target) {
	checkWindowElementExists('ajaxwindow');
	this.target = target;
	this.$ajaxwindow = $('#ajaxwindow');
	this.$target = $(this.target);
	this.url = this.$target.prop('href');
	this.title = this.$target.text();
	this.askqs = this.target.title;
	this.role = this.$target.attr('role');
	this.nobuttons = this.$target.attr('nobuttons');
	this.oninit = this.$target.attr('oninit');
}

AjaxWindow.prototype.initiate = function(){

	size = getWindowSize(this.$target);
	showAjaxLoader(this.$ajaxwindow);
	this.loadContent();
	return this;
};

AjaxWindow.prototype.loadContent = function() {
	me = this;
	$.get(me.url, function(res){
		me.$ajaxwindow.empty().append(res);
		var fn = window[me.oninit];
		if(typeof fn === 'function') {
			fn(me.$ajaxwindow, me.url, me.target);
		}
	});
};


AjaxWindow.prototype.setWindowProperties = function(){
	this.cfg = {
		modal: true,
		title: this.title,
		width: size[0],
		height: size[1]
	};
	return this;
};

AjaxWindow.prototype.setEventProcessing = function(){
	if (!this.usingDefaultDialogButtons()) {
		if (this.role !== '') {
			var fn = window[this.role];
			if(typeof fn === 'function') {
				fn(this.$ajaxwindow, this.url);
			}
		}
	}
	return this;
};

AjaxWindow.prototype.display = function() {
	this.$ajaxwindow.dialog(this.cfg);
	return this;
};

AjaxWindow.prototype.usingDefaultDialogButtons = function() {
	if(!(this.nobuttons === undefined || this.nobuttons == 'false')) {
		return false;
	}
	me = this;
	$.extend(me.cfg, {
		buttons: {
			OK: function() {
				src = this;
				$(src).dialog("close");
				if (me.role === undefined) {
					window.location = me.$target.prop('href');
				} else {
					$.get(me.$target.prop('href'), function (res) {
						var myFunc = window[me.role];
						myFunc(res);
					});
				}
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		},
	});
	return true;
};

function ConfirmationWindow(target) {
	//
	// <a href="action_url" class="askconfirm" title="confirmation text"
	// size="WxH" onconfirm="callback_function">[Dialog Title]</a>
	//
	checkWindowElementExists('askconfirm');
	this.target = target;
	this.$target = $(target);
	this.$windowcontainer = $('#askconfirm');
	this.title = this.$target.text();
	this.ask_question = target.title;
	this.size = getWindowSize(this.$target);
}

ConfirmationWindow.prototype.initiate = function() {

	if (this.$target.attr('role') !== undefined) {
		console.log("Please change to 'onconfirm' > "  + this.title);
		onconfirm = this.$target.attr('role');
	} else {
		onconfirm = this.$target.attr('onconfirm');
	}

	if (onconfirm !== '') {
		this.onconfirm = onconfirm;
	}

	this.$windowcontainer.empty().append(this.ask_question);
	return this;
};

ConfirmationWindow.prototype.display = function() {

	me = this;
	this.$windowcontainer.dialog({
		title: me.title,
		width: me.size[0],
		height: me.size[1],
		buttons: {
			Yes: function() {
				$(this).dialog("close");

				if (me.onconfirm === undefined) {
					window.location = me.$target.prop('href');
					return;
				}

				$.get(me.$target.prop('href'), function (res) {
					var myFunc = window[me.onconfirm];
					myFunc(res);
				});
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		},
	});
	return this;
};

function createConfirmationWindow(target) {
	cnf = new ConfirmationWindow(target).initiate().display();
}


function callOnAjaxWindowFormSubmit(formid, callafter) {
	$(document).on('submit', formid, function(){
		$rf = $(formid);
		d = $rf.serialize();
		$.post($rf.prop('action'), d, function(res) {
			$('#ajaxwindow').dialog('close');
			message = res.message === undefined ? res.m : res.message;
			if (res.s == 1 || res.success == 1) {
				notification(message, 'success');
			} else {
				notification(message, 'error', true);
			}
			if (callafter !== undefined) {
				callafter(res);
			}
		}, 'json');
		return false;
	});
}
