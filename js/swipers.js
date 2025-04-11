// swiper initialization

// Home page
const swiperHero = new Swiper('.swiper-hero', {
	// Optional parameters
	loop: true,
	pagination: {
		el: ".swiper-hero__pagination",
		type: "fraction",
		renderFraction: function (currentClass, totalClass) {
			return `<span class="${currentClass} swiper-pagination-box__current"></span>` +
				`<span class="${totalClass} swiper-pagination-box__total"></span>`;
		}
	},
	autoplay: {
		delay: 5000,
	},
	allowTouchMove: false,


});
const swiperStory = new Swiper('.swiper-story', {
	loop: true,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
		scale: .778,
		stretch: 13
	},
	spaceBetween: 30,
	keyboard: true,
	centeredSlides: true,
	breakpoints: {
		992: {
			slidesPerView: 1.75,
			spaceBetween: 40,
		},
	},

	on: {
		init: sliderPagination,

		slideChangeTransitionStart: sliderPagination,
	},
	navigation: {
		nextEl: '.story-middle__swiper .swiper-nav-pagination__next',
		prevEl: '.story-middle__swiper .swiper-nav-pagination__previous',
	},
});


function sliderPagination() {
	let currentActiveSlide = this.realIndex + 1,
		totalSlides = this.slides.length,
		progressWidth = (100 / totalSlides) * currentActiveSlide;
	const parentWrapper = this.el,
		currentNumber = parentWrapper.querySelector('.swiper-nav-pagination__number-current'),
		totalNumber = parentWrapper.querySelector('.swiper-nav-pagination__number-total'),
		progressLine = parentWrapper.querySelector('.swiper-nav-pagination__progress-current');
	currentNumber.innerHTML = currentActiveSlide
	totalNumber.innerHTML = totalSlides
	progressLine.style.width = `${progressWidth}%`
}
const swiperAbout = new Swiper('.swiper-about', {
	direction: 'vertical',
	loop: true,
	pagination: {
		el: ".swiper-about__pagination",
		type: "fraction",
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>' +
				'<span class="' + totalClass + '"></span>';
		}
	},
	spaceBetween: 30,
	autoHeight: true,
	allowTouchMove: false,



});



// Blog page
const swiperBlogLates = new Swiper('.swiper-blog-latest', {
	loop: true,
	spaceBetween: 17,
	autoHeight: true,
	keyboard: true,
	slidesPerView: 1,
	breakpoints: {
		1300: {
			slidesPerView: 'auto',
			centeredSlides: true,
		},
		800: {
			slidesPerView: 1.75,
			centeredSlides: true,
		},
	},
});

// About Us Page


const swiperOurStory = new Swiper('.content-our-story__swiper', {
	loop: true,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
		scale: .778,
		stretch: 13
	},
	speed: 500,
	spaceBetween: 30,
	keyboard: true,
	centeredSlides: true,
	breakpoints: {
		992: {
			slidesPerView: 1.75,
			spaceBetween: 40,
		},
	},

	on: {
		init: sliderPagination,

		slideChangeTransitionStart: sliderPagination,
	},
	navigation: {
		nextEl: '.content-our-story__swiper .swiper-nav-pagination__next',
		prevEl: '.content-our-story__swiper .swiper-nav-pagination__previous',
	},
});

const swiperRestaurantAbout = new Swiper('.content-restaurant-about__swiper', {
	keyboard: true,
	navigation: {
		nextEl: '.content-restaurant-about__next',
		prevEl: '.content-restaurant-about__prev',
	},
	loop: true,
	autoplay: {
		delay: 5000,
	},
	speed: 500,
	keyboard: true,
	centeredSlides: true,
	breakpoints: {
		450: {
			slidesPerView: 1,

		},
		768: {
			slidesPerView: 2,
			spaceBetween: 25,
		},
		992: {
			spaceBetween: 50,

			slidesPerView: 2.5,
		},


	}

});

const swiperExperience = new Swiper('.content-experience__swiper', {

	loop: true,
	slidesPerView: 1,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
		scale: .778,
		stretch: 13
	},
	centeredSlides: true,
	spaceBetween: 0,
	keyboard: true,

	breakpoints: {
		992: {
			slidesPerView: 'auto',
		}, 600: {
			slidesPerView: 1.5,
		},

	},
});


