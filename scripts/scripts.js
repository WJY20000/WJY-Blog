document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.welcome-modal');
  const closeBtn = document.querySelector('.close-modal');

  // 自动显示模态框
  setTimeout(() => {
    modal.style.display = 'block';
  }, 1000); // 延迟1秒显示

  // 关闭逻辑
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // 点击外部关闭
  window.addEventListener('click', (e) => {
    if(e.target == modal) {
      modal.style.display = 'none';
    }
  });

  loadComments(); // 页面加载时加载评论
});

const audio = document.getElementById('bgm');
let isMuted = false;
const formatSwitchBtn = document.querySelector('.format-switch-btn');
const timeDisplay = document.querySelector('.time');
let is24HourFormat = false;

// 初始化按钮文本
formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';

formatSwitchBtn.addEventListener('click', function () {
    is24HourFormat = !is24HourFormat;
    formatSwitchBtn.textContent = is24HourFormat ? '24hr' : '12hr';
    updateClock(); // 切换格式后更新时钟显示
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
  document.querySelector('.mute-btn').textContent = isMuted ? '🔇' : '🎵';
}

document.addEventListener('click', function (e) {
  const floatText = document.createElement('div');
  floatText.textContent = 'Ella ❤';
  floatText.className = 'click-float-text';
  floatText.style.left = `${e.pageX}px`;
  floatText.style.top = `${e.pageY}px`;
  document.body.appendChild(floatText);

  setTimeout(() => {
    floatText.remove();
  }, 2000);
});

function submitComment() {
    const nickname = document.getElementById('nickname').value;
    const comment = document.getElementById('comment').value;
    const commentsDiv = document.getElementById('comments');

    if (nickname && comment) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const nicknameDiv = document.createElement('div');
        nicknameDiv.className = 'nickname';
        nicknameDiv.textContent = nickname;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        const now = new Date();
        timeDiv.textContent = now.toLocaleString();

        const commentTextDiv = document.createElement('div');
        commentTextDiv.className = 'comment-text';
        commentTextDiv.textContent = comment;

        commentDiv.appendChild(nicknameDiv);
        commentDiv.appendChild(timeDiv);
        commentDiv.appendChild(commentTextDiv);

        commentsDiv.appendChild(commentDiv);

        saveComment(nickname, comment, now.toLocaleString()); // 保存评论到本地存储

        // 清空输入框
        document.getElementById('nickname').value = '';
        document.getElementById('comment').value = '';
    } else {
        alert('请输入昵称和评论内容');
    }
}

function saveComment(nickname, comment, time) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ nickname, comment, time });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const commentsDiv = document.getElementById('comments');

    comments.forEach(({ nickname, comment, time }) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const nicknameDiv = document.createElement('div');
        nicknameDiv.className = 'nickname';
        nicknameDiv.textContent = nickname;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        timeDiv.textContent = time;

        const commentTextDiv = document.createElement('div');
        commentTextDiv.className = 'comment-text';
        commentTextDiv.textContent = comment;

        commentDiv.appendChild(nicknameDiv);
        commentDiv.appendChild(timeDiv);
        commentDiv.appendChild(commentTextDiv);

        commentsDiv.appendChild(commentDiv);
    });
}