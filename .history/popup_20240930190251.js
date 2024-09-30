let timerDuration = 25 * 60; // Default 25 minutes in seconds
let timerInterval;

document.getElementById('start').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    timerDuration = minutes * 60; // Convert to seconds
    chrome.storage.local.set({ timerDuration }, () => {
        chrome.runtime.sendMessage({ action: "startTimer" });
        document.getElementById('status').innerText = "Timer started for " + minutes + " minutes.";
        updateDueTime(timerDuration); // Update display time
        window.close(); // Close the popup
    });
});

document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "stopTimer" });
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('status').innerText = "Timer stopped.";
    window.close(); // Close the popup
});

document.getElementById('reset').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('status').innerText = "Timer reset.";
    document.getElementById('dueTime').innerText = "Due Time: 25:00"; // Reset display time
    window.close(); // Close the popup
});

// Function to update due time display
function updateDueTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('dueTime').innerText = `Due Time: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Listen for timer updates from the background script
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "updateTimer") {
        timerDuration--;
        updateDueTime(timerDuration);
        if (timerDuration <= 0) {
            clearInterval(timerInterval); // Stop the interval when time is up
            document.getElementById('status').innerText = "Time's up!";
        }
    }
});
