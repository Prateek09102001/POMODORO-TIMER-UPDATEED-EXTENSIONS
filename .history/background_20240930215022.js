chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ remainingTime: 25 * 60, isRunning: false });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTimer") {
        chrome.storage.local.set({ isRunning: true });
    } else if (message.action === "stopTimer") {
        chrome.storage.local.set({ isRunning: false });
    } else if (message.action === "resetTimer") {
        chrome.storage.local.set({ remainingTime: 25 * 60, isRunning: false });
    }
});
