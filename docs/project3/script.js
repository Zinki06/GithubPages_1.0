// 설정은 config.js에서 관리됩니다

class JavaScriptMidtermTest {
    constructor() {
        // 외부 파일에서 문제 데이터 가져오기
        this.questions = QUESTIONS;
        
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.questionTimers = [];
        this.currentQuestionTimer = null;
        this.testResults = [];
        this.currentHintLevel = 1; // 현재 힌트 단계 추가
        
        // 자동 저장 관련 속성
        this.autoSaveTimer = null;
        this.saveIndicator = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showScreen('start');
        
        // 라이브러리 로딩 상태 확인
        this.checkLibraries();
    }
    
    checkLibraries() {
        // 라이브러리 로딩 상태 확인 (프로덕션에서는 console.log 제거)
        if (typeof window.jspdf === 'undefined') {
            console.warn('jsPDF 라이브러리가 로드되지 않았습니다. PDF 생성 기능이 작동하지 않을 수 있습니다.');
        }
    }
    
    bindEvents() {
        document.getElementById('start-test-btn').addEventListener('click', () => this.startTest());
        document.getElementById('start-btn').addEventListener('click', () => this.startTest()); // 추가된 start-btn 이벤트
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitTest());
        document.getElementById('review-btn').addEventListener('click', () => this.showReview());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartTest());
        document.getElementById('close-review-btn').addEventListener('click', () => this.closeReview());
        document.getElementById('save-result-btn').addEventListener('click', () => this.generateResultPDF());
        
        // 새로운 이벤트 바인딩
        document.getElementById('run-code-btn').addEventListener('click', () => this.runCode());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('close-hint-btn').addEventListener('click', () => this.closeHint());
        
        // 실시간 자동 저장 이벤트 바인딩
        document.getElementById('code-editor').addEventListener('input', () => this.autoSaveCode());
    }
    
    startTest() {
        // 로컬 스토리지에서 진행 상황 복원 시도
        const savedData = this.loadFromLocalStorage();
        if (savedData && confirm('이전에 진행하던 테스트가 있습니다. 계속 진행하시겠습니까?')) {
            this.currentQuestionIndex = savedData.currentQuestionIndex;
            this.userAnswers = savedData.userAnswers;
            this.startTime = new Date(savedData.startTime);
        } else {
            this.startTime = new Date();
            this.userAnswers = new Array(this.questions.length).fill(null);
            this.currentQuestionIndex = 0;
            // 새로 시작하므로 로컬 스토리지 초기화
            localStorage.removeItem('javascriptMidtermProgress');
        }
        
        this.startTimer();
        this.showQuestion();
        this.showScreen('question');
        this.updateNavigation();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            const elapsed = new Date() - this.startTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            document.getElementById('timer').textContent = 
                `⏱️ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, CONFIG.TIMING.TIMER_UPDATE_INTERVAL);
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // 힌트 단계 초기화
        this.currentHintLevel = 1;
        
        // 기본 정보 설정
        document.getElementById('question-number').textContent = `문제 ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-category').textContent = question.category;
        document.getElementById('question-difficulty').textContent = question.difficulty;
        document.getElementById('question-title').textContent = question.title;
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('question-description').textContent = question.description;
        
        // 문제별 타이머 시작
        this.startQuestionTimer(question.timeLimit);
        
        // 코드 에디터 설정
        const codeEditor = document.getElementById('code-editor');
        codeEditor.value = this.userAnswers[this.currentQuestionIndex] || question.starterCode;
        
        // 테스트 케이스 정보 설정
        document.getElementById('total-tests').textContent = question.testCases.length;
        document.getElementById('passed-tests').textContent = '0';
        
        // 테스트 결과 초기화
        this.updateTestResults(question, []);
        this.clearConsoleOutput();
        
        // 힌트 패널 숨기기
        document.getElementById('hint-panel').style.display = 'none';
        
        // 예상 반환값 표시
        this.showExpectedReturn(question);
        
        this.updateProgress();
        hljs.highlightAll();
    }
    
    startQuestionTimer(timeLimit) {
        if (this.currentQuestionTimer) {
            clearInterval(this.currentQuestionTimer);
        }
        
        let remainingTime = timeLimit * 60; // 분을 초로 변환
        
        const updateTimer = () => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            document.getElementById('question-timer').textContent = 
                `⏱️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (remainingTime <= 0) {
                clearInterval(this.currentQuestionTimer);
                
                // 시간 초과 시 현재 코드 자동 저장
                const code = document.getElementById('code-editor').value;
                this.userAnswers[this.currentQuestionIndex] = code;
                this.saveToLocalStorage();
                
                // 시간 초과 시 다음 문제로 넘어가거나 제출
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.nextQuestion();
                } else {
                    this.submitTest();
                }
            }
            remainingTime--;
        };
        
        updateTimer(); // 즉시 한 번 실행
        this.currentQuestionTimer = setInterval(updateTimer, CONFIG.TIMING.TIMER_UPDATE_INTERVAL);
    }
    
    runCode() {
        const question = this.questions[this.currentQuestionIndex];
        const code = document.getElementById('code-editor').value;
        
        // 사용자 답안 저장
        this.userAnswers[this.currentQuestionIndex] = code;
        this.updateNavigation();
        
        this.clearConsoleOutput();
        
        try {
            // 테스트 케이스 실행
            const results = this.runTestCases(question, code);
            this.updateTestResults(question, results);
            
            // 통과한 테스트 수 업데이트
            const passedCount = results.filter(result => result.passed).length;
            document.getElementById('passed-tests').textContent = passedCount;
            
            // 콘솔 출력
            this.addToConsole(`실행 완료: ${passedCount}/${results.length} 테스트 통과`, 'info');
            
        } catch (error) {
            this.addToConsole(`에러: ${error.message}`, 'error');
            this.updateTestResults(question, []);
        }
    }
    
    runTestCases(question, code) {
        const results = [];
        
        for (let i = 0; i < question.testCases.length; i++) {
            const testCase = question.testCases[i];
            
            try {
                let result;
                
                if (testCase.input === 'custom') {
                    // 커스텀 테스트
                    const testFunction = new Function('', code + '\n' + testCase.test);
                    result = testFunction();
                } else {
                    // 일반 테스트
                    const functionName = this.extractFunctionName(code);
                    const userFunction = new Function('', code + `\nreturn ${functionName};`);
                    const fn = userFunction();
                    
                    if (question.title.includes('Stack')) {
                        // 스택 클래스 테스트
                        const testFunction = new Function('Stack', testCase.test);
                        result = testFunction(fn);
                    } else {
                        // 일반 함수 테스트
                        result = fn.apply(null, testCase.input);
                    }
                }
                
                let passed;
                if (testCase.input === 'custom') {
                    passed = result === true;
                } else {
                    passed = this.deepEqual(result, testCase.expected);
                }
                
                results.push({
                    input: testCase.input,
                    expected: testCase.input === 'custom' ? true : testCase.expected,
                    actual: result,
                    passed: passed,
                    error: null
                });
                
            } catch (error) {
                results.push({
                    input: testCase.input,
                    expected: testCase.input === 'custom' ? true : testCase.expected,
                    actual: null,
                    passed: false,
                    error: error.message
                });
            }
        }
        
        return results;
    }
    
    deepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;
        
        if (obj1 == null || obj2 == null) return obj1 === obj2;
        
        if (typeof obj1 !== typeof obj2) return false;
        
        if (typeof obj1 !== 'object') return obj1 === obj2;
        
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        
        if (keys1.length !== keys2.length) return false;
        
        for (let key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!this.deepEqual(obj1[key], obj2[key])) return false;
        }
        
        return true;
    }
    
    updateTestResults(question, results) {
        const container = document.getElementById('test-results');
        
        if (results.length === 0) {
            container.innerHTML = '<div class="no-results">코드를 실행하여 테스트 결과를 확인하세요.</div>';
            return;
        }
        
        container.innerHTML = results.map((result, index) => {
            const statusClass = result.passed ? 'test-pass' : 'test-fail';
            const statusIcon = result.passed ? '✅' : '❌';
            
            return `
                <div class="test-case ${statusClass}">
                    <div class="test-case-header">
                        <span class="test-number">${statusIcon} 테스트 ${index + 1}</span>
                        <span class="test-status">${result.passed ? '통과' : '실패'}</span>
                    </div>
                    <div class="test-case-details">
                        <div class="test-input">
                            <strong>입력:</strong> ${result.input === 'custom' ? '커스텀 테스트' : JSON.stringify(result.input)}
                        </div>
                        <div class="test-expected">
                            <strong>예상 결과:</strong> ${JSON.stringify(result.expected)}
                        </div>
                        <div class="test-actual">
                            <strong>실제 결과:</strong> ${result.error ? `에러: ${result.error}` : JSON.stringify(result.actual)}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    clearConsoleOutput() {
        const console = document.getElementById('console-output');
        console.innerHTML = '<div class="console-placeholder">코드를 실행하면 결과가 여기에 표시됩니다.</div>';
    }
    
    addToConsole(message, type = 'log') {
        const console = document.getElementById('console-output');
        const placeholder = console.querySelector('.console-placeholder');
        if (placeholder) {
            console.removeChild(placeholder);
        }
        
        const logEntry = document.createElement('div');
        logEntry.className = `console-entry console-${type}`;
        logEntry.textContent = message;
        console.appendChild(logEntry);
        
        // 자동 스크롤
        console.scrollTop = console.scrollHeight;
    }
    
    showHint() {
        const question = this.questions[this.currentQuestionIndex];
        const hintPanel = document.getElementById('hint-panel');
        const hintContent = document.getElementById('hint-content');
        
        // 힌트 헤더 업데이트
        const hintHeader = hintPanel.querySelector('.hint-header span');
        hintHeader.textContent = `💡 힌트 (${this.currentHintLevel}/3단계)`;
        
        let content = '';
        
        // 현재 단계까지의 힌트 표시
        for (let level = 1; level <= this.currentHintLevel; level++) {
            content += `<div class="hint-level">
                <div class="hint-level-header">
                    <span class="hint-level-title">${level}단계 힌트</span>
                    <span class="hint-level-badge">${level === 1 ? '기본' : level === 2 ? '상세' : '코드'}</span>
                </div>
                <div class="hint-level-content">`;
            
            if (level === 3) {
                // 3단계는 코드 형태로 표시
                content += `<pre><code class="language-javascript">${question.hints.level3}</code></pre>`;
            } else {
                // 1, 2단계는 리스트 형태로 표시
                const hints = question.hints[`level${level}`];
                content += hints.map(hint => `<div class="hint-item">• ${hint}</div>`).join('');
            }
            
            content += '</div></div>';
        }
        
        // 다음 단계 버튼 추가
        if (this.currentHintLevel < 3) {
            content += `<div class="hint-actions">
                <button id="next-hint-btn" class="next-hint-btn">
                    <span>${this.currentHintLevel + 1}단계 힌트 보기</span>
                    <span class="hint-arrow">→</span>
                </button>
            </div>`;
        } else {
            content += `<div class="hint-complete">
                <span class="hint-complete-icon">✅</span>
                <span>모든 힌트를 확인했습니다</span>
            </div>`;
        }
        
        hintContent.innerHTML = content;
        hintPanel.style.display = 'block';
        
        // 다음 힌트 버튼 이벤트 리스너
        const nextHintBtn = document.getElementById('next-hint-btn');
        if (nextHintBtn) {
            nextHintBtn.addEventListener('click', () => {
                this.currentHintLevel++;
                this.showHint(); // 재귀 호출로 업데이트
            });
        }
        
        // 코드 하이라이팅 적용
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    }
    
    closeHint() {
        document.getElementById('hint-panel').style.display = 'none';
        // 힌트 단계 초기화하지 않음 (문제 변경 시에만 초기화)
    }
    
    autoSaveCode() {
        const currentAnswer = document.getElementById('code-editor').value;
        this.userAnswers[this.currentQuestionIndex] = currentAnswer;
        
        // 자동 저장 표시 개선
        let saveIndicator = document.getElementById('save-indicator');
        if (!saveIndicator) {
            const container = document.getElementById('save-indicator-container');
            if (container) {
                saveIndicator = document.createElement('div');
                saveIndicator.id = 'save-indicator';
                saveIndicator.className = 'save-indicator';
                container.appendChild(saveIndicator);
            }
        }
        
        if (saveIndicator) {
            // 저장 중 표시
            saveIndicator.textContent = '💾 저장 중...';
            saveIndicator.className = 'save-indicator saving';
            
            // 0.5초 후에 저장 완료 표시
            setTimeout(() => {
                saveIndicator.textContent = '✅ 저장됨';
                saveIndicator.className = 'save-indicator success';
                
                // 2초 후에 페이드 아웃
                setTimeout(() => {
                    saveIndicator.style.opacity = '0';
                    setTimeout(() => {
                        saveIndicator.textContent = '';
                        saveIndicator.className = 'save-indicator';
                        saveIndicator.style.opacity = '1';
                    }, 300);
                }, 2000);
            }, 500);
        }
        
        localStorage.setItem('codingTestAnswers', JSON.stringify(this.userAnswers));
    }
    
    saveToLocalStorage() {
        const saveData = {
            currentQuestionIndex: this.currentQuestionIndex,
            userAnswers: this.userAnswers,
            startTime: this.startTime,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('javascriptMidtermProgress', JSON.stringify(saveData));
    }
    
    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('javascriptMidtermProgress');
            if (savedData) {
                const data = JSON.parse(savedData);
                // 24시간 이내 데이터만 복원
                const savedTime = new Date(data.timestamp);
                const now = new Date();
                const timeDiff = now - savedTime;
                
                if (timeDiff < CONFIG.STORAGE.EXPIRY_HOURS * 60 * 60 * 1000) { // 24시간
                    return data;
                }
            }
        } catch (error) {
            console.error('로컬 스토리지 로드 실패:', error);
        }
        return null;
    }
    
    showSaveIndicator(message, type = 'saving') {
        if (!this.saveIndicator) {
            this.saveIndicator = document.createElement('div');
            this.saveIndicator.className = 'save-indicator';
            document.getElementById('save-indicator-container').appendChild(this.saveIndicator);
        }
        
        this.saveIndicator.textContent = message;
        this.saveIndicator.className = `save-indicator ${type}`;
        this.saveIndicator.style.display = 'inline-block';
    }
    
    hideSaveIndicator() {
        if (this.saveIndicator) {
            this.saveIndicator.style.display = 'none';
        }
    }
    
    showExpectedReturn(question) {
        const expectedReturnPanel = document.getElementById('expected-return');
        const expectedReturnContent = document.getElementById('expected-return-content');
        
        // 커스텀 테스트가 아닌 경우에만 예상 반환값 표시
        const normalTestCases = question.testCases.filter(tc => tc.input !== 'custom');
        
        if (normalTestCases.length > 0) {
            const examples = normalTestCases.slice(0, 3).map((testCase, index) => {
                return `
                    <div class="return-example">
                        <div class="example-label">예시 ${index + 1}:</div>
                        <div class="example-input">입력: <span class="example-value">${JSON.stringify(testCase.input)}</span></div>
                        <div class="example-output">출력: <span class="example-value">${JSON.stringify(testCase.expected)}</span></div>
                    </div>
                `;
            }).join('');
            
            expectedReturnContent.innerHTML = examples;
            expectedReturnPanel.style.display = 'block';
        } else {
            expectedReturnPanel.style.display = 'none';
        }
    }
    
    extractFunctionName(code) {
        // 함수 이름 추출 (function 키워드 또는 const/let 함수 선언)
        const functionMatch = code.match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
        if (functionMatch) {
            return functionMatch[1];
        }
        
        const constMatch = code.match(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
        if (constMatch) {
            return constMatch[1];
        }
        
        const classMatch = code.match(/class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
        if (classMatch) {
            return classMatch[1];
        }
        
        return 'userFunction'; // 기본값
    }
    
    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = 
            `문제 ${this.currentQuestionIndex + 1}/${this.questions.length}`;
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // 코딩 문제는 코드가 있으면 답안이 있는 것으로 간주
        const hasAnswer = this.userAnswers[this.currentQuestionIndex] !== null && 
                         this.userAnswers[this.currentQuestionIndex] !== '' &&
                         this.userAnswers[this.currentQuestionIndex] !== this.questions[this.currentQuestionIndex].starterCode;
        
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
        }
    }
    
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion();
            this.updateNavigation();
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
            this.updateNavigation();
        }
    }
    
    submitTest() {
        // 제출 시 현재 코드 저장
        const code = document.getElementById('code-editor').value;
        this.userAnswers[this.currentQuestionIndex] = code;
        
        this.endTime = new Date();
        clearInterval(this.timer);
        
        // 테스트 완료 시 로컬 스토리지 정리
        localStorage.removeItem('javascriptMidtermProgress');
        
        this.calculateResults();
        this.showResults();
        this.showScreen('result');
    }
    
    calculateResults() {
        let totalScore = 0;
        const categoryResults = {};
        
        this.questions.forEach((question, index) => {
            const category = question.category;
            if (!categoryResults[category]) {
                categoryResults[category] = { score: 0, total: 0, maxScore: 0 };
            }
            
            // 각 문제는 테스트 케이스 통과율에 따라 점수 계산
            const maxPossibleScore = 100 / this.questions.length; // 각 문제당 최대 점수
            categoryResults[category].maxScore += maxPossibleScore;
            categoryResults[category].total++;
            
            let questionScore = 0;
            
            if (this.userAnswers[index] && this.userAnswers[index] !== question.starterCode) {
                try {
                    const results = this.runTestCases(question, this.userAnswers[index]);
                    const passedTests = results.filter(r => r.passed).length;
                    questionScore = (passedTests / results.length) * maxPossibleScore;
                } catch (error) {
                    questionScore = 0;
                }
            }
            
            totalScore += questionScore;
            categoryResults[category].score += questionScore;
        });
        
        this.results = {
            totalScore: Math.round(totalScore),
            categoryResults,
            duration: this.endTime - this.startTime
        };
    }
    
    showResults() {
        const { totalScore, categoryResults, duration } = this.results;
        
        document.getElementById('final-score').querySelector('.score-number').textContent = totalScore;
        document.getElementById('accuracy-rate').textContent = `${totalScore}%`;
        
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        document.getElementById('total-time').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('total-questions').textContent = this.questions.length;
        
        const categoryContainer = document.getElementById('category-results');
        categoryContainer.innerHTML = Object.entries(categoryResults)
            .map(([category, result]) => {
                const percentage = Math.round((result.score / result.maxScore) * 100);
                return `
                    <div class="category-result">
                        <div class="category-name">${category}</div>
                        <div class="category-score">
                            <span>${Math.round(result.score)}/${Math.round(result.maxScore)}점</span>
                            <span class="category-percentage">${percentage}%</span>
                        </div>
                        <div class="category-bar">
                            <div class="category-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
            }).join('');
    }
    
    showReview() {
        const reviewContent = document.getElementById('review-content');
        const incorrectQuestions = this.questions.filter((question, index) => {
            if (question.type === 'multiple') {
                return this.userAnswers[index] !== question.correct;
            } else if (question.type === 'code') {
                const userAnswer = this.userAnswers[index]?.trim().toLowerCase();
                const correctAnswer = question.answer.trim().toLowerCase();
                return userAnswer !== correctAnswer;
            } else if (question.type === 'coding') {
                // 코딩 문제: 테스트 케이스 통과율이 100%가 아니면 오답
                const userAnswer = this.userAnswers[index];
                if (!userAnswer || userAnswer === question.starterCode) {
                    return true; // 답안 없음
                }
                
                try {
                    const results = this.runTestCases(question, userAnswer);
                    const passedTests = results.filter(r => r.passed).length;
                    return passedTests < results.length; // 모든 테스트 통과하지 못하면 오답
                } catch (error) {
                    return true; // 실행 오류 시 오답
                }
            }
        });
        
        reviewContent.innerHTML = incorrectQuestions.map((question, index) => {
            const questionIndex = this.questions.findIndex(q => q.id === question.id);
            const userAnswer = this.userAnswers[questionIndex];
            
            if (question.type === 'coding') {
                // 코딩 문제 전용 리뷰 표시
                let testResults = '';
                if (userAnswer && userAnswer !== question.starterCode) {
                    try {
                        const results = this.runTestCases(question, userAnswer);
                        const passedTests = results.filter(r => r.passed).length;
                        testResults = `
                            <div class="test-summary">
                                <strong>테스트 결과:</strong> ${passedTests}/${results.length} 통과
                            </div>
                            <div class="failed-tests">
                                ${results.filter(r => !r.passed).map((result, i) => `
                                    <div class="failed-test">
                                        <strong>실패한 테스트:</strong> ${result.error || `예상: ${JSON.stringify(result.expected)}, 실제: ${JSON.stringify(result.actual)}`}
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    } catch (error) {
                        testResults = `<div class="error">실행 오류: ${error.message}</div>`;
                    }
                }
                
                return `
                    <div class="review-item">
                        <div class="review-question">
                            <h4>문제 ${question.id}: ${question.title}</h4>
                            <p>${question.text}</p>
                            <p><em>${question.description}</em></p>
                        </div>
                        <div class="review-answer">
                            <div class="user-code">
                                <strong>당신의 코드:</strong>
                                <pre><code class="language-javascript">${userAnswer || '답하지 않음'}</code></pre>
                            </div>
                            ${testResults}
                            <div class="hints">
                                <strong>힌트:</strong>
                                <ul>
                                    ${question.hints[this.currentHintLevel - 1].map(hint => `<li>${hint}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // 기존 객관식/단답형 문제 표시
                return `
                    <div class="review-item">
                        <div class="review-question">
                            <h4>문제 ${question.id}: ${question.title}</h4>
                            <p>${question.text}</p>
                            ${question.code ? `<pre><code class="language-javascript">${question.code}</code></pre>` : ''}
                        </div>
                        <div class="review-answer">
                            <div class="user-answer">
                                <strong>당신의 답:</strong> 
                                ${question.type === 'multiple' ? 
                                    (userAnswer !== null ? question.options[userAnswer] : '답하지 않음') : 
                                    (userAnswer || '답하지 않음')
                                }
                            </div>
                            <div class="correct-answer">
                                <strong>정답:</strong> 
                                ${question.type === 'multiple' ? 
                                    question.options[question.correct] : 
                                    question.answer
                                }
                            </div>
                            <div class="explanation">
                                <strong>해설:</strong> ${question.explanation}
                            </div>
                        </div>
                    </div>
                `;
            }
        }).join('');
        
        if (incorrectQuestions.length === 0) {
            reviewContent.innerHTML = '<div class="perfect-score">🎉 모든 문제를 맞히셨습니다!</div>';
        }
        
        this.showScreen('review');
        hljs.highlightAll();
    }
    
    closeReview() {
        this.showScreen('result');
    }
    
    restartTest() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.showScreen('start');
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        document.getElementById(`${screenName}-screen`).classList.add('active');
    }

    // 한글 필터링 함수 - PDF 생성 시 한글 문자를 영어 플레이스홀더로 대체
    filterKoreanForPDF(code) {
        if (!code || typeof code !== 'string') {
            return code;
        }

        // 한글 문자 패턴 (가-힣, ㄱ-ㅎ, ㅏ-ㅣ)
        const koreanPattern = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        
        let filteredCode = code;
        
        // 1. 한글이 포함된 주석 처리
        // 한 줄 주석 (//)
        filteredCode = filteredCode.replace(/\/\/.*$/gm, (match) => {
            if (koreanPattern.test(match)) {
                return '// [Korean comment]';
            }
            return match;
        });
        
        // 여러 줄 주석 (/* */)
        filteredCode = filteredCode.replace(/\/\*[\s\S]*?\*\//g, (match) => {
            if (koreanPattern.test(match)) {
                return '/* [Korean comment] */';
            }
            return match;
        });
        
        // 2. 한글이 포함된 문자열 처리
        // 큰따옴표 문자열
        filteredCode = filteredCode.replace(/"([^"\\]|\\.)*"/g, (match) => {
            if (koreanPattern.test(match)) {
                return '"[Korean text]"';
            }
            return match;
        });
        
        // 작은따옴표 문자열
        filteredCode = filteredCode.replace(/'([^'\\]|\\.)*'/g, (match) => {
            if (koreanPattern.test(match)) {
                return "'[Korean text]'";
            }
            return match;
        });
        
        // 백틱 문자열 (템플릿 리터럴)
        filteredCode = filteredCode.replace(/`([^`\\]|\\.)*`/g, (match) => {
            if (koreanPattern.test(match)) {
                return '`[Korean text]`';
            }
            return match;
        });
        
        // 3. 나머지 한글 문자들을 [Korean] 으로 대체
        filteredCode = filteredCode.replace(koreanPattern, '[Korean]');
        
        return filteredCode;
    }

    async generateResultPDF() {
        // UX 개선: 로딩 상태 표시
        this.showLoadingState('PDF 생성 중...', 'processing');
        
        // 1단계: 라이브러리 로딩 확인
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF 라이브러리가 로드되지 않았습니다.');
            this.hideLoadingState();
            this.showNotification('PDF 생성 라이브러리를 로드할 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요.', 'error');
            return;
        }

        if (typeof html2canvas === 'undefined') {
            console.error('html2canvas 라이브러리가 로드되지 않았습니다.');
            this.hideLoadingState();
            this.showNotification('PDF 생성 라이브러리를 로드할 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요.', 'error');
            return;
        }

        // 한글 제목을 영문으로 매핑
        const titleMapping = {
            '배열 뒤집기': 'Array Reverse',
            '배열 합계 구하기': 'Array Sum',
            '문자열 길이 확인': 'String Length Check'
        };

        // 카테고리를 영문으로 매핑
        const categoryMapping = {
            '배열 조작': 'Array Manipulation',
            '기본 연산': 'Basic Operations',
            '문자열 처리': 'String Processing'
        };

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // 색상 팔레트 정의
            const colors = {
                primary: [41, 128, 185],      // 파란색
                success: [39, 174, 96],       // 초록색
                error: [231, 76, 60],         // 빨간색
                warning: [241, 196, 15],      // 노란색
                dark: [52, 73, 94],           // 어두운 회색
                light: [149, 165, 166],       // 밝은 회색
                background: [248, 249, 250],  // 배경색
                white: [255, 255, 255]        // 흰색
            };
            
            const now = new Date();
            const fileName = `JavaScript_Test_Results_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.pdf`;
            
            let y = 20;
            const pageWidth = 210;
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);

            // === 헤더 섹션 ===
            // 배경 그라데이션 효과 (사각형으로 구현)
            doc.setFillColor(...colors.primary);
            doc.rect(0, 0, pageWidth, 50, 'F');
            
            // 헤더 텍스트
            doc.setTextColor(...colors.white);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('JavaScript Test Results', pageWidth/2, 25, { align: 'center' });
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.text('Comprehensive Assessment Report', pageWidth/2, 35, { align: 'center' });
            
            y = 60;
            
            // === 요약 정보 섹션 ===
            doc.setTextColor(...colors.dark);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Test Summary', margin, y);
            y += 15;
            
            // 요약 정보 박스
            doc.setFillColor(...colors.background);
            doc.setDrawColor(...colors.light);
            doc.setLineWidth(0.5);
            doc.rect(margin, y, contentWidth, 35, 'FD');
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.dark);
            
            // 테스트 기본 정보
            doc.text(`Date: ${now.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}`, margin + 5, y + 10);
            
            if (this.results) {
                const { totalScore, duration } = this.results;
                const hours = Math.floor(duration / 3600000);
                const minutes = Math.floor((duration % 3600000) / 60000);
                const seconds = Math.floor((duration % 60000) / 1000);
                const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                // 점수에 따른 색상 선택
                const scoreColor = totalScore >= 80 ? colors.success : 
                                 totalScore >= 60 ? colors.warning : colors.error;
                
                doc.setTextColor(...scoreColor);
                doc.setFont('helvetica', 'bold');
                doc.text(`Final Score: ${totalScore}/100 (${totalScore}%)`, margin + 5, y + 20);
                
                doc.setTextColor(...colors.dark);
                doc.setFont('helvetica', 'normal');
                doc.text(`Total Time: ${timeStr}`, margin + 5, y + 30);
                doc.text(`Questions: ${this.questions.length}`, margin + 100, y + 30);
            }
            
            y += 45;
            
            // === 성능 지표 ===
            if (this.results) {
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...colors.dark);
                doc.text('Performance Metrics', margin, y);
                y += 12;
                
                const correctAnswers = this.questions.filter((question, index) => {
                    const userAnswer = this.userAnswers[index];
                    if (!userAnswer || userAnswer === question.starterCode) return false;
                    
                    try {
                        const results = this.runTestCases(question, userAnswer);
                        return results.filter(r => r.passed).length === results.length;
                    } catch (e) {
                        return false;
                    }
                }).length;
                
                const accuracy = Math.round((correctAnswers / this.questions.length) * 100);
                
                // 진행 바 그리기
                const progressBarWidth = 100;
                const progressBarHeight = 8;
                
                // 배경
                doc.setFillColor(...colors.light);
                doc.rect(margin, y, progressBarWidth, progressBarHeight, 'F');
                
                // 진행률
                const progressWidth = (accuracy / 100) * progressBarWidth;
                const progressColor = accuracy >= 80 ? colors.success : 
                                    accuracy >= 60 ? colors.warning : colors.error;
                doc.setFillColor(...progressColor);
                doc.rect(margin, y, progressWidth, progressBarHeight, 'F');
                
                doc.setFontSize(10);
                doc.setTextColor(...colors.dark);
                doc.text(`Accuracy: ${accuracy}% (${correctAnswers}/${this.questions.length} correct)`, margin + progressBarWidth + 5, y + 6);
                
                y += 20;
            }
            
            // 구분선
            doc.setDrawColor(...colors.primary);
            doc.setLineWidth(2);
            doc.line(margin, y, pageWidth - margin, y);
            y += 15;

            // === 문제별 상세 결과 ===
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...colors.dark);
            doc.text('Detailed Results', margin, y);
            y += 15;
            
            for (const [index, question] of this.questions.entries()) {
                // 페이지 넘김 체크 (더 여유있게)
                if (y > 220) {
                    doc.addPage();
                    y = 30;
                    
                    // 새 페이지 헤더
                    doc.setFillColor(...colors.primary);
                    doc.rect(0, 0, pageWidth, 25, 'F');
                    doc.setTextColor(...colors.white);
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.text('JavaScript Test Results - Continued', pageWidth/2, 15, { align: 'center' });
                    
                    y = 35;
                }

                // 문제 제목 (영문으로 변환)
                const englishTitle = titleMapping[question.title] || question.title;
                const englishCategory = categoryMapping[question.category] || question.category;
                
                // 테스트 결과 계산
                let testResults = 'No answer submitted';
                let passed = false;
                let passedCount = 0;
                let totalTests = question.testCases.length;

                const userAnswer = this.userAnswers[index];
                if (userAnswer && userAnswer !== question.starterCode) {
                    try {
                        const results = this.runTestCases(question, userAnswer);
                        passedCount = results.filter(r => r.passed).length;
                        testResults = `${passedCount}/${totalTests} tests passed`;
                        passed = (passedCount === totalTests);
                    } catch (e) {
                        console.error(`문제 ${index + 1} 테스트 실행 오류:`, e);
                        testResults = 'Code execution error';
                    }
                }
                
                // 문제 박스
                const questionBoxHeight = 45;
                const statusColor = passed ? colors.success : 
                                  passedCount > 0 ? colors.warning : colors.error;
                
                // 문제 배경
                doc.setFillColor(...colors.white);
                doc.setDrawColor(...statusColor);
                doc.setLineWidth(2);
                doc.rect(margin, y, contentWidth, questionBoxHeight, 'FD');
                
                // 상태 표시 아이콘 및 색상
                doc.setFillColor(...statusColor);
                doc.circle(margin + 8, y + 8, 3, 'F');
                
                // 문제 번호 및 제목
                doc.setTextColor(...colors.dark);
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.text(`Q${index + 1}. ${englishTitle}`, margin + 15, y + 10);
                
                // 카테고리
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...colors.light);
                doc.text(`Category: ${englishCategory}`, margin + 15, y + 20);
                
                // 결과 표시
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...statusColor);
                const statusText = passed ? 'CORRECT' : passedCount > 0 ? 'PARTIAL' : 'INCORRECT';
                doc.text(statusText, margin + 15, y + 30);
                
                // 테스트 결과
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...colors.dark);
                doc.text(`Tests: ${testResults}`, margin + 15, y + 40);
                
                y += questionBoxHeight + 5;
                
                // 코드 섹션
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...colors.dark);
                doc.text('Submitted Code:', margin, y);
                y += 8;

                // 한글 필터링 적용
                const originalCode = userAnswer || 'No answer provided';
                const filteredCode = this.filterKoreanForPDF(originalCode);
                
                // 코드 박스
                const codeLines = filteredCode.split('\n');
                const maxDisplayLines = 8;
                const displayLines = codeLines.slice(0, maxDisplayLines);
                const codeBoxHeight = Math.max(displayLines.length * 4 + 8, 20);
                
                // 코드 배경
                doc.setFillColor(248, 249, 250);
                doc.setDrawColor(...colors.light);
                doc.setLineWidth(0.5);
                doc.rect(margin, y, contentWidth, codeBoxHeight, 'FD');
                
                // 코드 텍스트
                doc.setFont('courier');
                doc.setFontSize(9);
                doc.setTextColor(...colors.dark);
                
                for (let i = 0; i < displayLines.length; i++) {
                    const line = displayLines[i].substring(0, 85); // 길이 제한
                    doc.text(line, margin + 3, y + 6 + (i * 4));
                }
                
                if (codeLines.length > maxDisplayLines) {
                    doc.setFont('helvetica');
                    doc.setTextColor(...colors.light);
                    doc.text(`... (${codeLines.length - maxDisplayLines} more lines)`, margin + 3, y + 6 + (maxDisplayLines * 4));
                }
                
                y += codeBoxHeight + 15;
                
                // 문제 간 구분선
                if (index < this.questions.length - 1) {
                    doc.setDrawColor(...colors.light);
                    doc.setLineWidth(0.5);
                    doc.line(margin, y, pageWidth - margin, y);
                    y += 10;
                }
            }
            
            // === 푸터 추가 ===
            const totalPages = doc.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                
                // 푸터 배경
                doc.setFillColor(...colors.background);
                doc.rect(0, 287, pageWidth, 10, 'F');
                
                // 푸터 텍스트
                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...colors.light);
                doc.text(`Generated on ${now.toLocaleDateString('en-US')} | Page ${i} of ${totalPages}`, pageWidth/2, 292, { align: 'center' });
                doc.text('JavaScript Assessment System', pageWidth/2, 296, { align: 'center' });
            }

            this.hideLoadingState();
            this.showLoadingState('Saving file...', 'success');
            
            doc.save(fileName);
            
            setTimeout(() => {
                this.hideLoadingState();
                this.showNotification(`PDF generated successfully!\nFilename: ${fileName}`, 'success');
            }, 500);

        } catch (error) {
            console.error('PDF 생성 중 상세 오류:', error);
            this.hideLoadingState();
            
            let errorMessage = 'An error occurred while generating PDF.\n\n';
            errorMessage += `Error type: ${error.name}\n`;
            errorMessage += `Details: ${error.message}\n\n`;
            errorMessage += 'Would you like to save the results as a text file?';
            
            if (confirm(errorMessage)) {
                this.generateResultText();
            }
        }
    }

    // UX 개선: 로딩 상태 표시 함수
    showLoadingState(message, type = 'processing') {
        let indicator = document.getElementById('loading-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'loading-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.98);
                padding: 30px 40px;
                border-radius: 15px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
                font-family: 'Noto Sans KR', sans-serif;
                border: 3px solid #3498db;
                min-width: 300px;
                backdrop-filter: blur(10px);
            `;
            document.body.appendChild(indicator);
        }
        
        const icons = {
            processing: '●',
            success: '✓',
            error: '✗'
        };
        
        const colors = {
            processing: '#3498db',
            success: '#27ae60',
            error: '#e74c3c'
        };
        
        indicator.style.borderColor = colors[type];
        indicator.innerHTML = `
            <div style="font-size: 32px; animation: spin 2s linear infinite;">${icons[type]}</div>
            <div style="font-size: 16px; color: #2c3e50; font-weight: 600; text-align: center;">${message}</div>
            ${type === 'processing' ? '<div style="font-size: 12px; color: #7f8c8d; text-align: center;">Please wait...</div>' : ''}
        `;
        indicator.style.display = 'flex';
        
        // 스피너 애니메이션 추가
        if (type === 'processing') {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    hideLoadingState() {
        const indicator = document.getElementById('loading-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }
    }

    // UX 개선: 알림 메시지 함수
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.98);
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            max-width: 450px;
            font-family: 'Noto Sans KR', sans-serif;
            border-left: 5px solid ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            backdrop-filter: blur(10px);
        `;
        
        const icons = {
            success: '✓',
            error: '✗',
            info: 'i'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="font-size: 20px; margin-top: 2px;">${icons[type] || icons.info}</div>
                <div style="color: #2c3e50; font-size: 14px; line-height: 1.6; white-space: pre-line;">${message}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 자동 제거
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, type === 'error' ? CONFIG.TIMING.NOTIFICATION_DURATION.ERROR : CONFIG.TIMING.NOTIFICATION_DURATION.INFO); // 에러 메시지는 더 오래 표시
        
        // 클릭하면 즉시 제거
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // PDF 생성이 실패할 경우 텍스트 파일로 결과 저장
    generateResultText() {
        try {
            const now = new Date();
            const fileName = `JavaScript_Test_Results_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.txt`;
            
            let content = '=== JavaScript Test Results ===\n\n';
            content += `Date: ${now.toLocaleString('en-US')}\n`;
            
            if (this.results) {
                const { totalScore, duration } = this.results;
                const hours = Math.floor(duration / 3600000);
                const minutes = Math.floor((duration % 3600000) / 60000);
                const seconds = Math.floor((duration % 60000) / 1000);
                const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                content += `Total Score: ${totalScore}/100\n`;
                content += `Duration: ${timeStr}\n`;
                content += `Total Questions: ${this.questions.length}\n\n`;
            }

            content += '=== Detailed Results by Question ===\n\n';

            // 매핑 객체들 (PDF와 동일)
            const titleMapping = {
                '배열 뒤집기': 'Array Reverse',
                '배열 합계 구하기': 'Array Sum',
                '문자열 길이 확인': 'String Length Check'
            };

            const categoryMapping = {
                '배열 조작': 'Array Manipulation',
                '기본 연산': 'Basic Operations',
                '문자열 처리': 'String Processing'
            };

            for (const [index, question] of this.questions.entries()) {
                const englishTitle = titleMapping[question.title] || question.title;
                const englishCategory = categoryMapping[question.category] || question.category;
                
                content += `Question ${index + 1}. ${englishTitle}\n`;
                content += `Category: ${englishCategory}\n`;
                
                let testResults = 'No answer submitted';
                let passed = false;

                const userAnswer = this.userAnswers[index];
                if (userAnswer && userAnswer !== question.starterCode) {
                    try {
                        const results = this.runTestCases(question, userAnswer);
                        const passedCount = results.filter(r => r.passed).length;
                        testResults = `Tests passed: ${passedCount} / ${results.length}`;
                        passed = (passedCount === results.length);
                    } catch (e) {
                        testResults = 'Code execution error';
                    }
                }
                
                content += `Result: ${passed ? 'CORRECT' : 'INCORRECT'} (${testResults})\n`;
                content += `Submitted Code:\n`;
                content += '```javascript\n';
                
                // 한글 필터링 적용
                const originalCode = userAnswer || 'No answer';
                const filteredCode = this.filterKoreanForPDF(originalCode);
                content += filteredCode;
                
                content += '\n```\n\n';
                content += '---\n\n';
            }

            // 텍스트 파일 다운로드
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert(`Text file saved successfully!\nFile name: ${fileName}`);

        } catch (error) {
            console.error('텍스트 파일 생성 중 오류:', error);
            alert('An error occurred while saving the results.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JavaScriptMidtermTest();
});