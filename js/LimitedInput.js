(function ($) {
	function LimitedInput() {
		this._limitInput();
	};

	LimitedInput.prototype._limitInput = function() {
		$('div.word-count-textbox').each(function() {
			var max = $(this).children("input[max-word-count]").attr("max-word-count");
			$(this).children("span").text(max);
		});
		$('div.word-count-textbox > input').keyup(function(event) {
	
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
			$(event.currentTarget).siblings("span").text(maxWords-wordCount);
		});
	};

	window.TEST = window.TEST || {};
	window.TEST.LimitedInput = LimitedInput;
})(jQuery);