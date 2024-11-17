const formatSwitchBtn = document.querySelector('.format-switch-btn');
const timeDisplay = document.querySelector('.time');
let is24HourFormat = false;

formatSwitchBtn.addEventListener('click', function() {
    is24HourFormat = !is24HourFormat;
    formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';
    updateClock();
});

function updateClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';

    const displayHours = is24HourFormat ? hours : (hours % 12) || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    const hourElement = document.querySelector('.hours');
    const minuteElement = document.querySelector('.minutes');
    const secondElement = document.querySelector('.seconds');
    const periodElement = document.querySelector('.period');

    hourElement.textContent = displayHours;
    minuteElement.textContent = displayMinutes;
    secondElement.textContent = displaySeconds;
    periodElement.textContent = is24HourFormat ? '' : period;

    requestAnimationFrame(updateClock);
}

updateClock();
