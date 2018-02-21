var selectedId;

chrome.tabs.onUpdated.addListener(checkForValidUrl); /* when user changes URL of current tab */
chrome.tabs.onActivated.addListener(function(tabId, info) {
    selectedId = tabId;
});

chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse) {
        if (request.greeting == "entireWork") {
                chrome.tabs.executeScript(null, {
                file: "OnePage.js"
            });
        }
        else if (request.greeting == "download") {
                chrome.tabs.executeScript(null, {
                file: "Download.js"
            });
        }
    }
)

function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('fanfiction') > -1) {
        // ... show the page action.
        chrome.pageAction.show(tabId); /* if in fanfiction.net/s/, then extension icon is in color */
    } else {
        chrome.pageAction.hide(tabId);
    }
}

function RipStory(tab) {
    chrome.tabs.executeScript(null, {
        file: "OnePage.js"
    });
}