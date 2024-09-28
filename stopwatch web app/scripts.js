let startTime, elapsedTime = 0, timerInterval;
let lapCount = 0;

// Format time with milliseconds
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Print time to the screen
function print(txt) {
    document.getElementById("time-display").innerHTML = txt;
}

// Start the stopwatch
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10); // Update every 10ms for milliseconds
    showButton("STOP");
    document.getElementById("lap-btn").disabled = false;
}

// Stop the stopwatch
function stop() {
    clearInterval(timerInterval);
    showButton("RESET");
    document.getElementById("lap-btn").disabled = true;
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    print("00:00:00:000");
    elapsedTime = 0;
    lapCount = 0;
    document.getElementById("lap-times").innerHTML = ""; // Clear lap times
    showButton("START");
    document.getElementById("lap-btn").disabled = true;
}

// Capture a lap time
function lap() {
    lapCount++;
    let lapTime = timeToString(elapsedTime);
    let lapElement = document.createElement("p");
    lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
    document.getElementById("lap-times").appendChild(lapElement);
}

// Show buttons based on state
function showButton(buttonKey) {
    const startBtn = document.getElementById("start-btn");
    const stopBtn = document.getElementById("stop-btn");
    const resetBtn = document.getElementById("reset-btn");

    if (buttonKey === "START") {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
    } else if (buttonKey === "STOP") {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
    } else if (buttonKey === "RESET") {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
    }
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", start);
document.getElementById("stop-btn").addEventListener("click", stop);
document.getElementById("reset-btn").addEventListener("click", reset);
document.getElementById("lap-btn").addEventListener("click", lap);
