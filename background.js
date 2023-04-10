// 확장 프로그램 버튼이 클릭될 때 실행할 함수를 정의합니다.
chrome.action.onClicked.addListener(async (tab) => {
	// 현재 보고 있는 탭의 URL을 가져옵니다.
	const tabUrl = tab.url;
	
	// 해당 URL에서 300px 이상의 이미지들의 URL을 찾습니다.
	const imageUrls = await findImageUrls(tabUrl, tab.id);
  
	// 이미지들의 URL을 다운로드 받습니다.
	await downloadImages(imageUrls);
  });
  
  // 해당 URL에서 300px 이상의 이미지들의 URL을 찾는 함수입니다.
  async function findImageUrls(tabUrl, _tabID) {
	// 탭에서 스크립트를 실행하여 이미지들의 URL과 크기를 가져옵니다.
	const result = await chrome.scripting.executeScript({
	  target: {tabId: _tabID},
	  func: () => {
		// 문서에서 모든 이미지 요소를 선택합니다.
		const images = document.querySelectorAll("img");
		// 이미지들의 URL과 크기를 배열에 저장합니다.
		const imageInfo = [];
		for (let image of images) {
		  imageInfo.push({
			url: image.src,
			width: image.naturalWidth,
			height: image.naturalHeight
		  });
		}
		// 배열을 반환합니다.
		return imageInfo;
	  }
	});
  
	// 결과에서 300px 이상의 이미지들의 URL만 필터링합니다.
	const imageUrls = [];
	for (let info of result[0].result) {
	  if (info.width >= 300 && info.height >= 300) {
		imageUrls.push(info.url);
	  }
	}
  
	// 이미지들의 URL을 반환합니다.
	return imageUrls;
  }
  
  // 이미지들의 URL을 다운로드 받는 함수입니다.
  async function downloadImages(imageUrls) {
	// 이미지들의 URL을 순회하면서 다운로드 요청을 보냅니다.
	for (let i = 0; i < imageUrls.length; i++) {
	  // 이미지의 URL에서 확장자를 추출합니다.
	  const extension = imageUrls[i].split(".").pop();
	  
	  // 다운로드 옵션을 설정합니다.
	  const options = {
		url: imageUrls[i],
		filename: `img_${(i + 1).toString().padStart(4, "0")}.${extension}`,
		conflictAction: "uniquify"
	  };
  
	  // 다운로드 요청을 보냅니다.
	  await chrome.downloads.download(options);
	}
  }