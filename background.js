// Listen for any changes to the URL of any tab.

/*
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.pageAction.onClicked.addListener(RipStory); /* add listener to the icon */
/*
chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
    selectedId = tabId;
});
*/

var selectedId;

chrome.tabs.onUpdated.addListener(checkForValidUrl); /* when user changes URL of current tab */
chrome.tabs.onActivated.addListener(function(tabId, info) {
    selectedId = tabId;
});
document.getElementById('entireWork').onclick =  function () {
    chrome.tabs.executeScript(null, {
        file: "OnePage.js"
    });
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('fanfiction') > -1) {
        // ... show the page action.
        chrome.pageAction.show(tabId); /* if in fanfiction.net/s/, then extension icon is in color */
    } else {
        chrome.pageAction.hide(tabId);
    }
}

/*
var entireWorksBtn = document.querySelector('#entireWork');
var container =  document.querySelector('#chap_select');
alert(container);

entireWorksBtn.addEventListener("click", RipStory);
alert("Finished adding event listener to button!");
*/

function RipStory(tab) {
    chrome.tabs.executeScript(null, {
        file: "OnePage.js"
    });
}