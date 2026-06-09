
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.type === "TEXT_EXTRACTED") {
    console.log(message.text) }
})