let timerDuration = 0; // Duration in seconds

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startTimer") {
        timerDuration = request.duration; // Set timer duration from request
        chrome.alarms.create("pomodoroTimer", { periodInMinutes: 1 / 60 }); // Trigger every second
    }
    if (request.action === "stopTimer") {
        chrome.alarms.clear("pomodoroTimer");
    }
    if (request.action === "resetTimer") {
        timerDuration = 0; // Reset timer duration
        chrome.alarms.clear("pomodoroTimer");
    }
});

chrome.alarms.onAlarm.addListener(() => {
    if (timerDuration > 0) {
        timerDuration--;
        // Send update to the popup
        chrome.runtime.sendMessage({ action: "updateTimer" });
    } else {
        chrome.alarms.clear("pomodoroTimer"); // Clear the alarm if time's up
        createNotification("Well done you focused well, take a break.");
    }
});
