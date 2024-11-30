const formatSwitchBtn = document.querySelector('.format-switch-btn');
const timeDisplay = document.querySelector('.time');
let is24HourFormat = false;

// 初始化按钮文本
formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';

formatSwitchBtn.addEventListener('click', function () {
    is24HourFormat = !is24HourFormat;
    formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';
    updateClock(); // 切换格式后立即更新显示
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
   

    if (hourElement && minuteElement && secondElement && periodElement) {
        hourElement.textContent = displayHours;
        minuteElement.textContent = displayMinutes;
        secondElement.textContent = displaySeconds;
        periodElement.textContent = is24HourFormat ? '' : period;
    }
}


setInterval(updateClock, 1000);

updateClock();
