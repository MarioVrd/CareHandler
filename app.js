AOS.init();

// class for active nav link
const NAV_ACTIVE = 'nav__link--active';

const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');

const switchActive = newActive => {
	const prevActive = document.querySelector(`.${NAV_ACTIVE}`);

	// If newActive is same as previous, don't change
	if (prevActive.href === newActive.href) return;

	if (prevActive) {
		prevActive.classList.remove(NAV_ACTIVE);
	}
	newActive.classList.add(NAV_ACTIVE);
};

document.addEventListener('scroll', e => {
	if (window.scrollY > 60) {
		header.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
	} else {
		header.style.boxShadow = 'none';

		// Set home as active link when scrolled up
		switchActive(navLinks[0]);
	}

	// Scroll Spy with scroll listener
	// if (window.scrollY < sections[1].offsetTop / 2) {
	// 	switchActive(navLinks[0]);
	// } else {
	// 	sections.forEach((section, index) => {
	// 		if (
	// 			window.scrollY + window.innerHeight >= section.offsetTop &&
	// 			window.scrollY + window.innerHeight < section.offsetTop + section.clientHeight
	// 		) {
	// 			let newActive = document.querySelector(`a[href="#${section.className}"]`);

	// 			if (newActive.hash === `#${section.className}`) {
	// 				switchActive(newActive);
	// 			}
	// 		}
	// 	});
	// }
});

let options = {
	// rootMargin: '-100px 0px -200px 0px'
	threshold: 0.5
};

let sectionsObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			let newActive =
				entry.target.nodeName.toLowerCase() === 'section'
					? document.querySelector(`a[href="#${entry.target.className}"]`)
					: links[0];

			switchActive(newActive);
		}
	});
}, options);

sections.forEach((section, index) => {
	// Skip first (hero) section
	if (index === 0) return;
	sectionsObserver.observe(section);
});

navLinks.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault();

		if (e.target == navLinks[0]) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		let sectionToScrollTo = document.querySelector(e.target.hash);

		window.scrollTo({ top: sectionToScrollTo.offsetTop - 100, behavior: 'smooth' });
	});
});
