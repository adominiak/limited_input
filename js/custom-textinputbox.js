var LimitedInput = (function(){

	var elementsWatched = document.getElementsByClassName('word-count-textbox');
	for (var i = elementsWatched.length - 1; i >= 0; i--) {
		var maxWords = elementsWatched[i].children[0].getAttribute('max-word-count');
		elementsWatched[i].children[1].innerHTML = maxWords;
	};

	return {
		limitInput: function(event){
	
			//remember cursor
			var cursorStartPosition = event.currentTarget.selectionStart,
				cursorEndPosition = event.currentTarget.selectionEnd;

			var maxWords = event.currentTarget.getAttribute('max-word-count');
			var value = event.currentTarget.value;
				wordCount = value.split(/\S+/).length - 1;
			if (wordCount >= maxWords) {
				var re = new RegExp("^\\s*\\S+(?:\\s+\\S+){0,"+(maxWords-1)+"}\\s*");
				event.currentTarget.value = value.match(re);
				wordCount = maxWords;
				//restore cursor
				event.currentTarget.setSelectionRange(cursorStartPosition, cursorEndPosition);
			}
			// set word counter label
			event.currentTarget.nextElementSibling.innerHTML = maxWords-wordCount;
		}
	}
})();
