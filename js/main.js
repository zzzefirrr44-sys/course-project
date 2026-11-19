;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white" aria-label="Відкрити або закрити меню"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	
	var planningFieldError = function(field) {
		var value = field.value.trim();
		if (!value) {
			return 'Будь ласка, заповніть це поле.';
		}
		if (field.id === 'planning-name' && value.length < 2) {
			return 'Ім’я має містити щонайменше 2 символи.';
		}
		if (field.id === 'planning-wishes' && value.length < 10) {
			return 'Опишіть побажання щонайменше 10 символами.';
		}
		if (value.length > field.maxLength) {
			return 'Скоротіть текст до ' + field.maxLength + ' символів.';
		}
		if (field.type === 'email' && field.validity.typeMismatch) {
			return 'Вкажіть коректну адресу електронної пошти.';
		}
		return '';
	};

	var planningModal = function() {
		var form = document.getElementById('planning-form');
		if (!form) {
			return;
		}
		var modal = $('#planning-modal');
		var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea'));
		var attempted = false;

		var validate = function(field) {
			var message = planningFieldError(field);
			document.getElementById(field.id + '-error').textContent = message;
			field.setAttribute('aria-invalid', message ? 'true' : 'false');
			$(field).closest('.form-group').toggleClass('has-error', Boolean(message));
			return !message;
		};

		form.addEventListener('submit', function(event) {
			event.preventDefault();
			attempted = true;
			var firstInvalid = null;
			fields.forEach(function(field) {
				if (!validate(field) && !firstInvalid) {
					firstInvalid = field;
				}
			});
			if (firstInvalid) {
				firstInvalid.focus();
				return;
			}
			modal.modal('hide');
		});

		fields.forEach(function(field) {
			field.addEventListener('input', function() {
				if (attempted) {
					validate(field);
				}
			});
		});

		modal.on('shown.bs.modal', function() {
			fields[0].focus();
		});
		modal.on('hidden.bs.modal', function() {
			form.reset();
			attempted = false;
			fields.forEach(function(field) {
				document.getElementById(field.id + '-error').textContent = '';
				field.setAttribute('aria-invalid', 'false');
				$(field).closest('.form-group').removeClass('has-error');
			});
		});
	};

	var galleryItems = [
	    {
	        "id": "inspiration-1",
	        "image": "images/gallery-1.jpg",
	        "href": "images/gallery-1.jpg",
	        "title": "Перші миті разом",
	        "caption": "Початок історії",
	        "linkClass": ""
	    },
	    {
	        "id": "inspiration-2",
	        "image": "images/gallery-2.jpg",
	        "href": "images/gallery-2.jpg",
	        "title": "Вечеря для близьких",
	        "caption": "Затишна атмосфера",
	        "linkClass": "color-2"
	    },
	    {
	        "id": "inspiration-3",
	        "image": "images/gallery-3.jpg",
	        "href": "images/gallery-3.jpg",
	        "title": "Деталі зі змістом",
	        "caption": "Особливі спогади",
	        "linkClass": "color-3"
	    },
	    {
	        "id": "inspiration-4",
	        "image": "images/gallery-4.jpg",
	        "href": "images/gallery-4.jpg",
	        "title": "Прогулянка містом",
	        "caption": "Нові відкриття",
	        "linkClass": "color-4"
	    },
	    {
	        "id": "inspiration-5",
	        "image": "images/gallery-5.jpg",
	        "href": "images/gallery-5.jpg",
	        "title": "Один ритм на двох",
	        "caption": "Час для вас",
	        "linkClass": "color-3"
	    },
	    {
	        "id": "inspiration-6",
	        "image": "images/gallery-6.jpg",
	        "href": "images/gallery-6.jpg",
	        "title": "Церемонія просто неба",
	        "caption": "Ніжність у деталях",
	        "linkClass": "color-4"
	    },
	    {
	        "id": "inspiration-7",
	        "image": "images/gallery-7.jpg",
	        "href": "images/gallery-7.jpg",
	        "title": "Радість у колі близьких",
	        "caption": "Свято поруч",
	        "linkClass": "color-4"
	    },
	    {
	        "id": "inspiration-8",
	        "image": "images/gallery-8.jpg",
	        "href": "images/gallery-8.jpg",
	        "title": "Романтика біля води",
	        "caption": "Мить спокою",
	        "linkClass": "color-5"
	    },
	    {
	        "id": "inspiration-9",
	        "image": "images/gallery-9.jpg",
	        "href": "images/gallery-9.jpg",
	        "title": "Подорож до моря",
	        "caption": "Горизонт для двох",
	        "linkClass": "color-6"
	    }
	];

	var renderGallery = function() {
		var list = document.getElementById('fh5co-gallery-list');
		if (!list) {
			return;
		}

		var fragment = document.createDocumentFragment();
		galleryItems.forEach(function(item) {
			var card = document.createElement('li');
			card.id = item.id;
			card.className = 'one-third animate-box';
			card.setAttribute('data-animate-effect', 'fadeIn');
			card.style.backgroundImage = 'url("' + item.image + '")';

			var link = document.createElement('a');
			link.setAttribute('href', item.href);
			if (item.linkClass) {
				link.className = item.linkClass;
			}

			var summary = document.createElement('div');
			summary.className = 'case-studies-summary';
			var caption = document.createElement('span');
			caption.textContent = item.caption;
			var title = document.createElement('h2');
			title.textContent = item.title;

			summary.appendChild(caption);
			summary.appendChild(title);
			link.appendChild(summary);
			card.appendChild(link);
			fragment.appendChild(card);
		});

		list.textContent = '';
		list.appendChild(fragment);
	};

	$(function(){
		renderGallery();
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
		planningModal();
	});


}());
