(function () {
	'use strict';
	
	var downloadFileCount = 0;
	chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest) {
		
		var formattedNumber = ("00" + downloadFileCount).slice(-3);
		var newFileName = 'img' + formattedNumber + '.' + downloadItem.filename.split('.').pop();
		downloadFileCount += 1;
		console.log(newFileName);
		
		suggest({filename: newFileName});
	});


	chrome.runtime.onMessage.addListener(function (result) {
		console.log('send message');
		for (var i = 0; i < result.url.length; i++) { 
			var url = result.url[i];
			chrome.downloads.download({url: result.url[i]},
				function(downloadId) {
					console.log(downloadId);
				});
		}
	});

	chrome.browserAction.onClicked.addListener(function (tab) {
		console.log('click');
		chrome.tabs.executeScript(tab.id, {file: '/jquery-3.4.1.min.js'}, function() {
			chrome.tabs.executeScript(tab.id, {file: '/run.js'});
		});
	});
}());