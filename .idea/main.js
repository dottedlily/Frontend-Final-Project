let countdown_timer;
let remaining_time = 2;
let completed_sessions = 0;
let previous_interval = 2;

var countdown = document.getElementById("countdown");
const start_text = document.getElementsByClassName("start-text")[0];
const start_button = document.getElementById("start-button");
const restart_button = document.getElementById("restart-button");
const secret_images = document.getElementsByClassName("secret-images");
const good_job_text = document.getElementsByClassName("good-job-text");
var audio = document.getElementById('myAudio');
const sessions_text = document.getElementsByClassName("sessions-text")[0];

audio.addEventListener("ended", function () {
    hideImagesAndText();
});

function start_timer() {
    audio.pause();
    audio.currentTime = 0;
    countdown.disabled = true;
    start_text.textContent = "Time to work :)";
    start_button.style.display = "none";
    restart_button.style.display = "block";
    hideImagesAndText();

    try {
        const time = countdown.value.split(":");

        if (time.length !== 2) {
            throw new Error("Invalid time format. Please use the format mm:ss.");
        }
        let minutes = parseInt(time[0]);
        let seconds = parseInt(time[1]);

        if (isNaN(minutes) || isNaN(seconds) || minutes > 59 || seconds > 59 || time[0].length > 2 || time[1].length > 2) {
            throw new Error("Invalid time format. Please use the format mm:ss.");
        }

        remaining_time = minutes * 60 + seconds;
        previous_interval = remaining_time;
        countdown_timer = setInterval(updateCountdown, 1000);

    } catch (error) {
        alert("Error: " + error.message);
        resetElements();
        hideImagesAndText();
    }
}

function updateCountdown() {
    if (remaining_time <= 0) {
        clearInterval(countdown_timer);
        completed_sessions++;
        audio.play();
        resetElements();
        showImagesAndText();
        return;
    } else {
        var minutes = Math.floor(remaining_time / 60);
        var seconds = remaining_time % 60;
        var minutesString = formatTime(minutes);
        var secondsString = formatTime(seconds);
        countdown.value = minutesString + ":" + secondsString;
        remaining_time--;
    }
}

function formatTime(time) {
    if (time < 10) {
        return "0" + time;
    }
    return time.toString();
}

function restart_timer() {
    clearInterval(countdown_timer);
    remaining_time = previous_interval;
    var minutes = Math.floor(remaining_time / 60);
    var seconds = remaining_time % 60;
    var minutesString = formatTime(minutes);
    var secondsString = formatTime(seconds);
    countdown.value = minutesString + ":" + secondsString;
    countdown_timer = setInterval(updateCountdown, 1000);
}

countdown.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    } if (
        !(event.key >= "0" && event.key <= "9" ||
            event.key === ":" ||
            event.key === "Backspace" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "Tab")) {
        event.preventDefault();
    }
});

function resetElements() {
    countdown.disabled = false;
    start_text.textContent = "Start countdown";
    sessions_text.textContent = "You have completed " + completed_sessions + " sessions";
    start_button.style.display = "block";
    restart_button.style.display = "none";
    countdown.value = "25:00";
}

function showImagesAndText() {
    secret_images[0].style.display = "block";
    secret_images[1].style.display = "block";
    good_job_text[0].style.display = "block";
    good_job_text[1].style.display = "block";
}

function hideImagesAndText() {
    secret_images[0].style.display = "none";
    secret_images[1].style.display = "none";
    secret_images[0].currentTime = 0;
    secret_images[1].currentTime = 0;
    good_job_text[0].style.display = "none";
    good_job_text[1].style.display = "none";
}
