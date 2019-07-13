(function () {
	'use strict';

	var imgsUrl = [];
	var imgs = document.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++) { 
		//console.log('w' + imgs[i].width + ' h' + imgs[i].width + ' ' + imgs[i].src);
		imgsUrl.push(imgs[i].src);
	}
	
	chrome.runtime.sendMessage({
		url: imgsUrl
	});
}());