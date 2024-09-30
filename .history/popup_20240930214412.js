let timerDuration = 25 * 60; // Default to 25 minutes (in seconds)
let timerInterval;

// Retrieve the timer duration from storage or set a default
chrome.storage.local.get(['timerDuration'], (result) => {
    if (result.timerDuration && !isNaN(result.timerDuration)) {
        timerDuration = result.timerDuration;
    }
    updateDueTime(timerDuration); // Update the display time (with a default value)
});

// Start button logic
document.getElementById('start').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    timerDuration = minutes * 60; // Convert minutes to seconds
    document.getElementById('status').innerText = "Timer started for " + minutes + " minutes.";
    updateDueTime(timerDuration); // Update display time

    // Send message to background to start the timer
    chrome.runtime.sendMessage({ action: "startTimer", duration: timerDuration });
});

// Stop button logic
document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('status').innerText = "Timer stopped.";
    chrome.runtime.sendMessage({ action: "stopTimer" }); // Notify background
});

// Reset button logic
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    timerDuration = 25 * 60; // Reset to default 25 minutes
    document.getElementById('status').innerText = "Timer reset.";
    updateDueTime(timerDuration); // Reset display time
    chrome.runtime.sendMessage({ action: "resetTimer" }); // Notify background
});

// Function to update due time display
function updateDueTime(seconds) {
    // Validate seconds, if not a valid number, default to 0
    if (isNaN(seconds) || seconds < 0) {
        seconds = 0;
    }

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    // Update the due time display in the format mm:ss
    document.getElementById('dueTime').innerText = `Due Time: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
