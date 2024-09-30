let seconds = 30 * 60; // Default time (30 minutes)
let timerIsRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTimer") {
        chrome.storage.local.get("timerDuration", (data) => {
            seconds = data.timerDuration || 30 * 60; // Use user-defined duration or default to 30 minutes
            startTimer();
        });
    } else if (message.action === "stopTimer") {
        stopTimer();
    } else if (message.action === "resetTimer") {
        resetTimer();
    }
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (!timerIsRunning) return;

    seconds--;
    const dueMin = Math.floor(seconds / 60) + "M";
    chrome.action.setBadgeText({ text: dueMin });

    if (seconds <= 0) {
        clearAlarm("pomodoro-timer");
        createNotification("Well done! You focused well, take a break.");
        resetTimer();
    }
});

function startTimer() {
    if (timerIsRunning) return;

    timerIsRunning = true;
    createAlarm("pomodoro-timer");
    chrome.action.setBadgeBackgroundColor({ color: [255, 0, 0, 255] }); // Red
    chrome.action.setBadgeText({ text: Math.floor(seconds / 60) + "M" }); // Show minutes
}

function stopTimer() {
    if (!timerIsRunning) return;

    clearAlarm("pomodoro-timer");
    timerIsRunning = false;
    chrome.action.setBadgeText({ text: "STOP" });
    chrome.action.setBadgeBackgroundColor({ color: [255, 255, 0, 255] }); // Yellow
}

function resetTimer() {
    clearAlarm("pomodoro-timer");
    timerIsRunning = false;
    seconds = 0; // Reset seconds to 0
    chrome.action.setBadgeText({ text: "RESET" });
    chrome.action.setBadgeBackgroundColor({ color: [0, 0, 255, 255] }); // Blue
}

function createAlarm(name) {
    chrome.alarms.create(name, {
        periodInMinutes: 1 / 60, // Trigger every second
    });
}

function clearAlarm(name) {
    chrome.alarms.clear(name, (wasCleared) => {
        console.log("Alarm cleared:", wasCleared);
    });
}

function createNotification(message) {
    const opt = {
        type: 'basic',
        title: "Pomodoro Timer",
        message: message,
        iconUrl: 'icons/logo-32.png'
    };
    chrome.notifications.create(opt);
}

// Set initial badge color
chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] }); // Green
