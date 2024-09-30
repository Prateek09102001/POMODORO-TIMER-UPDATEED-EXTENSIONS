# Pomodoro Timer Chrome Extension

A simple, customizable Pomodoro Timer Chrome extension that helps users stay productive by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks. This extension allows you to start, stop, and reset a 30-minute timer by default, or set a custom duration.

## Features

- **Start, Stop, and Reset** timer functionality
- **Customizable Timer**: Enter your own time in minutes
- **Persistent State**: Timer continues running even if the popup is closed, and resumes when opened again
- **Due Time Display**: Shows remaining time in both the header and below the buttons

## How to Install

1. **Clone or Download the Repository**:  
   Clone this repository to your local machine or download it as a ZIP and extract it.

    ```bash
    git clone https://github.com/your-repo/pomodoro-timer-extension.git
    cd pomodoro-timer-extension
    ```

2. **Load Extension in Chrome**:
    - Open Google Chrome and navigate to `chrome://extensions/`.
    - Enable **Developer mode** by toggling the switch in the top right corner.
    - Click the **Load unpacked** button and select the folder where you downloaded or cloned this repository.

3. **Use the Extension**:
    - After loading the extension, click on the Pomodoro Timer icon in the Chrome toolbar.
    - You can start the timer with the default 30 minutes, or enter your own time in minutes.
    - The **Stop**, **Reset**, and **Due Time** will appear in the popup.
  
## How to Use

- **Start Timer**: Click the **Start** button to initiate the Pomodoro timer.
- **Stop Timer**: Press the **Stop** button to pause the countdown.
- **Reset Timer**: Hit the **Reset** button to reset the timer back to 30 minutes.
- **Custom Timer**: Enter the number of minutes in the input field and click **Start** to set a custom timer.

### Screenshots

#### Popup View
![image](https://github.com/user-attachments/assets/68ba69c4-c7e0-451d-b32a-be03157256b3)
![image](https://github.com/user-attachments/assets/2673235f-545a-46db-82a1-d25e85dd76ae)



### Components

- **popup.html**: Defines the layout of the popup, including buttons and time display.
- **style.css**: Contains styles to make the interface look neat and centered.
- **popup.js**: Handles the logic for the timer, updating the due time, and controlling start/stop/reset functionality.
- **background.js**: Handles persistent storage of timer state when the popup is closed.

## Project Structure

The following is the structure of the Pomodoro Timer extension:

- **pomodoro-timer-extension/**
  - **icons/**
    - `logo-32.png`
  - `popup.html`
  - `style.css`
  - `popup.js`
  - `background.js`
  - `manifest.json`



## Notes

- The extension defaults to a **30-minute timer**.
- The timer **persists** if you close the popup and will show the correct remaining time when reopened.
- Custom time entries can be made by entering the number of minutes in the input field and clicking **Start**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to reach out.

