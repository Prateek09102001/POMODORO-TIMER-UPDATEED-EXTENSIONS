document.getElementById('start').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    const seconds = minutes * 60; // Convert to seconds
    chrome.storage.local.set({ timerDuration: seconds }, () => {
        chrome.runtime.sendMessage({ action: "startTimer" });
        window.close(); // Close the popup
    });
});

document.getElementById('reset').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    window.close(); // Close the popup
});
