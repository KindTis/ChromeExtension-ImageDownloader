'use strict';

var downloadFileCount = 0;
var downloadUrlMap = new Map();
chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest) {
	if (downloadUrlMap.has(downloadItem.url) == false)
		return;
	
	var fileNumber = downloadUrlMap.get(downloadItem.url);
	var formattedNumber = ("00" + fileNumber).slice(-3);
	var newFileName = 'img' + formattedNumber + '.' + downloadItem.filename.split('.').pop();
	
	suggest({filename: newFileName});
});


chrome.runtime.onMessage.addListener(function (result) {
	for (var i = 0; i < result.url.length; i++) { 
		downloadUrlMap.set(result.url[i], i);
		console.log(i + ': ' + result.url[i]);
		chrome.downloads.download({url: result.url[i]});
	}
});

chrome.browserAction.onClicked.addListener(function (tab) {
	console.log('click');
	chrome.tabs.executeScript(tab.id, {file: '/jquery-3.4.1.min.js'}, function() {
		chrome.tabs.executeScript(tab.id, {file: '/run.js'});
	});
});