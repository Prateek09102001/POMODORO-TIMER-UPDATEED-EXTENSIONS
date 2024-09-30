let seconds = 30 * 60;
let timerIsRunning = false;

chrome.alarms.onAlarm.addListener((alarm) => {
    if(!timerIsRunning) return ;
    seconds--;

    const dueMin = Math.floor(seconds / 60) + "M";
    chrome.action.setBadgeText(
        {
            text: dueMin,
        },
        () => { }
    );

    if (seconds <= 0) {
        clearAlarm("pomodoro-timer");
        createNotification("Well done you focused well, take a break. ");
        chrome.contextMenus.update("start-timer", {
            title: "Start Timer",
            contexts: ["all"]
        });
        chrome.action.setBadgeText(
            {
                text: "-",
            },
            () => { }
        );
        chrome.action.setBadgeBackgroundColor(
            { color: [255, 0, 0, 255] },  // Green with full opacity
            () => {}
        );
    }
});

function createAlarm(name) {
    chrome.alarms.create(name, {
        periodInMinutes: 1 / 60,  // Trigger every second
    });
}

function createNotification(message) {
    const opt = {
        type: 'list',
        title: "Pomodoro Timer",
        message,
        items: [{ title: "Pomodoro Timer", message: message }],
        iconUrl: 'icons/logo-32.png'
    };

    chrome.notifications.create(opt);

}

function clearAlarm(name) {
    chrome.alarms.clear(name, (wasCleared) => {
        console.log(wasCleared);
    });
}

chrome.contextMenus.create({
    id: "start-timer",
    title: "Start Timer",
    contexts: ["all"]
});

// Reset Timer Menu
chrome.contextMenus.create({
    id: "reset-timer",
    title: "Reset Timer",
    contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "start-timer":
            if (timerIsRunning) {
                // clearAlarm("pomodoro-timer");
                createNotification("Your Timer has Stopped");
                chrome.action.setBadgeText(
                    {
                        text: "STOP",
                    },
                    () => { }
                );
                chrome.action.setBadgeBackgroundColor(
                    { color: [255, 255, 0, 255] },  // Yellow with full opacity
                    () => {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        }
                    }
                );
                chrome.contextMenus.update("start-timer", {
                    title: "Start Timer",
                    contexts: ["all"]
                });
                timerIsRunning = false;
                return;
            }

            seconds = seconds <= 0 ? 30 * 60 : seconds;
            createNotification("Your Timer has Started");
            timerIsRunning = true;
            chrome.action.setBadgeBackgroundColor(
                { color: [255, 0, 0, 255] },  // Green with full opacity
                () => {}
            );
            createAlarm("pomodoro-timer");
            chrome.contextMenus.update("start-timer", {
                title: "Stop Timer",
                contexts: ["all"]
            });
            break;

        case "reset-timer":
            chrome.contextMenus.update("start-timer", {
                title: "Start Timer",
                contexts: ["all"]
            });
            clearAlarm("pomodoro-timer");
            chrome.action.setBadgeText(
                {
                    text: "RESET",
                },
                () => { }
            );
            chrome.action.setBadgeBackgroundColor(
                { color: [0, 0, 255, 255] },  // Blue with full opacity
                () => {}
            );
            createNotification("Your Timer has been reset");
            timerIsRunning = false;
            seconds = 0;
            break;

        default:
            break;
    }
});

chrome.action.setBadgeBackgroundColor(
    { color: [0, 255, 0, 255] },  // Green with full opacity
    () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        }
    }
);
