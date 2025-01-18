// burger Menu open/close

const burgerMenu = document.querySelector('.burger'),
	menu = document.querySelector('.header__menu-wrapper'),
	header = document.querySelector('.header')
burgerMenu.addEventListener('click', burgerFunction);

function burgerFunction(e) {
	burgerMenu.classList.toggle('_active');
	menu.classList.toggle('_active');
	header.classList.toggle('_active');
	document.body.classList.toggle('_lock');
}


// dropdown Menu function
function selectMenu() {
	const selects = document.querySelectorAll('[data-select-menu]');

	// data-select-menu main data-atribute
	// data-select-menu-button open close dropdown menu
	// data-select-menu-value value of data-select-menu-button
	// data-select-menu-drop-down body of dropdown menu
	// data-select-menu-option options of dropdown menu

	if (selects) {

		document.documentElement.addEventListener('click', collapseSelects)

		selects.forEach(select => {

			const selectButton = select.querySelector('[data-select-menu-button]');
			const selectOptions = select.querySelectorAll('[data-select-menu-option]');

			selectButton.addEventListener('click', selectToggle)
			selectOptions.forEach(el => {
				el.addEventListener('click', selectChoose)
			});
		});



		function selectToggle(e) {
			const parent = e.target.closest('[data-select-menu]'),
				selectBody = parent.querySelector('[data-select-menu-drop-down]');
			parent.classList.toggle('_active')
			_slideToggle(selectBody, 300)
		}

		function selectChoose(e) {
			const parent = e.target.closest('[data-select-menu]'),
				selectValue = parent.querySelector('[data-select-menu-value]'),
				selectBody = parent.querySelector('[data-select-menu-drop-down]');
				let valueItem = this.innerText;
				selectValue.innerHTML = valueItem;
				parent.classList.remove('_active')
			_slideUp(selectBody, 300)
		}

		function collapseSelects(e) {
			const targetClick = e.target.closest('[data-select-menu]')
			selects.forEach(select => {
				if (!targetClick || targetClick !== select) {
					select.classList.remove('_active')
					const selectBody = select.querySelector('[data-select-menu-drop-down]');
					_slideUp(selectBody, 300)
				}
			});

		}

		let _slideUp = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');

				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = target.offsetHeight + 'px';
				target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				window.setTimeout(() => {
					target.style.display = 'none';
					target.style.removeProperty('height');
					target.style.removeProperty('padding-top');
					target.style.removeProperty('padding-bottom');
					target.style.removeProperty('margin-top');
					target.style.removeProperty('margin-bottom');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}
		}

		let _slideDown = (target, duration = 500) => {
			if (!target.classList.contains('_slide')) {
				target.classList.add('_slide');

				target.style.removeProperty('display');
				let display = window.getComputedStyle(target).display;
				if (display === 'none')
					display = 'block'

				target.style.display = display;
				let height = target.offsetHeight;
				target.style.overflow = 'hidden';
				target.style.height = 0;
				target.style.paddingTop = 0;
				target.style.paddingBottom = 0;
				target.style.marginTop = 0;
				target.style.marginBottom = 0;
				target.offsetHeight;
				target.style.transitionProperty = 'height, margin, padding';
				target.style.transitionDuration = duration + 'ms';
				target.style.height = height + 'px';
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				window.setTimeout(() => {
					target.style.removeProperty('height');
					target.style.removeProperty('overflow');
					target.style.removeProperty('transition-duration');
					target.style.removeProperty('transition-property');
					target.classList.remove('_slide');
				}, duration);
			}

		}

		let _slideToggle = (target, duration = 500) => {
			if (window.getComputedStyle(target).display === 'none') {
				return _slideDown(target, duration);
			} else {
				_slideUp(target, duration);
			}
		}
	}


}

selectMenu()

