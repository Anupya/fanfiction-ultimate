// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(RipStory);
chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
    selectedId = tabId;
});
var selectedId;
function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('fanfiction') > -1) {
        // ... show the page action.
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
}
function RipStory(tab) {
    chrome.tabs.executeScript(null, {
        file: "OnePage.js"
    });
}