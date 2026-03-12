(function () {
	var toggle = document.querySelector('.nav-toggle');
	var header = document.querySelector('.site-header');
	if (!toggle || !header) return;

	toggle.addEventListener('click', function () {
		var isOpen = header.classList.toggle('nav-open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});

	// Close menu when any nav link is clicked
	document.querySelectorAll('.site-nav a').forEach(function (link) {
		link.addEventListener('click', function () {
			header.classList.remove('nav-open');
			toggle.setAttribute('aria-expanded', 'false');
		});
	});

	// Close menu when clicking outside
	document.addEventListener('click', function (e) {
		if (!header.contains(e.target)) {
			header.classList.remove('nav-open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	});

	// Scroll-aware sticky header
	// Uses transition (not animation) so the slide is stateful and never restarts mid-way.
	var lastScrollY = window.scrollY;
	var ticking = false;
	var isPinned = false;
	var THRESHOLD = 100;

	window.addEventListener('scroll', function () {
		if (!ticking) {
			window.requestAnimationFrame(function () {
				var currentScrollY = window.scrollY;

				if (currentScrollY <= THRESHOLD) {
					// Back near the top — restore original header
					header.classList.remove('header-pinned', 'header-hidden');
					isPinned = false;

				} else if (currentScrollY < lastScrollY) {
					// Scrolling up
					if (!isPinned) {
						// First pin: place fixed off-screen instantly, then slide in smoothly
						header.style.transition = 'none';
						header.classList.add('header-pinned', 'header-hidden');
						// Force a reflow so the browser registers the off-screen position
						header.offsetHeight;
						// Re-enable transitions and slide in
						header.style.transition = '';
						header.classList.remove('header-hidden');
						isPinned = true;
					} else {
						header.classList.remove('header-hidden');
					}

				} else if (currentScrollY > lastScrollY) {
					// Scrolling down — slide header out and close mobile menu
					if (isPinned) {
						header.classList.add('header-hidden');
					}
					header.classList.remove('nav-open');
					toggle.setAttribute('aria-expanded', 'false');
				}

				lastScrollY = currentScrollY;
				ticking = false;
			});
			ticking = true;
		}
	});
})();
