/* 出力コンソール */
function consoleOut(elem) {
	this.target = null;

	if (elem && typeof elem == "object" && elem.nodeType == document.ELEMENT_NODE) {
		this.target = elem;
	}
}

/* エラー出力 */
consoleOut.prototype.error = function () {
	if (this.target) {
		for (var i = 0; i < arguments.length; i++) {
			var errorParagraph = document.createElement("p");
			var errorText = document.createTextNode(arguments[i].toString());

			errorParagraph.setAttribute("class", "urajijo-error");
			errorParagraph.appendChild(errorText);
			this.target.appendChild(errorParagraph);
		}
	}
};

/* 警告出力 */
consoleOut.prototype.warn = function () {
	if (this.target) {
		for (var i = 0; i < arguments.length; i++) {
			var errorParagraph = document.createElement("p");
			var errorText = document.createTextNode(arguments[i].toString());

			errorParagraph.setAttribute("class", "urajijo-warn");
			errorParagraph.appendChild(errorText);
			this.target.appendChild(errorParagraph);
		}
	}
};

/* 情報出力 */
consoleOut.prototype.info = function () {
	if (this.target) {
		for (var i = 0; i < arguments.length; i++) {
			var errorParagraph = document.createElement("p");
			var errorText = document.createTextNode(arguments[i].toString());

			errorParagraph.setAttribute("class", "urajijo-info");
			errorParagraph.appendChild(errorText);
			this.target.appendChild(errorParagraph);
		}
	}
};

/* リンク出力 */
consoleOut.prototype.link = function (link, caption) {
	if (this.target && arguments.length >= 1) {
		if (arguments.length < 2) {
			caption = link;
		}

		var linkParagraph = document.createElement("p");
		var linkElement = document.createElement("a");
		var linkText = document.createTextNode(caption);

		linkElement.setAttribute("href", link);
		linkElement.setAttribute("target", "_blank");
		linkElement.appendChild(linkText);

		linkParagraph.setAttribute("class", "urajijo-info");
		linkParagraph.appendChild(linkElement);

		this.target.appendChild(linkParagraph);
	}
};

/* エラー消去 */
consoleOut.prototype.clear = function () {
	if (this.target) {
		while (this.target.firstChild)
			this.target.removeChild(this.target.firstChild);
	}
};
