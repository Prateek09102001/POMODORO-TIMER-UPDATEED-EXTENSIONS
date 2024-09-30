document.getElementById('start').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    const seconds = minutes * 60; // Convert to seconds
    chrome.storage.local.set({ timerDuration: seconds }, () => {
        chrome.runtime.sendMessage({ action: "startTimer" });
        document.getElementById('status').innerText = "Timer started for " + minutes + " minutes.";
        window.close(); // Close the popup
    });
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stopTimer" });
    document.getElementById('status').innerText = "Timer stopped.";
    window.close(); // Close the popup
});

document.getElementById('reset').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    document.getElementById('status').innerText = "Timer reset.";
    window.close(); // Close the popup
});
