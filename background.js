const browser = window.browser || window.chrome;

function onDownloadStarted(id) {
  console.log(`Started Download: ${id}`)
}

function onDownloadFailed(error) {
  console.log(`Download Failed: ${error}`)
}

function downloadFile(details) {
  const initiator = details.initiator || details.originUrl || "";
  if (!initiator.startsWith("https://elearning.paruluniversity.ac.in")) {
    return;
  }

  let downloading = browser.downloads.download({
    url: details.url,
    conflictAction: "uniquify"
  });

  downloading.then(onDownloadStarted, onDownloadFailed);

  return { cancel: true };
}

async function setupRequestListener() {
  let result = await browser.storage.local.get('isOn');
  let isOn = result.isOn ?? true;

  if (isOn) {
    browser.webRequest.onBeforeRequest.addListener(
      downloadFile,
      { urls: ["*://*/*.pdf"] },
      ["blocking"]
    );
  }
}

setupRequestListener();
