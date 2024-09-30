let seconds = 25 * 60; // Default time (25 minutes)
let timerIsRunning = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startTimer") {
        chrome.storage.local.get("timerDuration", (data) => {
            seconds = data.timerDuration || 25 * 60; // Use user-defined duration or default to 25 minutes
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
    const dueMin = Math.floor(seconds / 60);
    chrome.action.setBadgeText({ text: dueMin.toString()+"M" }); // Show minutes

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
    chrome.action.setBadgeText({ text: Math.floor(seconds / 60).toString() }); // Show minutes
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
    seconds = 25 * 60; // Reset seconds to default (25 minutes)
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

// Create a notification
function createNotification(message) {
    const opt = {
        type: 'basic',  // Change to 'basic'
        title: "Pomodoro Timer",
        message: message,
        iconUrl: 'icons/logo-32.png', // Make sure this path is correct
        priority: 2 // Optional: set notification priority
    };

    chrome.notifications.create({
        ...opt,
        // Add a unique notification ID if needed
        notificationId: "pomodoroNotification"
    }, (notificationId) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            console.log("Notification sent with ID:", notificationId);
        }
    });
}


// Set initial badge color
chrome.action.setBadgeBackgroundColor({ color: [0, 255, 0, 255] }); // Green
