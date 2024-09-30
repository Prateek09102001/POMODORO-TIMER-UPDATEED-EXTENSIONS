let timerDuration = 0; // Duration in seconds
let timerInterval; // Reference for the interval

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startTimer") {
        timerDuration = request.duration; // Set timer duration from request
        startTimer();
    }
    if (request.action === "stopTimer") {
        stopTimer();
    }
    if (request.action === "resetTimer") {
        resetTimer();
    }
});

// Start the timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval); // Clear any existing interval
    timerInterval = setInterval(() => {
        if (timerDuration > 0) {
            timerDuration--; // Decrement the duration
            // Send update to the popup
            chrome.runtime.sendMessage({ action: "updateTimer", time: timerDuration });
        } else {
            clearInterval(timerInterval); // Stop the timer when it reaches zero
            createNotification("Well done you focused well, take a break.");
            resetTimer(); // Reset timer
        }
    }, 1000); // Update every second
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Reset the timer
function resetTimer() {
    timerDuration = 0; // Reset timer duration
    clearInterval(timerInterval); // Stop any running timer
}

// Create a notification
function createNotification(message) {
    const opt = {
        type: 'basic',
        title: "Pomodoro Timer",
        message: message,
        iconUrl: 'icons/logo-32.png' // Path to your icon
    };

    chrome.notifications.create(opt);
}
