let timerDuration = 25 * 60; // Default 25 minutes in seconds
let timerInterval;

document.getElementById('start').addEventListener('click', () => {
    const minutes = parseInt(document.getElementById('minutes').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }
    timerDuration = minutes * 60; // Convert to seconds
    document.getElementById('status').innerText = "Timer started for " + minutes + " minutes.";
    updateDueTime(timerDuration); // Update display time
    timerInterval = setInterval(() => {
        timerDuration--;
        updateDueTime(timerDuration); // Update display every second
        if (timerDuration <= 0) {
            clearInterval(timerInterval);
            document.getElementById('status').innerText = "Time's up!";
        }
    }, 1000);
});

document.getElementById('stop').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('status').innerText = "Timer stopped.";
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval); // Stop the timer
    timerDuration = 25 * 60; // Reset to 25 minutes
    document.getElementById('status').innerText = "Timer reset.";
    updateDueTime(timerDuration); // Reset display time
});

// Function to update due time display
function updateDueTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('dueTime').innerText = `Due Time: ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
