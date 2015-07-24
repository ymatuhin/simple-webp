(function () {
	var html = document.documentElement,
		isSupported = null;

	// dom ready fn
	function ready(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}

	function eachNoWebpImages (action) {
		var action = action || function () {};
		var images = document.querySelectorAll('img[data-webp]:not([src$=webp])');

		if (images.length === 0) return;

		for (var i = 0; i < images.length; i++) {
			var el = images[i];
			action(el);
		}
	}

	function checkSupport (fn) {
		var WebP = new Image();
		WebP.onload = WebP.onerror = function() {
			isSupported = (WebP.height === 2);

			if (isSupported) {
				if (html.className.indexOf('no-webp') >= 0)
					html.className = html.className.replace(/\bno-webp\b/, 'webp');
				else html.className += ' webp';
				fn();
			}
		};
		WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	function changeToWebpUrl () {
		eachNoWebpImages(function (el) {
			if (el.complete) return;
			el.src = el.src.replace(/\.\D{3,5}$/g, '.webp');
		});
	}

	function webpSupportFnCallback () {
		changeToWebpUrl();
		var timer = setInterval(changeToWebpUrl, 50);

		// dom ready
		ready(function () {
			clearInterval(timer);
		});
	}

	checkSupport(webpSupportFnCallback);
})();
