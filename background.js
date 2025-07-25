const browser = window.browser || window.chrome;

function downloadFile(details) {
  const initiator = details.initiator || details.originUrl || "";
  if (!initiator.startsWith("https://elearning.paruluniversity.ac.in")) {
    return;
  }

  browser.downloads.download({
    url: details.url,
    conflictAction: "uniquify"
  });

  return { cancel: true };
}

async function setupRequestListener() {
  let result = await browser.storage.local.get('isOn');
  let isOn = result.isOn;

  if (isOn) {
    browser.webRequest.onBeforeRequest.addListener(
      downloadFile,
      { urls: ["*://*/*.pdf"] },
      ["blocking"]
    );
  }
}

setupRequestListener();
