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
	pagination: {
		el: ".swiper-story__pagination",
		type: "fraction",
		renderFraction: function (currentClass, totalClass) {
			return `<span class="${currentClass} swiper-pagination-box__current"></span>` +
				`<span class="${totalClass} swiper-pagination-box__total"></span>`;
		}
	},
	spaceBetween: 30,
	keyboard: true,
	breakpoints: {
		992: {
			slidesPerView: 1.5,
			spaceBetween: 70,
		},

	},



});
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
	spaceBetween: 30,
	autoHeight: true,
	keyboard: true,
	breakpoints: {
		768: {
			slidesPerView: 'auto',
			centeredSlides: true,
			spaceBetween: 50,
		},

	},
});

const swiperRestaurantAbout = new Swiper('.content-restaurant-about__swiper', {
	autoHeight: true,
	keyboard: true,
	navigation: {
		nextEl: '.content-restaurant-about__next',
		prevEl: '.content-restaurant-about__prev',
	},
	spaceBetween: 5,
	breakpoints: {
		450: {
			slidesPerView: 1,
			slidesPerGroup: 1,

		},
		550: {
			slidesPerView: 2,
			slidesPerGroup: 2,
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

	fadeEffect: {
		crossFade: true
	},
	autoplay: {
		delay: 5000,
	},
	allowTouchMove: false,
	// breakpoints: {
	// 	992: {
	// 		centeredSlides:false
	// 	},

	// },
});