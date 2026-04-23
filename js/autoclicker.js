class DiplomaAutoclicker {
    constructor() {
        this.isRunning = false;
        this.mode = 'slow';
        this.charCount = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.currentText = '';
        this.totalClicks = 0;
        this.currentDiploma = 1;
        this.diplomaCompleted = false;
        
        this.diplomas = [
            { number: 1, pages: 50, charsNeeded: 50 * 2500, name: 'Бакалаврская работа' },
            { number: 2, pages: 100, charsNeeded: 100 * 2500, name: 'Магистерская диссертация' },
            { number: 3, pages: 150, charsNeeded: 150 * 2500, name: 'Кандидатская диссертация' },
            { number: 4, pages: 200, charsNeeded: 200 * 2500, name: 'Докторская диссертация' },
            { number: 5, pages: 250, charsNeeded: 250 * 2500, name: 'Монография' },
            { number: 6, pages: 300, charsNeeded: 300 * 2500, name: 'Великий трактат' },
        ];
        
        this.phrases = [
            'В данной работе рассматривается ',
            'Актуальность темы обусловлена ',
            'Следует отметить, что ',
            'Необходимо подчеркнуть, что ',
            'Важно понимать, что ',
            'Как показывает практика, ',
            'По мнению экспертов, ',
            'Согласно статистике, ',
            'Вопреки распространённому мнению, ',
            'Принимая во внимание вышесказанное, ',
            'Таким образом, можно сделать вывод о том, что ',
            'В ходе исследования было выявлено, что ',
            'Анализируя полученные данные, можно утверждать, что ',
            'Результаты исследования показывают, что ',
            'Сравнительный анализ демонстрирует, что ',
            'Практическая значимость работы заключается в том, что ',
            'Теоретическая основа исследования базируется на ',
            'Данная гипотеза подтверждается многочисленными ',
            'Научная новизна заключается в ',
            'Эмпирическая база исследования включает ',
            'Глава 1 посвящена теоретическим аспектам ',
            'Глава 2 раскрывает практическую часть ',
            'Глава 3 содержит анализ и рекомендации по ',
            'В заключении хотелось бы отметить, что ',
            'В приложении представлены графики, таблицы и ',
            'Список литературы включает источники по ',
            'Объектом исследования является ',
            'Предмет исследования представляет собой ',
            'Цель данной работы состоит в ',
            'Для достижения цели необходимо решить следующие задачи: ',
            'Положения, выносимые на защиту: ',
            'Методология исследования основана на ',
            'Структура работы обусловлена логикой ',
            'Хочется верить, что научный руководитель поверит в ',
            'Особую благодарность хочется выразить кофе и ',
            'Ключевые слова: диплом, дедлайн, паника, кофе, ',
            'Данная проблема требует дальнейшего изучения, но не сегодня ',
            'Можно предположить, что после дедлайна будет легче, но ',
            'На защите хотелось бы сказать, что ',
            'Если научрук спросит про этот абзац, я скажу что ',
            'К сожалению, объём работы не позволяет раскрыть ',
            'В рамках данной работы невозможно охватить ',
            'Тема раскрыта недостаточно полно ввиду ',
            'Безусловно, данная тема является крайне актуальной в современных условиях ',
            'Не вызывает сомнений тот факт, что ',
            'Общеизвестно, что ',
            'Многие учёные сходятся во мнении, что ',
            'Трудно переоценить значение ',
            'На сегодняшний день проблема стоит особенно остро ',
            'В эпоху цифровизации и глобализации ',
            'Современные реалии диктуют необходимость ',
            'В условиях нестабильной экономической ситуации ',
            'Учитывая современные тенденции развития ',
        ];
        
        this.smartWords = [
            'безусловно', 'очевидно', 'вероятно', 'несомненно',
            'целесообразно', 'правомерно', 'закономерно', 'существенно',
            'принципиально', 'фундаментально', 'методологически',
            'гипотетически', 'эмпирически', 'теоретически',
            'парадигма', 'концепция', 'методология', 'систематизация',
            'оптимизация', 'модернизация', 'трансформация', 'интеграция',
            'дифференциация', 'верификация', 'валидация', 'апробация',
            'экстраполяция', 'интерполяция', 'корреляция', 'детерминация',
            'идентификация', 'классификация', 'структуризация', 'алгоритмизация',
            'автоматизация', 'роботизация', 'цифровизация', 'глобализация',
            'стандартизация', 'унификация', 'гармонизация', 'синхронизация',
        ];
        
        this.actions = [
            'Печатаю...',
            'Думаю...',
            'Исправляю ошибки...',
            'Пью кофе ☕',
            'Смотрю в окно 🤔',
            'Форматирую текст...',
            'Ищу источники...',
            'Паникую...',
            'Звоню научруку...',
            'Гуглю "как написать диплом за ночь"',
            'Смотрю лекции на 2x скорости...',
            'Завидую тем, кто уже сдал...',
            'Считаю сколько страниц осталось...',
            'Придумываю отмазки для научрука...',
            'Листаю мемы про диплом...',
        ];
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTimer();
        this.updateStatus();
        this.updateModeButtons();
    }
    
    stop() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.updateStatus();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').textContent = this.formatTime(this.timer);
            this.updateProgress();
        }, 1000);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    addWordManually() {
        if (!this.isRunning || this.diplomaCompleted) return;
        
        this.totalClicks++;
        this.checkModeUnlocks();
        
        if (Math.random() < 0.2 && this.currentText.length > 0) {
            this.deleteText();
        } else {
            this.addText();
        }
        
        this.checkDiplomaCompletion();
        
        this.updateStats();
        document.getElementById('totalClicks').textContent = this.totalClicks;
    }
    
    checkDiplomaCompletion() {
        const currentDiplomaData = this.diplomas[this.currentDiploma - 1];
        
        if (this.charCount >= currentDiplomaData.charsNeeded && !this.diplomaCompleted) {
            if (this.currentDiploma < 6) {
                this.currentDiploma++;
                this.currentText = '';
                this.charCount = 0;
                document.getElementById('textContent').textContent = '';
                this.showDiplomaNotification();
            } else {
                this.diplomaCompleted = true;
                this.stop();
                this.showFinalNotification();
            }
        }
    }
    
    showDiplomaNotification() {
        const diploma = this.diplomas[this.currentDiploma - 1];
        const notification = document.getElementById('notification');
        notification.innerHTML = `🎓 Диплом ${this.currentDiploma - 1} готов!<br>Начинаем: ${diploma.name}<br>Цель: ${diploma.pages} страниц`;
        notification.style.background = '#ff6b6b';
        notification.style.color = 'white';
        notification.style.fontSize = '1.2em';
        notification.style.textAlign = 'center';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            notification.style.background = '#4ec9b0';
            notification.style.color = '#1e1e1e';
            notification.style.fontSize = '';
            notification.style.textAlign = '';
        }, 5000);
    }
    
    showFinalNotification() {
        document.body.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: #1e1e1e;
                color: #4ec9b0;
                font-family: 'Courier New', monospace;
                text-align: center;
                flex-direction: column;
                padding: 20px;
            ">
                <h1 style="font-size: 3em; margin-bottom: 20px;">🎉🏆🎉</h1>
                <h2 style="font-size: 2em; margin-bottom: 30px;">Поздравляю, твои страдания закончены!</h2>
                <p style="font-size: 1.5em; color: #d4d4d4; margin-bottom: 20px;">Ты написал все 6 дипломов!</p>
                <p style="font-size: 1.2em; color: #808080; margin-bottom: 40px;">
                    50 + 100 + 150 + 200 + 250 + 300 = 1050 страниц научного бреда!
                </p>
                <p style="font-size: 1em; color: #808080;">
                    Всего кликов: ${this.totalClicks}<br>
                    Затрачено времени: ${this.formatTime(this.timer)}
                </p>
                <button onclick="location.reload()" style="
                    margin-top: 40px;
                    padding: 15px 30px;
                    font-size: 1.2em;
                    background: #4ec9b0;
                    color: #1e1e1e;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    font-family: 'Courier New', monospace;
                ">🔄 Написать заново</button>
            </div>
        `;
    }
    
    checkModeUnlocks() {
        const btnNormal = document.getElementById('btn-normal');
        const btnPanic = document.getElementById('btn-panic');
        const normalProgress = document.getElementById('normal-progress');
        const panicProgress = document.getElementById('panic-progress');
        
        if (this.totalClicks < 1000) {
            normalProgress.textContent = this.totalClicks + '/1000';
        }
        
        if (this.totalClicks < 10000) {
            panicProgress.textContent = this.totalClicks + '/10000';
        }
        
        if (this.totalClicks >= 1000 && btnNormal.disabled) {
            btnNormal.disabled = false;
            btnNormal.style.opacity = '1';
            btnNormal.style.cursor = 'pointer';
            btnNormal.title = '';
            btnNormal.innerHTML = '🏃 Нормально<br><small>целая фраза</small>';
            this.showUnlockNotification('🏃 Нормальный режим открыт! (1000 кликов)');
        }
        
        if (this.totalClicks >= 10000 && btnPanic.disabled) {
            btnPanic.disabled = false;
            btnPanic.style.opacity = '1';
            btnPanic.style.cursor = 'pointer';
            btnPanic.title = '';
            btnPanic.innerHTML = '🔥 Паника<br><small>предложение</small>';
            this.showUnlockNotification('🔥 РЕЖИМ ПАНИКИ ОТКРЫТ! (10000 кликов)');
        }
    }
    
    showUnlockNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = '🔓 ' + message;
        notification.classList.add('show');
        notification.style.background = '#ff6b6b';
        notification.style.color = 'white';
        setTimeout(() => {
            notification.classList.remove('show');
            notification.style.background = '#4ec9b0';
            notification.style.color = '#1e1e1e';
        }, 5000);
    }
    
    updateModeButtons() {
        const btnNormal = document.getElementById('btn-normal');
        const btnPanic = document.getElementById('btn-panic');
        
        if (this.totalClicks < 1000) {
            btnNormal.disabled = true;
            btnNormal.style.opacity = '0.5';
            btnNormal.style.cursor = 'not-allowed';
            btnNormal.title = 'Откроется после 1000 кликов';
        }
        
        if (this.totalClicks < 10000) {
            btnPanic.disabled = true;
            btnPanic.style.opacity = '0.5';
            btnPanic.style.cursor = 'not-allowed';
            btnPanic.title = 'Откроется после 10000 кликов';
        }
    }
    
    needCapitalLetter() {
        if (this.currentText.length === 0) return true;
        if (this.currentText.endsWith('. ')) return true;
        if (this.currentText.endsWith('.  ')) return true;
        if (this.currentText.endsWith('.\n\n')) return true;
        if (this.currentText.endsWith('\n\n')) return true;
        if (this.currentText.endsWith('    ')) return true;
        const trimmed = this.currentText.trimEnd();
        if (trimmed.endsWith('.')) return true;
        return false;
    }
    
    startNewParagraph() {
        if (this.currentText.length > 200 && Math.random() < 0.3) {
            if (!this.currentText.endsWith('.\n\n') && !this.currentText.endsWith('\n\n')) {
                this.currentText = this.currentText.trimEnd();
                if (!this.currentText.endsWith('.')) {
                    this.currentText += '.';
                }
                this.currentText += '\n\n    ';
                document.getElementById('currentAction').textContent = 'Начинаю новый абзац...';
                return true;
            }
        }
        return false;
    }
    
    addText() {
        if (this.mode === 'slow') {
            this.addSingleWord();
        } else if (this.mode === 'normal') {
            this.addPhrase();
        } else if (this.mode === 'panic') {
            this.addSentence();
        }
        
        this.charCount = this.currentText.length;
        document.getElementById('textContent').textContent = this.currentText;
        
        const editor = document.getElementById('editor');
        editor.scrollTop = editor.scrollHeight;
    }
    
    addSingleWord() {
        let word;
        if (Math.random() < 0.3) {
            word = this.smartWords[Math.floor(Math.random() * this.smartWords.length)];
        } else {
            const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
            const words = phrase.split(' ');
            word = words[Math.floor(Math.random() * words.length)];
        }
        
        let punctuation = '';
        if (Math.random() < 0.08 && word.length > 3) {
            punctuation = '.';
        } else if (Math.random() < 0.15) {
            punctuation = ',';
        }
        
        if (this.currentText.length === 0) {
            this.currentText = '    ';
        }
        
        if (this.needCapitalLetter()) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        
        this.currentText += word + punctuation;
        
        if (punctuation === '.') {
            this.currentText += ' ';
            this.startNewParagraph();
        } else {
            this.currentText += ' ';
        }
        
        document.getElementById('currentAction').textContent = this.getRandomAction();
    }
    
    addPhrase() {
        const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        let textToAdd = phrase;
        
        if (this.currentText.length === 0) {
            this.currentText = '    ';
        }
        
        if (this.needCapitalLetter()) {
            textToAdd = phrase.charAt(0).toUpperCase() + phrase.slice(1);
        }
        
        if (Math.random() < 0.2) {
            textToAdd = textToAdd.trimEnd();
            if (!textToAdd.endsWith('.')) {
                textToAdd += '.';
            }
            textToAdd += ' ';
            this.currentText += textToAdd;
            this.startNewParagraph();
        } else {
            this.currentText += textToAdd;
        }
        
        document.getElementById('currentAction').textContent = this.getRandomAction();
    }
    
    addSentence() {
        const numPhrases = Math.floor(Math.random() * 3) + 3;
        let sentence = '';
        
        for (let i = 0; i < numPhrases; i++) {
            const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
            const words = phrase.split(' ');
            const word = words[Math.floor(Math.random() * words.length)];
            sentence += word;
            
            if (i < numPhrases - 1) {
                if (Math.random() < 0.3) sentence += ',';
                sentence += ' ';
            }
        }
        
        if (this.currentText.length === 0) {
            this.currentText = '    ';
        }
        
        if (this.needCapitalLetter()) {
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        }
        
        if (!sentence.endsWith('.')) {
            sentence += '.';
        }
        
        sentence += ' ';
        this.currentText += sentence;
        this.startNewParagraph();
        
        document.getElementById('currentAction').textContent = this.getRandomAction();
    }
    
    deleteText() {
        if (this.currentText.length > 0) {
            const lastSpace = this.currentText.trimEnd().lastIndexOf(' ');
            if (lastSpace > 0) {
                this.currentText = this.currentText.substring(0, lastSpace + 1);
            } else {
                this.currentText = '';
            }
            this.charCount = this.currentText.length;
            document.getElementById('textContent').textContent = this.currentText;
            document.getElementById('currentAction').textContent = 'Исправляю ошибки...';
        }
    }
    
    getRandomAction() {
        return this.actions[Math.floor(Math.random() * this.actions.length)];
    }
    
    updateStats() {
        document.getElementById('charCount').textContent = this.charCount;
        const pages = Math.floor(this.charCount / 2500);
        document.getElementById('pageCount').textContent = pages;
        
        const currentDiploma = this.diplomas[this.currentDiploma - 1];
        document.getElementById('diplomaName').textContent = 
            `📄 Диплом ${this.currentDiploma}/6: ${currentDiploma.name}`;
        document.getElementById('diplomaGoal').textContent = 
            `Цель: ${currentDiploma.pages} стр`;
    }
    
    updateProgress() {
        const currentDiploma = this.diplomas[this.currentDiploma - 1];
        const progress = Math.min(100, Math.floor((this.charCount / currentDiploma.charsNeeded) * 100));
        document.getElementById('progress').textContent = `${progress}% готовности`;
    }
    
    updateStatus() {
        document.getElementById('currentAction').textContent = this.isRunning ? 'Жду кликов...' : 'Остановлено';
    }
    
    setMode(mode) {
        if (mode === 'normal' && this.totalClicks < 1000) {
            showNotification('🔒 Нужно 1000 кликов для открытия!');
            return;
        }
        if (mode === 'panic' && this.totalClicks < 10000) {
            showNotification('🔒 Нужно 10000 кликов для открытия!');
            return;
        }
        
        this.mode = mode;
        const modeNames = { 
            slow: '🐢 Черепаха — 1 слово', 
            normal: '🏃 Нормально — целая фраза', 
            panic: '🔥 Паника — предложение с точкой' 
        };
        showNotification(modeNames[mode]);
    }
    
    reset() {
        this.stop();
        this.currentText = '';
        this.charCount = 0;
        this.timer = 0;
        this.totalClicks = 0;
        this.mode = 'slow';
        this.currentDiploma = 1;
        this.diplomaCompleted = false;
        this.updateStats();
        document.getElementById('textContent').textContent = '';
        document.getElementById('timer').textContent = '00:00';
        document.getElementById('progress').textContent = '0% готовности';
        document.getElementById('totalClicks').textContent = '0';
        
        document.getElementById('btn-normal').disabled = true;
        document.getElementById('btn-normal').style.opacity = '0.5';
        document.getElementById('btn-normal').style.cursor = 'not-allowed';
        document.getElementById('btn-normal').innerHTML = '🔒 Нормально<br><small><span id="normal-progress">0/1000</span></small>';
        
        document.getElementById('btn-panic').disabled = true;
        document.getElementById('btn-panic').style.opacity = '0.5';
        document.getElementById('btn-panic').style.cursor = 'not-allowed';
        document.getElementById('btn-panic').innerHTML = '🔒 Паника<br><small><span id="panic-progress">0/10000</span></small>';
        
        document.getElementById('btn-slow').classList.add('active');
        document.getElementById('btn-normal').classList.remove('active');
        document.getElementById('btn-panic').classList.remove('active');
    }
    
    getState() {
        return {
            text: this.currentText,
            charCount: this.charCount,
            timer: this.timer,
            mode: this.mode,
            totalClicks: this.totalClicks,
            currentDiploma: this.currentDiploma,
        };
    }
    
    loadState(state) {
        this.currentText = state.text || '';
        this.charCount = state.charCount || 0;
        this.timer = state.timer || 0;
        this.mode = state.mode || 'slow';
        this.totalClicks = state.totalClicks || 0;
        this.currentDiploma = state.currentDiploma || 1;
        
        document.getElementById('textContent').textContent = this.currentText;
        document.getElementById('timer').textContent = this.formatTime(this.timer);
        document.getElementById('totalClicks').textContent = this.totalClicks;
        this.updateStats();
        this.updateProgress();
        this.updateModeButtons();
    }
}