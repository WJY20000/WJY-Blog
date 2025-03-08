document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.welcome-modal');
  const closeBtn = document.querySelector('.close-modal');

  // �Զ���ʾ����
  setTimeout(() => {
    modal.style.display = 'block';
  }, 1000); // �ӳ�1����ʾ

  // �ر��߼�
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // ����ⲿ����ر�
  window.addEventListener('click', (e) => {
    if(e.target == modal) {
      modal.style.display = 'none';
    }
  });
});
const audio = document.getElementById('bgm');
let isMuted = false;
const formatSwitchBtn = document.querySelector('.format-switch-btn');
const timeDisplay = document.querySelector('.time');
let is24HourFormat = false;

// ��ʼ����ť�ı�
formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';

formatSwitchBtn.addEventListener('click', function () {
    is24HourFormat = !is24HourFormat;
    formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';
    updateClock(); // �л���ʽ������������ʾ
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
document.addEventListener('click', function initAudio() {
  audio.play().catch(() => {});
  document.removeEventListener('click', initAudio);
});
function toggleAudio() {
  isMuted = !isMuted;
  audio.muted = isMuted;
  document.querySelector('.mute-btn').textContent = isMuted ? '??' : '??';
}