// A function that moves elements to other blocks depending on the size of the screen. (Used when adapting the page to different devices.)
function dynamicAdaptiv() {
	class DynamicAdapt {
		constructor(type) {
			this.type = type
		}

		init() {
			// массив объектов
			this.оbjects = []
			this.daClassname = '_dynamic_adapt_'
			// массив DOM-элементов
			this.nodes = [...document.querySelectorAll('[data-da]')]

			// наполнение оbjects обьектами
			this.nodes.forEach((node) => {
				const data = node.dataset.da.trim()
				const dataArray = data.split(',')
				const оbject = {}
				оbject.element = node
				оbject.parent = node.parentNode
				оbject.destination = document.querySelector(`${dataArray[0].trim()}`)
				оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
				оbject.place = dataArray[2] ? dataArray[2].trim() : 'last'
				оbject.index = this.indexInParent(оbject.parent, оbject.element)
				this.оbjects.push(оbject)
			})
			this.arraySort(this.оbjects)

			// массив уникальных медиа-запросов
			this.mediaQueries = this.оbjects
				.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
				.filter((item, index, self) => self.indexOf(item) === index)
			// навешивание слушателя на медиа-запрос
			// и вызов обработчика при первом запуске
			this.mediaQueries.forEach((media) => {
				const mediaSplit = media.split(',')
				const matchMedia = window.matchMedia(mediaSplit[0])
				const mediaBreakpoint = mediaSplit[1]

				// массив объектов с подходящим брейкпоинтом
				const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)
				matchMedia.addEventListener('change', () => {

					this.mediaHandler(matchMedia, оbjectsFilter)
				})
				this.mediaHandler(matchMedia, оbjectsFilter)
			})
		}

		// Основная функция
		mediaHandler(matchMedia, оbjects) {
			if (matchMedia.matches) {
				оbjects.forEach((оbject) => {
					// оbject.index = this.indexInParent(оbject.parent, оbject.element);
					this.moveTo(оbject.place, оbject.element, оbject.destination)
				})
			} else {
				оbjects.forEach(({ parent, element, index }) => {
					if (element.classList.contains(this.daClassname)) {
						this.moveBack(parent, element, index)
					}
				})
			}
		}

		// Функция перемещения
		moveTo(place, element, destination) {
			element.classList.add(this.daClassname)
			if (place === 'last' || place >= destination.children.length) {
				destination.append(element)
				return
			}
			if (place === 'first') {
				destination.prepend(element)
				return
			}
			destination.children[place].before(element)
		}

		// Функция возврата
		moveBack(parent, element, index) {
			element.classList.remove(this.daClassname)
			if (parent.children[index] !== undefined) {
				parent.children[index].before(element)
			} else {
				parent.append(element)
			}
		}

		// Функция получения индекса внутри родителя
		indexInParent(parent, element) {
			return [...parent.children].indexOf(element)
		}

		// Функция сортировки массива по breakpoint и place
		// по возрастанию для this.type = min
		// по убыванию для this.type = max
		arraySort(arr) {
			if (this.type === 'min') {
				arr.sort((a, b) => {
					if (a.breakpoint === b.breakpoint) {
						if (a.place === b.place) {
							return 0
						}
						if (a.place === 'first' || b.place === 'last') {
							return -1
						}
						if (a.place === 'last' || b.place === 'first') {
							return 1
						}
						return 0
					}
					return a.breakpoint - b.breakpoint
				})
			} else {
				arr.sort((a, b) => {
					if (a.breakpoint === b.breakpoint) {
						if (a.place === b.place) {
							return 0
						}
						if (a.place === 'first' || b.place === 'last') {
							return 1
						}
						if (a.place === 'last' || b.place === 'first') {
							return -1
						}
						return 0
					}
					return b.breakpoint - a.breakpoint
				})
				return
			}
		}
	}

	let da = new DynamicAdapt('max');
	da.init();
}

dynamicAdaptiv()

// spollers function

function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(',')[0];
		});

		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}
	}

	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(',')[0];
	});



	if (spollersMedia.length > 0) {

		const breakpoinsArray = [];
		spollersMedia.forEach((item) => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(',');
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
			breakpoint.item = item;
			breakpoinsArray.push(breakpoint);
		});

		let mediaQueries = breakpoinsArray.map((item) => {
			return '(' + item.type + "-width: " + item.value + 'px),' + item.value + ',' + item.type;
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});

		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			const spollersArray = breakpoinsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			matchMedia.addEventListener("change", function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}

	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach((spollersBlock) => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener('click', setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener('click', setSpollerAction)
			}
		});
	}

	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			})
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollerBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();

		}
	}

	function hideSpollerBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}


	let _slideUp = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);

		}
	}

	let _slideDown = (target, duration = 500) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (target.hidden) {
				target.hidden = false;
			}
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);

		}
	}

	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			_slideUp(target, duration);
		}
	}
}

