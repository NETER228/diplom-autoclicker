let autoclicker;

document.addEventListener('DOMContentLoaded', () => {
    autoclicker = new DiplomaAutoclicker();
    
    loadFromSupabase().then(state => {
        if (state) {
            autoclicker.loadState(state);
        }
    });
    
    autoclicker.updateModeButtons();
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && autoclicker.isRunning) {
            e.preventDefault();
            autoclicker.addWordManually();
            animateClickButton();
        }
    });
});

function toggleAutoclicker() {
    const btn = document.getElementById('btnToggle');
    const clickBtn = document.getElementById('btnClick');
    
    if (autoclicker.isRunning) {
        autoclicker.stop();
        btn.textContent = '▶️ Запустить кликер';
        btn.style.background = '#4ec9b0';
        clickBtn.disabled = true;
        clickBtn.style.opacity = '0.5';
    } else {
        autoclicker.start();
        btn.textContent = '⏸️ Остановить';
        btn.style.background = '#ff6b6b';
        clickBtn.disabled = false;
        clickBtn.style.opacity = '1';
    }
}

function clickWord() {
    if (autoclicker.isRunning) {
        autoclicker.addWordManually();
        animateClickButton();
    }
}

function animateClickButton() {
    const btn = document.getElementById('btnClick');
    btn.style.transform = 'scale(0.9)';
    btn.style.background = '#ff6b6b';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.style.background = '#4ec9b0';
    }, 100);
}

function setMode(mode) {
    if (autoclicker && autoclicker.isRunning) {
        autoclicker.setMode(mode);
    } else {
        autoclicker.mode = mode;
        const modeNames = { 
            slow: '🐢 Черепаха — 1 слово', 
            normal: '🏃 Нормально — целая фраза', 
            panic: '🔥 Паника — предложение с точкой' 
        };
        showNotification(modeNames[mode]);
    }
    
    const modes = ['slow', 'normal', 'panic'];
    modes.forEach(m => {
        const btn = document.getElementById(`btn-${m}`);
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${mode}`).classList.add('active');
}

async function saveProgress() {
    const state = autoclicker.getState();
    await saveToSupabase(state);
}

async function resetProgress() {
    if (confirm('Точно сбросить весь прогресс? Диплом будет безвозвратно утерян!')) {
        autoclicker.reset();
        await saveToSupabase({ text: '', charCount: 0, timer: 0, mode: 'slow', totalClicks: 0 });
        showNotification('🔄 Прогресс сброшен. Начинаем заново!');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification._timeout) clearTimeout(notification._timeout);
    notification.textContent = message;
    notification.classList.add('show');
    notification._timeout = setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

setInterval(() => {
    if (autoclicker && autoclicker.isRunning) {
        saveProgress();
    }
}, 30000);
