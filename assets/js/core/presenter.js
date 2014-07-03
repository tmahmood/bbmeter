function Presenter(slides, elm) {
	this.slides = slides;
	this.elm = elm;
	this.id = idg.getNextId();
	this.currentslide = 0;

	this.$ef = $(elm);

	return this;
}

Presenter.prototype.getID = function(id) {
	return this.id + '_' + id;
};


Presenter.prototype.prepearePresentation = function() {
	var me = this;
	this.divheight = $(window).height();

	var dv = createElement({ element: 'div', 'id': this.id });
	this.$ef.append(dv);
	this.$e = $(dv);

	for (var i in this.slides) {
		var slide = this.slides[i];
		this.drawCurrentSlide(slide, i);
	}

	var nl = createElement( { element: 'a', id: this.getID('nextSlide'), class: 'slidechange next', attr: { 'href': '#' }, text: 'next' });
	var pl = createElement( { element: 'a', id: this.getID('prevSlide'), class: 'slidechange prev', attr: { 'href': '#' }, text: 'previous' });

	this.$e.append(nl);
	this.$e.append(pl);

	$(document).on('click', '.slidechange', function(ev){
		ev.preventDefault();

		if ($(this).hasClass('next')) {
			me.currentslide++;

			if (!me.hasNextSlide()) {
				$(this).hide();
			}
			$('.prev').show();

		} else {

			me.currentslide--;
			if (!me.hasPrevSlide()) {
				$(this).hide();
			}
			$('.next').show();
		}

		core.moveTo('#' + me.getID('slide_' + me.currentslide));
	});

	core.moveTo(this.elm);
	$('.prev').hide();
	return this;
};

Presenter.prototype.resetSlides = function() {
	core.moveTo(this.elm);
	$('.prev').hide();
	this.currentslide = 0;
};

Presenter.prototype.hasNextSlide = function() {
	return !(this.currentslide + 1 >= this.slides.length);
};

Presenter.prototype.hasPrevSlide = function() {
	return !(this.currentslide - 1 < 0);
};

Presenter.prototype.drawCurrentSlide = function(hdata, i) {

	var h1 = createElement({ element: 'h1', text: hdata['title'] });
	var p = createElement({ element: 'p', text: hdata['content'] });
	var dv = createElement({ element: 'div', id: this.getID('slide_' + i) });

	if (hdata['img'] != undefined) {
		$(dv).css({ background: 'url(assets/imgs/' + hdata['img'] + ')' });
	}

	$(dv).append(h1).append(p);
	$(dv).height(this.height);
	this.$e.append(dv);

};