spollers()



// dates inputs

const dateIn = document.querySelector('#date-in'),
	dateOut = document.querySelector('#date-out'),
	configs = (element) => {
		return {
			minDate: 'today',
			monthSelectorType: 'static',
			altInput: true,
			disableMobile: "true",
			onOpen: () => {
				element.parentElement.classList.add('_active')
			},
			onClose: () => {
				element.parentElement.classList.remove('_active')
			},
		}
	}

flatpickr(dateIn, configs(dateIn));
flatpickr(dateOut, configs(dateOut));



// swipers initialization
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


const swiperAccomodations = new Swiper('.swiper-accomodations', {
	loop: true,
	autoHeight: true,
	pagination: {
		el: ".swiper-accomodations__pagination",
		type: "fraction",
		renderFraction: function (currentClass, totalClass) {
			return `<span class="${currentClass} swiper-pagination-box__current"></span>` +
				`<span class="${totalClass} swiper-pagination-box__total"></span>`;
		}
	},
	spaceBetween: 15,
});

const swiperRooms = new Swiper('.swiper-rooms', {
	autoHeight: true,
	navigation: {
		nextEl: '.rooms-swiper__next',
		prevEl: '.rooms-swiper__prev',
	},

	spaceBetween: 20,
	breakpoints: {
		450: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 47,

		},
		550: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 30,

		},
		992: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			spaceBetween: 30,

		},

	}

});
const swiperExperencies = new Swiper('.content-experencies__swiper', {
	slidesPerView: 1.5,
	loop: true,
	speed: 10000,
	freeMode: true,
	lazy: {
		//  tell swiper to load images before they appear
		loadPrevNext: true,
		// amount of images to load
		loadPrevNextAmount: 2,
	},
	spaceBetween: 25,
	allowTouchMove: false,
	touchMoveStopPropagation: true,
	autoplay: {
		delay: 0,
	},
	pagination: {
		el: ".content-experencies__pagination",
		type: "fraction",
		renderFraction: function (currentClass, totalClass) {
			return `<span class="${currentClass} swiper-pagination-box__current"></span>` +
				`<span class="${totalClass} swiper-pagination-box__total"></span>`;
		}
	},
	breakpoints: {
		400: {
			slidesPerView: 1.2,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 'auto',
			spaceBetween: 25,
		}
	}
});

const swiperAbout = new Swiper('.content-about__swiper', {
	autoHeight: true,
	navigation: {
		nextEl: '.about-swiper__next',
		prevEl: '.about-swiper__prev',
	},

	spaceBetween: 20,
	breakpoints: {
		450: {
			slidesPerView: 1,
			slidesPerGroup: 1,
		},
		768: {

			spaceBetween: 30,

		},
		992: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			spaceBetween: 55,

		},

	}

});

const swiperGalleryTop = new Swiper('.top-gallery__swiper', {

	loop: true,
	speed: 10000,
	freeMode: true,
	lazy: {
		loadPrevNext: true,
		loadPrevNextAmount: 2,
	},
	spaceBetween: 20,
	allowTouchMove: false,
	autoplay: {
		delay: 0,
		reverseDirection: true
	},
	slidesPerView: 1,
	breakpoints: {
		400: {
			slidesPerView: 1.2,
			spaceBetween: 25,
		},
		768: {
			slidesPerView: 'auto',
			spaceBetween: 28,
		}
	}
});
const swiperGalleryBottom = new Swiper('.bot-gallery__swiper', {
	loop: true,
	speed: 10000,
	freeMode: true,
	lazy: {
		loadPrevNext: true,
		loadPrevNextAmount: 2,
	},
	spaceBetween: 20,
	allowTouchMove: false,
	autoplay: {
		delay: 0,
	},
	slidesPerView: 1,
	breakpoints: {
		400: {
			slidesPerView: 1.2,
			spaceBetween: 25,
		},
		768: {
			slidesPerView: 'auto',
			spaceBetween: 28,
		}
	}
});