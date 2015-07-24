(function () {
	var isSupported = null,
		timer = null,
		originSrc = 'origin-src';

	(function checkSupport () {
		var html = document.documentElement;
		var WebP = new Image();
		WebP.onload = WebP.onerror = function() {
			isSupported = (WebP.height === 2);
			if (isSupported)
				if (html.className.indexOf('no-webp') >= 0)
					html.className = html.className.replace(/\bno-webp\b/,'webp');
				else html.className += ' webp';
		};
		WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	})();

	function ready(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}

	function eachImages (options) {
		var images = document.querySelectorAll('img[data-webp]');
		var imgLn = images.length;

		// Check has images
		if (imgLn === 0) return;

		// Check interval change images length
		if (options.interval && this.imgLn === imgLn) return;
		this.imgLn = imgLn;

		for (var i = 0; i < imgLn; i++) {
			var el = images[i];

			// Save origin src
			el[originSrc] = el[originSrc] || el.src;

			// Prevent image loading
			if (options.empty) {
				if (el.complete) return;
				el.src = '';
			}

			if (options.restore) {
				el.src = el[originSrc];
			}

			// Change src to .webp
			if (options.webp) {
				if (el.complete && el.getAttribute('src') !== '') return;

				var _src = el[originSrc].replace(/\.\D{3,4}$/g, '.webp');

				el.src = _src;
			}
		}
	}

	function _init () {
		var stopRequests = function () {
			eachImages({empty: true, interval: true});
		};

		stopRequests();

		var timer = setInterval(stopRequests, 0);

		if (isSupported === null) { setTimeout(_init, 10); return; }
		clearInterval(timer);

		var readyFn = function () {
			if (isSupported === true ) eachImages({webp: true});
			if (isSupported === false) eachImages({restore: true});
		};
		//- setInterval(readyFn, 100);
		ready(readyFn);
	}

	try {_init();} catch (e) {}

	return {
		update: function () {
			try {_init();} catch (e) {}
		}
	};
})();
