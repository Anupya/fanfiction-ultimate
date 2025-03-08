var selectedId;

chrome.tabs.onUpdated.addListener(checkForValidUrl); /* when user changes URL of current tab */
chrome.tabs.onActivated.addListener(function (tabId, info) {
    selectedId = tabId;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "entireWork") {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["OnePage.js"]
        });
    }
    else if (message === "download") {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["Download.js"]
        });
    }
    return true;
})

function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url?.indexOf('fanfiction') > -1) {
        // ... show the page action.
        chrome.pageAction?.show(tabId); /* if in fanfiction.net/s/, then extension icon is in color */
    } else {
        chrome.pageAction?.hide(tabId);
    }
}

function RipStory(tab) {
    chrome.scripting.executeScript(null, {
        target: { tabId: tabId },
        files: ["OnePage.js"]
    });
}