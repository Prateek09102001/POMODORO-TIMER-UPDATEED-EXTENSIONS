let seconds = 30 * 60; // Default time (30 minutes)
let timerIsRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTimer") {
        chrome.storage.local.get("timerDuration", (data) => {
            seconds = data.timerDuration || 30 * 60; // Use user-defined duration or default to 30 minutes
            startTimer();
        });
    } else if (message.action === "resetTimer") {
        resetTimer();
    }
});

function startTimer() {
    if (timerIsRunning) return;

    timerIsRunning = true;
    createAlarm("pomodoro-timer");
    // Update UI or notify user...
}

function resetTimer() {
    clearAlarm("pomodoro-timer");
    timerIsRunning = false;
    seconds = 0; // Reset seconds to 0
    // Update UI or notify user...
}

// Alarm and notification logic remains the same...
