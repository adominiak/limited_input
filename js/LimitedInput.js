(function () {
	function LimitedInput() {
		this._prepare();
	};

	LimitedInput.prototype._prepare = function(){
		var elementsWatched = document.querySelectorAll('.word-count-textbox');
		for (var i = elementsWatched.length - 1; i >= 0; i--) {
			var inputElement = elementsWatched[i].querySelector('input');
			var maxWords = inputElement.getAttribute('max-word-count');
			inputElement.addEventListener("keyup", limit(event,maxWords), true);
			elementsWatched[i].querySelector('span').innerHTML = maxWords;
		};
	}

	var limit = function(event, maxWords){
		var re = new RegExp("^\\s*\\S+(?:\\s+\\S+){0,"+(maxWords-1)+"}\\s*");
		return function(event){
			var cursorStartPosition = event.currentTarget.selectionStart,
				cursorEndPosition = event.currentTarget.selectionEnd;
			var value = event.currentTarget.value,
				wordCount = value.split(/\S+/).length - 1;
			if (wordCount >= maxWords) {
				event.currentTarget.value = value.match(re);
				wordCount = maxWords;
				//restore cursor
				event.currentTarget.setSelectionRange(cursorStartPosition, cursorEndPosition);
			}
			// set word counter label
			event.currentTarget.nextElementSibling.innerHTML = maxWords-wordCount;
		}
	}

	window.TEST = window.TEST || {};
	window.TEST.LimitedInput = LimitedInput;
})();