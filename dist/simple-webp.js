(function (window) {
	var html = document.documentElement, isSupported = null;

	// dom ready fn
	function domReady(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}

	function each (action) {
		action = action || function () {};
		var elements = document.querySelectorAll('noscript[data-webp]');

		if (elements.length === 0) return;

		for (var i = 0; i < elements.length; i++) {
			var el = elements[i];
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
			}
			fn(isSupported);
		};
		WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	function addDefault () {
		each(function (el) {
			el.insertAdjacentHTML('afterend', el.textContent);
			el.parentNode.removeChild(el);
		});
	}

	function addWebP () {
		each(function (el) {
			var str = el.textContent;
			var p1 = str.indexOf(' src=');
			var p2 = str.indexOf(' ', p1 + 1);
			var p3 = str.indexOf('>', p1 + 1);
			var pLast = (p2 > p3) ? p3 : p2;

			var src = str.slice(p1, pLast);
			var pLastDot = src.lastIndexOf('.');

			var extension = src.slice(pLastDot);
			var newExtension = extension.replace(/\.[a-zA-Z]{3,5}/g, '.webp');

			var newStr = str.slice(0, p1 + pLastDot) + newExtension + str.slice(pLast);

			el.insertAdjacentHTML('afterend', newStr);
			el.parentNode.removeChild(el);
		});
	}

	function interV(support) {
		if (support) addWebP();
		else addDefault();
	}

	function webpSupportFnCallback (support) {
		var timer;

		interV(support);
		timer = setInterval(interV.bind(null, support), 15);

		// dom ready
		domReady(function () {
			clearInterval(timer);
		});

		return 'done'
	}

	checkSupport(webpSupportFnCallback);

	window.simpleWebp = webpSupportFnCallback.bind(null, isSupported);
})(window);
