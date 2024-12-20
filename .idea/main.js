let countdown_timer;
let remaining_work_time = 25 * 60;
let remaining_break_time = 2 * 60;
let previous_work_interval;
let previous_break_interval;
let completed_sessions = 0;
let session_type = "work";

var countdown = document.getElementById("countdown");
const start_text = document.getElementsByClassName("start-text")[0];
const start_button = document.getElementById("start-button");
const restart_button = document.getElementById("restart-button");
const secret_images = document.getElementsByClassName("secret-images");
const good_job_text = document.getElementsByClassName("good-job-text");
var audio = document.getElementById('myAudio');
const sessions_text = document.getElementsByClassName("sessions-text")[0];
const session_type_texts = document.getElementsByClassName("session-type-text");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

audio.addEventListener("ended", function () {
    hideImagesAndText();
    startBreakSession();
});

function start_timer() {
    audio.pause();
    audio.currentTime = 0;
    countdown.disabled = true;
    start_button.style.display = "none";
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

        if (session_type === "work") {
            start_text.textContent = "Time to work :)";
            restart_button.style.display = "block";
            remaining_work_time = minutes * 60 + seconds;
            previous_work_interval = remaining_work_time;
            highlightWorkSession();
        } else {
            remaining_break_time = minutes * 60 + seconds;
            previous_break_interval = remaining_break_time;
            highlightBreakSession();
        }
        countdown_timer = setInterval(updateCountdown, 1000);

    } catch (error) {
        alert("Error: " + error.message);
        resetElementsWorkSession();
        hideImagesAndText();
    }
}

function updateCountdown() {
    if(session_type === "work") {

        if (remaining_work_time <= 0) {
            session_type = "break";
            highlightBreakSession();
            clearInterval(countdown_timer);
            resetElementsBreakSession();
            completed_sessions++;
            audio.play();
            showImagesAndText();
            return;
        } else {
            var minutes = Math.floor(remaining_work_time / 60);
            var seconds = remaining_work_time % 60;
            var minutesString = formatTime(minutes);
            var secondsString = formatTime(seconds);
            countdown.value = minutesString + ":" + secondsString;
            remaining_work_time--;
        }
    }else{
        if (remaining_break_time <= 0) {
            session_type = "work";
            highlightWorkSession();
            clearInterval(countdown_timer);
            resetElementsWorkSession();
            return;
        } else {
            var minutes = Math.floor(remaining_break_time / 60);
            var seconds = remaining_break_time % 60;
            var minutesString = formatTime(minutes);
            var secondsString = formatTime(seconds);
            countdown.value = minutesString + ":" + secondsString;
            remaining_break_time--;
        }
    }
}

function formatTime(time) {
    if (time < 10) {
        return "0" + time;
    }
    return time.toString();
}

function restart_timer() {
    if (session_type === "work") {
        clearInterval(countdown_timer);
        remaining_work_time = previous_work_interval;
        var minutes = Math.floor(remaining_work_time / 60);
        var seconds = remaining_work_time % 60;
        var minutesString = formatTime(minutes);
        var secondsString = formatTime(seconds);
        countdown.value = minutesString + ":" + secondsString;
        countdown_timer = setInterval(updateCountdown, 1000);
    }
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

function resetElementsWorkSession() {
    countdown.disabled = false;
    sessions_text.textContent = "You have completed " + completed_sessions + " sessions";
    start_button.style.display = "block";
    restart_button.style.display = "none";
    var minutes = Math.floor(remaining_work_time / 60);
    var seconds = remaining_work_time % 60;
    var minutesString = formatTime(minutes);
    var secondsString = formatTime(seconds);
    countdown.value = minutesString + ":" + secondsString;
}

function resetElementsBreakSession(){
    countdown.disabled = false;
    restart_button.style.display = "none";
    var minutes = Math.floor(remaining_break_time / 60);
    var seconds = remaining_break_time % 60;
    var minutesString = formatTime(minutes);
    var secondsString = formatTime(seconds);
    countdown.value = minutesString + ":" + secondsString;
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

function highlightWorkSession() {
    session_type_texts[0].style.color = "rgb(46, 46, 46)";
    line1.style.backgroundColor = "rgb(46, 46, 46)";
    session_type_texts[1].style.color = "rgb(166, 166, 166)";
    line2.style.backgroundColor = "rgb(166, 166, 166)";
    start_text.textContent = "Start countdown";
}

function highlightBreakSession() {
    session_type_texts[1].style.color = "rgb(46, 46, 46)";
    line2.style.backgroundColor = "rgb(46, 46, 46)";
    session_type_texts[0].style.color = "rgb(166, 166, 166)";
    line1.style.backgroundColor = "rgb(166, 166, 166)";
    start_text.textContent = "Take a rest";
}

function startBreakSession(){
    start_button.style.display = "block";
    start_timer();
}