const swiperAboutUsStory = new Swiper('.decor-about-story__swiper', {
	loop: true,
	spaceBetween: 30,
	autoHeight: true,
	slidesPerView: 1,
	effect: 'fade',
	speed: 500,
	fadeEffect: {
		crossFade: true
	},
	autoplay: {
		delay: 5000,
	},
	breakpoints: {
		992: {
			allowTouchMove: false,
		}

	},
});

const swiperAdventure = new Swiper('.decor-adventure__swiper', {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 1,
	effect: 'fade',
	speed: 500,
	fadeEffect: {
		crossFade: true
	},
	keyboard: true,
	on: {
		init: function (){
			let currentActiveSlide = this.realIndex + 1,
				totalSlides = this.slides.length,
				progressWidth = (100 / totalSlides) * currentActiveSlide;
			const parentWrapper = document.querySelector('.adventure'),
				currentNumber = parentWrapper.querySelector('.swiper-nav-pagination__number-current'),
				totalNumber = parentWrapper.querySelector('.swiper-nav-pagination__number-total'),
				progressLine = parentWrapper.querySelector('.swiper-nav-pagination__progress-current');
			currentNumber.innerHTML = currentActiveSlide
			totalNumber.innerHTML = totalSlides
			progressLine.style.width = `${progressWidth}%`
		},

		slideChangeTransitionStart: function () {
			let currentActiveSlide = this.realIndex + 1,
				totalSlides = this.slides.length,
				progressWidth = (100 / totalSlides) * currentActiveSlide;
			const parentWrapper = document.querySelector('.adventure'),
				currentNumber = parentWrapper.querySelector('.swiper-nav-pagination__number-current'),
				totalNumber = parentWrapper.querySelector('.swiper-nav-pagination__number-total'),
				progressLine = parentWrapper.querySelector('.swiper-nav-pagination__progress-current');
			currentNumber.innerHTML = currentActiveSlide
			totalNumber.innerHTML = totalSlides
			progressLine.style.width = `${progressWidth}%`
		},
	},
	navigation: {
		nextEl: '.adventure__footer .swiper-nav-pagination__next',
		prevEl: '.adventure__footer .swiper-nav-pagination__previous',
	},

	breakpoints: {
		992: {
			allowTouchMove: false,
		}

	},
});

// Accomodations Us Page

const swiperArchitecture = new Swiper('.content-architecture__swiper', {
	autoHeight: true,
	keyboard: true,
	navigation: {
		nextEl: '.header-architecture__next',
		prevEl: '.header-architecture__prev',
	},
	spaceBetween: 5,
	slidesPerView: 1,
	breakpoints: {
		470: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 'auto',
		},
	}
});


const accomodationsSwipers = document.querySelectorAll('.header-content-accomodations__swiper');

if (accomodationsSwipers) {
	accomodationsSwipers.forEach(accomodationsSwiper => {

		const pagination = accomodationsSwiper.querySelector('.header-content-accomodations__pagination'),
			navigationButtonPrev = accomodationsSwiper.querySelector('.header-content-accomodations__prev'),
			navigationButtonNext = accomodationsSwiper.querySelector('.header-content-accomodations__next')

		const swiper = new Swiper(accomodationsSwiper, {
			keyboard: true,
			slidesPerView: 1,
			spaceBetween: 30,
			pagination: {
				el: pagination,
				type: "fraction",
				renderFraction: function (currentClass, totalClass) {
					return `<span class="${currentClass} swiper-pagination-box__current"></span>` +
						`<span class="${totalClass} swiper-pagination-box__total"></span>`;
				}
			},
			navigation: {
				nextEl: navigationButtonNext,
				prevEl: navigationButtonPrev,
			},
		});
	});
}


// ActivitiesPege

const swiperSelebrate = new Swiper('.content-selebrate__swiper', {

	loop: true,
	slidesPerView: 1,
	effect: 'coverflow',
	coverflowEffect: {
		rotate: 0,
		slideShadows: false,
		scale: .95,
		stretch: -2
	},
	centeredSlides: true,
	spaceBetween: 93,
	keyboard: true,
	spaceBetween: 30,
	autoHeight: true,
	breakpoints: {
		992: {
			slidesPerView: 2.61,
			spaceBetween: 93,
		}, 600: {
			slidesPerView: 1.5,
			spaceBetween: 50,
		},

	},
});