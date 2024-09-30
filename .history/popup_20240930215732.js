let timerDuration = 25 * 60; // Default 25 minutes in seconds
let timerInterval;
let remainingTime = timerDuration;
let isRunning = false;

// Initialize due time when the popup is opened
chrome.storage.local.get(['remainingTime', 'isRunning'], (result) => {
    if (result.remainingTime) {
        remainingTime = result.remainingTime;
    }
    if (result.isRunning) {
        isRunning = result.isRunning;
        startTimer();
    }
    updateDueTime(remainingTime);
});

// Start button functionality
document.getElementById('start').addEventListener('click', () => {
    if (isRunning) return; // Prevent starting multiple timers

    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    
    timerDuration = minutes * 60;
    remainingTime = timerDuration;
    updateDueTime(remainingTime);
    startTimer();
    chrome.storage.local.set({ remainingTime, isRunning: true });
});

// Stop button functionality
document.getElementById('stop').addEventListener('click', () => {
    if (!isRunning) return; // Only stop if a timer is running
    clearInterval(timerInterval);
    isRunning = false;
    chrome.storage.local.set({ isRunning: false });
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerDuration = 25 * 60;
    remainingTime = timerDuration;
    isRunning = false;
    updateDueTime(remainingTime);
    chrome.storage.local.set({ remainingTime, isRunning: false });
});

// Function to start the timer
function startTimer() {
    isRunning = true;
    timerInterval = setInterval(() => {
        remainingTime--;
        updateDueTime(remainingTime);
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alert("Time's up! Take a break.");
            chrome.storage.local.set({ isRunning: false });
        }
        
        chrome.storage.local.set({ remainingTime });
    }, 1000); // 1 second interval
}

// Function to update due time display in both locations
function updateDueTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedTime = `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    
    document.getElementById('dueTimeTop').innerText = `Due Time: ${formattedTime}`;
    document.getElementById('dueTimeBottom').innerText = `Remaining Time: ${formattedTime}`;
}
