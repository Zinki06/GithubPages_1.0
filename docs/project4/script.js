class JavaScriptMidtermTest {
    constructor() {
        this.questions = [
            {
                id: 1,
                category: 'Number 타입 (4차시)',
                title: '진법 변환기',
                text: '주어진 10진수를 2진수, 8진수, 16진수로 변환하는 함수를 작성하세요.',
                description: '조건: 입력은 0 이상 1000 이하의 정수입니다. 반환값은 {binary: "문자열", octal: "문자열", hex: "문자열"} 형태의 객체여야 합니다. 모든 진법 결과는 문자열로 반환하세요.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 8,
                starterCode: `function convertBase(decimal) {
    // 여기에 코드를 작성하세요
    // 반환값: { binary: '1010', octal: '12', hex: 'a' }
    
}`,
                testCases: [
                    { input: [10], expected: { binary: '1010', octal: '12', hex: 'a' } },
                    { input: [255], expected: { binary: '11111111', octal: '377', hex: 'ff' } },
                    { input: [0], expected: { binary: '0', octal: '0', hex: '0' } },
                    { input: [16], expected: { binary: '10000', octal: '20', hex: '10' } },
                    { input: [100], expected: { binary: '1100100', octal: '144', hex: '64' } }
                ],
                hints: [
                    'toString() 메소드에 진법을 인수로 전달할 수 있습니다',
                    'Number.prototype.toString(radix) 활용하세요',
                    '각 진법별로 toString(2), toString(8), toString(16)을 사용하세요'
                ]
            },
            {
                id: 2,
                category: 'String 타입 (5차시)',
                title: '문자열 분석기',
                text: '문자열을 분석하여 통계 정보를 반환하는 함수를 작성하세요.',
                description: '조건: 입력은 0~200자 길이의 문자열입니다. 반환값은 {length: 숫자, spaces: 숫자, words: 숫자, first: "문자", last: "문자"} 형태입니다. 단어는 공백으로 구분되며, 연속된 공백은 하나로 취급합니다. 빈 문자열의 경우 first와 last는 빈 문자열입니다.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 10,
                starterCode: `function analyzeString(str) {
    // 여기에 코드를 작성하세요
    
}`,
                testCases: [
                    { input: ['Hello World'], expected: { length: 11, spaces: 1, words: 2, first: 'H', last: 'd' } },
                    { input: ['JavaScript is fun!'], expected: { length: 18, spaces: 2, words: 3, first: 'J', last: '!' } },
                    { input: [''], expected: { length: 0, spaces: 0, words: 0, first: '', last: '' } },
                    { input: ['   '], expected: { length: 3, spaces: 3, words: 0, first: ' ', last: ' ' } },
                    { input: ['A'], expected: { length: 1, spaces: 0, words: 1, first: 'A', last: 'A' } }
                ],
                hints: [
                    'split() 메소드로 단어를 나눌 수 있습니다',
                    'trim() 메소드로 앞뒤 공백을 제거하세요',
                    '빈 문자열 처리를 주의하세요'
                ]
            },
            {
                id: 3,
                category: 'Boolean 타입 (6차시)',
                title: '값 유효성 검사기',
                text: '다양한 값들이 유효한지 검사하는 함수를 작성하세요.',
                description: '조건: 입력은 {name, age, email} 속성을 가진 객체입니다. name은 빈 문자열이 아니어야 하고, age는 0보다 큰 숫자여야 하며, email은 "@" 문자를 포함해야 합니다. 반환값은 {valid: boolean, errors: [문자열배열]} 형태입니다.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 12,
                starterCode: `function validateValues(obj) {
    // 여기에 코드를 작성하세요
    // name: 비어있지 않은 문자열
    // age: 0보다 큰 숫자
    // email: '@' 포함한 문자열
    
}`,
                testCases: [
                    { input: [{ name: 'Kim', age: 25, email: 'kim@test.com' }], expected: { valid: true, errors: [] } },
                    { input: [{ name: '', age: 0, email: 'invalid' }], expected: { valid: false, errors: ['name', 'age', 'email'] } },
                    { input: [{ name: 'Lee', age: -5, email: 'lee@test.com' }], expected: { valid: false, errors: ['age'] } },
                    { input: [{ name: 'Park', age: 30, email: 'park@test.com' }], expected: { valid: true, errors: [] } },
                    { input: [{ name: 'Choi', age: 20, email: 'choi' }], expected: { valid: false, errors: ['email'] } }
                ],
                hints: [
                    'truthy/falsy 개념을 활용하세요',
                    'includes() 메소드로 문자 포함 여부를 확인하세요',
                    '논리 연산자를 활용하세요'
                ]
            },
            {
                id: 4,
                category: '함수와 스코프 (8차시)',
                title: '카운터 생성기',
                text: '독립적인 카운터를 생성하는 함수를 작성하세요.',
                description: '조건: initialValue는 -1000~1000 범위의 정수 (기본값 0). 반환값은 {increment: 함수, decrement: 함수, getValue: 함수, reset: 함수} 형태의 객체. 각 메소드는 카운터 조작을 위한 기능을 제공합니다.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 15,
                starterCode: `function createCounter(initialValue = 0) {
    // 여기에 코드를 작성하세요
    // 반환: { increment, decrement, getValue, reset }
    
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const counter1 = createCounter(5);
                            const counter2 = createCounter();
                            counter1.increment();
                            counter1.increment();
                            counter2.increment();
                            return counter1.getValue() === 7 && counter2.getValue() === 1;
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const counter = createCounter(10);
                            counter.decrement();
                            counter.decrement();
                            return counter.getValue() === 8;
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const counter = createCounter(5);
                            counter.increment();
                            counter.reset();
                            return counter.getValue() === 5;
                        `
                    }
                ],
                hints: [
                    '클로저를 사용하여 private 변수를 만드세요',
                    '객체를 반환하여 여러 메소드를 제공하세요',
                    'increment()는 값을 1 증가, decrement()는 1 감소시킵니다',
                    'getValue()는 현재 값 반환, reset()은 초기값으로 복원합니다',
                    '기본값 매개변수를 활용하세요'
                ]
            },
            {
                id: 5,
                category: '제어 구문 (9차시)',
                title: '패턴 출력기',
                text: '주어진 크기에 따라 별 패턴을 출력하는 함수를 작성하세요.',
                description: '조건: n은 1~10 사이의 정수. 반환값은 피라미드 형태의 문자열 (\\n으로 줄 구분). 각 줄은 공백과 별(*)로 구성되며, 위에서 아래로 갈수록 별의 개수가 증가합니다. 마지막 줄 뒤에는 \\n이 없습니다.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 12,
                starterCode: `function createPyramid(n) {
    // 여기에 코드를 작성하세요
    
}`,
                testCases: [
                    { input: [3], expected: '  *\n ***\n*****' },
                    { input: [1], expected: '*' },
                    { input: [4], expected: '   *\n  ***\n *****\n*******' },
                    { input: [2], expected: ' *\n***' },
                    { input: [5], expected: '    *\n   ***\n  *****\n *******\n*********' }
                ],
                hints: [
                    '중첩 반복문을 사용하세요',
                    '각 줄은 (n-i)개의 공백 + (2*i-1)개의 별로 구성됩니다',
                    'repeat() 메소드를 활용할 수 있습니다',
                    'i는 1부터 n까지 반복합니다'
                ]
            },
            {
                id: 6,
                category: '객체와 프로토타입 (10차시)',
                title: '학생 성적 관리',
                text: '학생 객체를 생성하고 성적을 관리하는 생성자 함수를 작성하세요.',
                description: '조건: name은 빈 문자열이 아닌 문자열. score는 0~100 사이의 숫자. Student 생성자는 name과 빈 scores 배열을 초기화. addScore()는 점수 추가, getAverage()는 평균 반환 (소수점 가능), getGrade()는 평균에 따른 등급 반환.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 18,
                starterCode: `function Student(name) {
    // 여기에 코드를 작성하세요
}

Student.prototype.addScore = function(score) {
    // 여기에 코드를 작성하세요
};

Student.prototype.getAverage = function() {
    // 여기에 코드를 작성하세요
};

Student.prototype.getGrade = function() {
    // 여기에 코드를 작성하세요
    // 90+ : A, 80+ : B, 70+ : C, 60+ : D, 그 외 : F
};`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const student = new Student('김철수');
                            student.addScore(85);
                            student.addScore(92);
                            student.addScore(78);
                            return student.getAverage() === 85 && student.getGrade() === 'B';
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const student = new Student('이영희');
                            student.addScore(95);
                            student.addScore(88);
                            return student.getAverage() === 91.5 && student.getGrade() === 'A';
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const student = new Student('박민수');
                            student.addScore(65);
                            return student.getGrade() === 'D';
                        `
                    }
                ],
                hints: [
                    '생성자 함수에서 this로 속성을 초기화하세요',
                    '프로토타입에 메소드를 정의하세요',
                    '배열의 push(), reduce() 메소드를 활용하세요',
                    '등급 기준: 90+ A, 80+ B, 70+ C, 60+ D, 나머지 F'
                ]
            },
            {
                id: 7,
                category: '배열 조작 (11차시)',
                title: '중복 제거 함수',
                text: '배열에서 중복된 요소를 제거하는 함수를 작성하세요.',
                description: '조건: 입력은 최대 길이 1000의 배열 (숫자, 문자열, boolean만 포함). 반환값은 중복이 제거된 새 배열 (첫 번째 등장 순서 유지). 빈 배열 입력 시 빈 배열 반환. 원본 배열은 변경하지 않습니다.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 10,
                starterCode: `function removeDuplicates(arr) {
    // 여기에 코드를 작성하세요
    // Set을 사용하지 마세요
    
}`,
                testCases: [
                    { input: [[1, 2, 2, 3, 4, 4, 5]], expected: [1, 2, 3, 4, 5] },
                    { input: [['a', 'b', 'a', 'c', 'b']], expected: ['a', 'b', 'c'] },
                    { input: [[]], expected: [] },
                    { input: [[1, 1, 1]], expected: [1] },
                    { input: [[1, 2, 3]], expected: [1, 2, 3] }
                ],
                hints: [
                    'Set 사용은 금지입니다',
                    'filter() 메소드와 indexOf() 메소드를 조합하세요',
                    '첫 번째 등장 위치와 현재 위치를 비교하세요',
                    'includes() 메소드와 새 배열을 만들어가는 방법도 있습니다'
                ]
            },
            {
                id: 8,
                category: '고차 함수 (11차시)',
                title: '데이터 변환 파이프라인',
                text: '배열 데이터를 변환하는 파이프라인 함수를 작성하세요.',
                description: '조건: 입력은 최대 길이 100의 숫자 배열 (-1000~1000 범위). 배열을 변환하여 최종적으로 하나의 숫자를 반환합니다. 짝수가 없거나 빈 배열인 경우 0 반환.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 10,
                starterCode: `function processNumbers(numbers) {
    // 여기에 코드를 작성하세요
    // 1. 짝수만 필터링
    // 2. 각 숫자를 제곱
    // 3. 모든 값의 합계 반환
    
}`,
                testCases: [
                    { input: [[1, 2, 3, 4, 5, 6]], expected: 56 }, // 2²+4²+6² = 4+16+36 = 56
                    { input: [[1, 3, 5]], expected: 0 },
                    { input: [[2, 4]], expected: 20 }, // 2²+4² = 4+16 = 20
                    { input: [[]], expected: 0 },
                    { input: [[10, 15, 20]], expected: 500 } // 10²+20² = 100+400 = 500
                ],
                hints: [
                    '처리 순서: 1) 짝수만 필터링 2) 각 숫자를 제곱 3) 모든 값의 합계',
                    'filter(), map(), reduce() 메소드를 순서대로 사용하세요',
                    '메소드 체이닝을 활용하세요',
                    '짝수 판별은 % 2 === 0을 사용하세요'
                ]
            },
            {
                id: 9,
                category: '참조와 값 (12차시)',
                title: '객체 얕은 복사',
                text: '객체를 얕은 복사하는 함수를 작성하세요.',
                description: '조건: 입력은 plain object (null, undefined, 함수, 클래스 인스턴스 제외). 반환값은 1단계 속성만 복사된 새 객체. 중첩 객체나 배열은 참조가 복사됨 (얕은 복사). 원본 객체의 1단계 속성 변경은 복사본에 영향 없음.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 12,
                starterCode: `function shallowCopy(obj) {
    // 여기에 코드를 작성하세요
    
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const original = { a: 1, b: 2, c: { d: 3 } };
                            const copied = shallowCopy(original);
                            copied.a = 10;
                            return original.a === 1 && copied.a === 10;
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const original = { x: 1, y: 2 };
                            const copied = shallowCopy(original);
                            return copied.x === 1 && copied.y === 2 && copied !== original;
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const original = { nested: { value: 5 } };
                            const copied = shallowCopy(original);
                            copied.nested.value = 10;
                            return original.nested.value === 10; // 얕은 복사이므로 참조 공유
                        `
                    }
                ],
                hints: [
                    'Object.assign이나 spread 연산자(...) 사용은 금지입니다',
                    '새 객체를 만들고 속성을 하나씩 복사하세요',
                    'for...in 반복문이나 Object.keys()를 사용하세요',
                    '중첩 객체는 참조가 복사됩니다 (얕은 복사의 특징)'
                ]
            },
            {
                id: 10,
                category: '호이스팅과 스코프 (12차시)',
                title: '스코프 분석기',
                text: '다양한 변수 선언의 결과를 예측하는 함수를 작성하세요.',
                description: '조건: 주석으로 제시된 코드의 console.log 출력 순서대로 배열 반환. 반환값은 6개 원소의 배열 [첫번째출력, ..., 여섯번째출력]. JavaScript의 변수 선언과 스코프 규칙을 이해해야 합니다.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 15,
                starterCode: `function analyzeScopeExample() {
    // 다음 코드의 실행 결과를 예측하여 배열로 반환하세요
    
    /* 분석할 코드:
    var a = 1;
    let b = 2;
    const c = 3;
    
    function test() {
        console.log(a); // ?
        console.log(b); // ?
        console.log(c); // ?
        
        var a = 10;
        let b = 20;
        const c = 30;
        
        console.log(a); // ?
        console.log(b); // ?
        console.log(c); // ?
    }
    
    test();
    */
    
    // 여기에 예측한 출력값들을 배열로 반환하세요
    return []; // [첫번째출력, 두번째출력, ...]
}`,
                testCases: [
                    { input: [], expected: [undefined, 2, 3, 10, 20, 30] }
                ],
                hints: [
                    'var는 함수 스코프이며 호이스팅되지만 undefined로 초기화됩니다',
                    'let과 const는 블록 스코프이며 TDZ(Temporal Dead Zone) 적용',
                    '함수 스코프 vs 블록 스코프의 차이를 이해하세요',
                    '변수 선언이 실행되기 전까지는 상위 스코프의 값을 참조합니다'
                ]
            },
            {
                id: 11,
                category: 'this 바인딩 (13차시)',
                title: '메소드 바인딩 도구',
                text: '객체의 메소드를 다른 컨텍스트에서 실행할 수 있도록 바인딩하는 함수를 작성하세요.',
                description: '조건: obj는 methodName 속성을 가진 객체, methodName은 문자열, newContext는 바인딩할 새로운 this 객체. 반환값은 newContext를 this로 바인딩된 함수. 호출 시 원본 메소드가 새로운 컨텍스트에서 실행되어야 함.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 12,
                starterCode: `function bindMethod(obj, methodName, newContext) {
    // 여기에 코드를 작성하세요
    // obj의 methodName을 newContext에 바인딩하여 반환
    
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const person1 = {
                                name: '김철수',
                                greet: function() {
                                    return \`안녕하세요, \${this.name}입니다.\`;
                                }
                            };
                            const person2 = { name: '이영희' };
                            const boundGreet = bindMethod(person1, 'greet', person2);
                            return boundGreet() === '안녕하세요, 이영희입니다.';
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const obj1 = {
                                value: 10,
                                getValue: function() {
                                    return this.value;
                                }
                            };
                            const obj2 = { value: 20 };
                            const boundGetValue = bindMethod(obj1, 'getValue', obj2);
                            return boundGetValue() === 20;
                        `
                    }
                ],
                hints: [
                    'bind(), call(), apply() 중 하나를 사용하세요',
                    '메소드를 객체에서 추출할 때 this 바인딩이 사라집니다',
                    'obj[methodName]으로 메소드에 접근할 수 있습니다',
                    'bind()는 새로운 함수를 반환하고, call/apply는 즉시 실행합니다'
                ]
            },
            {
                id: 12,
                category: '종합 응용',
                title: '간단한 할 일 관리자',
                text: '할 일을 관리하는 간단한 시스템을 구현하세요.',
                description: '조건: TodoManager 생성자는 빈 todos 배열과 ID 카운터를 초기화. addTodo(text)는 할 일 객체를 추가하고 ID 반환. completeTodo(id)는 해당 ID의 완료 상태를 변경. getTodos(filter)는 필터에 따라 할 일 목록을 반환.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 20,
                starterCode: `function TodoManager() {
    // 여기에 코드를 작성하세요
}

TodoManager.prototype.addTodo = function(text) {
    // 여기에 코드를 작성하세요
};

TodoManager.prototype.completeTodo = function(id) {
    // 여기에 코드를 작성하세요
};

TodoManager.prototype.getTodos = function(filter = 'all') {
    // 여기에 코드를 작성하세요
    // filter: 'all', 'completed', 'pending'
};`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const todos = new TodoManager();
                            todos.addTodo('JavaScript 공부');
                            todos.addTodo('운동하기');
                            todos.completeTodo(1);
                            const allTodos = todos.getTodos('all');
                            const completed = todos.getTodos('completed');
                            return allTodos.length === 2 && completed.length === 1;
                        `
                    },
                    {
                        input: 'custom',
                        test: `
                            const todos = new TodoManager();
                            todos.addTodo('테스트');
                            const pending = todos.getTodos('pending');
                            return pending.length === 1 && pending[0].completed === false;
                        `
                    }
                ],
                hints: [
                    'TodoManager 생성자: this.todos = [], this.lastId = 0',
                    'addTodo: {id: 숫자, text: 문자열, completed: false} 형태로 추가',
                    'completeTodo: 해당 id의 completed를 true로 변경',
                    'getTodos: "all", "completed", "pending" 필터 지원',
                    '배열 메소드 filter()를 활용하세요'
                ]
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.questionTimers = [];
        this.currentQuestionTimer = null;
        this.testResults = [];
        
        // 자동 저장 관련 속성
        this.autoSaveTimer = null;
        this.saveIndicator = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showScreen('start');
    }
    
    bindEvents() {
        document.getElementById('start-test-btn').addEventListener('click', () => this.startTest());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('submit-btn').addEventListener('click', () => this.submitTest());
        document.getElementById('review-btn').addEventListener('click', () => this.showReview());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartTest());
        document.getElementById('close-review-btn').addEventListener('click', () => this.closeReview());
        
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
        }, 1000);
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
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
        this.currentQuestionTimer = setInterval(updateTimer, 1000);
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
        
        hintContent.innerHTML = question.hints.map((hint, index) => 
            `<div class="hint-item">
                <strong>힌트 ${index + 1}:</strong> ${hint}
            </div>`
        ).join('');
        
        hintPanel.style.display = 'block';
    }
    
    closeHint() {
        document.getElementById('hint-panel').style.display = 'none';
    }
    
    autoSaveCode() {
        // 기존 타이머 취소
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }
        
        // 저장 중 표시
        this.showSaveIndicator('저장 중...');
        
        // 디바운싱: 500ms 후 저장
        this.autoSaveTimer = setTimeout(() => {
            const code = document.getElementById('code-editor').value;
            this.userAnswers[this.currentQuestionIndex] = code;
            
            // 로컬 스토리지에 백업
            this.saveToLocalStorage();
            
            // 저장 완료 표시
            this.showSaveIndicator('저장됨', 'success');
            
            // 네비게이션 상태 업데이트
            this.updateNavigation();
            
            // 2초 후 표시 제거
            setTimeout(() => {
                this.hideSaveIndicator();
            }, 2000);
        }, 500);
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
                
                if (timeDiff < 24 * 60 * 60 * 1000) { // 24시간
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
            document.querySelector('.editor-actions').appendChild(this.saveIndicator);
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
                                    ${question.hints.map(hint => `<li>${hint}</li>`).join('')}
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
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById(`${screenName}-screen`).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JavaScriptMidtermTest();
});