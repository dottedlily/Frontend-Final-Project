let countdownTimer;
let remainingTime = 25 * 60;

function start_timer() {
    const start_text = document.getElementsByClassName("start-text")[0];
    start_text.textContent = "Time to work :)";
    const start_button = document.getElementById("start-button");
    start_button.style.display = "none";
    const restart_button = document.getElementById("restart-button");
    restart_button.style.display = "block";
    const countdown_button = document.getElementById("countdown-button");
    countdown_button.style.display = "block";
    const secret_images = document.getElementsByClassName("secret-images");
    secret_images[0].style.display = "none";
    secret_images[1].style.display = "none";
    const good_job_text = document.getElementsByClassName("good-job-text");
    good_job_text[0].style.display = "none";
    good_job_text[1].style.display = "none";
    countdownTimer = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    if (remainingTime <= 0) {
        clearInterval(countdownTimer);
        var audio = document.getElementById('myAudio');
        audio.play();
        const secret_images = document.getElementsByClassName("secret-images");
        secret_images[0].style.display = "block";
        secret_images[1].style.display = "block";
        const good_job_text = document.getElementsByClassName("good-job-text");
        good_job_text[0].style.display = "block";
        good_job_text[1].style.display = "block";
        const start_text = document.getElementsByClassName("start-text")[0];
        start_text.textContent = "Start the countdown";
        const start_button = document.getElementById("start-button");
        start_button.style.display = "block";
        const restart_button = document.getElementById("restart-button");
        restart_button.style.display = "none";
        const countdown_button = document.getElementById("countdown-button");
        countdown_button.style.display = "none";
        return;
    }
    var countdown_button = document.getElementById("countdown-button");
    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;
    var minutesString = formatTime(minutes);
    var secondsString = formatTime(seconds);

    countdown_button.textContent = minutesString + ":" + secondsString;
    remainingTime--;
}

function formatTime(time) {
    if (time < 10) {
        return "0" + time;
    }
    return time.toString();
}

function restart_timer() {
    clearInterval(countdownTimer);
    remainingTime = 25 * 60;
    countdownTimer = setInterval(updateCountdown, 1000);
    const countdown_button = document.getElementById("countdown-button");
    countdown_button.textContent = "24:59";
}
