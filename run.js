(function () {
	'use strict';

	var imgsUrl = [];
	var imgs = document.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++) { 
		if (imgs[i].width < 350 || imgs[i].height < 350)
			continue;
		console.log('w' + imgs[i].width + ' h' + imgs[i].height + ' ' + imgs[i].src);
		imgsUrl.push(imgs[i].src);
	}
	
	chrome.runtime.sendMessage({
		url: imgsUrl
	});
}());