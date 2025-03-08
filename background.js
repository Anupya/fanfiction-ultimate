let selectedId;

// Listen for tab updates (when URL changes)
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// Listen for tab activation (switching between tabs)
chrome.tabs.onActivated.addListener(({ tabId }) => {
    selectedId = tabId;
});

// Message listener to execute scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!sender.tab?.id) return false; // Ensure sender has a valid tab ID

    const scriptFile = message === "entireWork" ? "OnePage.js" :
        message === "download" ? "Download.js" : null;

    if (scriptFile) {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: [scriptFile]
        });
    }

    return true; // Keeps the message channel open if needed
});

// Checks if the URL is valid for the extension
function checkForValidUrl(tabId, changeInfo, tab) {
    if (!tab.url) return;

    const isFanfiction = tab.url.includes('fanfiction');

    // TODO: Needs to be migrated to v3
    if (chrome.pageAction) { // This is a Manifest V2-ism
        isFanfiction ? chrome.pageAction.show(tabId) : chrome.pageAction.hide(tabId);
    }
}
