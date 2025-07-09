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
                hints: {
                    level1: [
                        'toString() 메소드에 진법을 인수로 전달할 수 있습니다',
                        'Number.prototype.toString(radix) 활용하세요',
                        '각 진법별로 toString(2), toString(8), toString(16)을 사용하세요'
                    ],
                    level2: [
                        'decimal.toString(2)로 2진수, toString(8)로 8진수, toString(16)로 16진수를 구할 수 있습니다',
                        '객체 리터럴 {binary: value, octal: value, hex: value} 형태로 반환하세요',
                        '모든 결과는 문자열이므로 toString() 결과를 그대로 사용하면 됩니다'
                    ],
                    level3: `function convertBase(decimal) {
    // 힌트: 각 진법으로 변환하는 메소드가 있습니다
    // Number.prototype.toString(radix) 메소드를 사용하세요
    
    // 2진수 변환: decimal.toString(2)
    // 8진수 변환: decimal.toString(8)  
    // 16진수 변환: decimal.toString(16)
    
    return {
        binary: /* 여기에 2진수 변환 코드 작성 */,
        octal: /* 여기에 8진수 변환 코드 작성 */,
        hex: /* 여기에 16진수 변환 코드 작성 */
    };
}`
                }
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
                hints: {
                    level1: [
                        'split() 메소드로 단어를 나눌 수 있습니다',
                        'trim() 메소드로 앞뒤 공백을 제거하세요',
                        '빈 문자열 처리를 주의하세요'
                    ],
                    level2: [
                        'str.length로 전체 길이, str.split(" ")로 단어 분리',
                        '공백 개수는 정규식이나 반복문으로 카운트하세요',
                        '단어 개수는 split 결과에서 빈 문자열이 아닌 것만 세어야 합니다',
                        'first는 str[0], last는 str[str.length-1]'
                    ],
                    level3: `function analyzeString(str) {
    // 분석할 정보들을 담을 객체를 만듭니다
    const result = {
        length: /* 문자열의 길이는 str.length로 구할 수 있습니다 */,
        spaces: 0,
        words: 0,
        first: /* 첫 번째 문자: str[0] 또는 빈 문자열일 때 처리 */,
        last: /* 마지막 문자: str[str.length - 1] 또는 빈 문자열일 때 처리 */
    };
    
    // 공백 개수 계산하기
    for (let i = 0; i < str.length; i++) {
        if (/* 여기에 공백 체크 조건 작성 */) {
            result.spaces++;
        }
    }
    
    // 단어 개수 계산하기 (연속 공백은 하나로 취급)
    if (str.trim().length > 0) {
        // 힌트: trim()으로 앞뒤 공백 제거 후 정규식 \\s+로 연속 공백 처리
        result.words = /* 여기에 단어 개수 계산 코드 작성 */;
    }
    
    return result;
}`
                }
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
                hints: {
                    level1: [
                        'truthy/falsy 개념을 활용하세요',
                        'includes() 메소드로 문자 포함 여부를 확인하세요',
                        '논리 연산자를 활용하세요'
                    ],
                    level2: [
                        'errors 배열을 만들어 유효하지 않은 필드명을 수집하세요',
                        'name: 빈 문자열이 아니고 trim()한 결과가 있어야 함',
                        'age: 숫자이면서 0보다 커야 함',
                        'email: 문자열이면서 "@"를 포함해야 함'
                    ],
                    level3: `function validateValues(obj) {
    const errors = []; // 유효하지 않은 필드명을 담을 배열입니다.

    // 힌트 1: obj 자체가 유효한 객체인지 먼저 확인하는 조건을 추가할 수 있습니다.
    // if (!obj || typeof obj !== 'object') {
    //     return { valid: false, errors: ['input object is invalid'] };
    // }

    // 'name' 필드 유효성 검사 예시:
    // 이름이 없거나, 문자열이 아니거나, 공백만 있는 경우
    if (!obj.name || typeof obj.name !== 'string' || obj.name.trim() === '') {
        errors.push('name');
    }

    // 'age' 필드 유효성 검사 힌트:
    // 나이가 없거나, 숫자가 아니거나, 0보다 작거나 같은 경우를 확인하세요.
    if (typeof obj.age !== 'number' || obj.age <= 0) {
        errors.push('age');
    }

    // 'email' 필드 유효성 검사 힌트:
    // 이메일이 없거나, 문자열이 아니거나, '@' 문자를 포함하지 않는 경우를 확인하세요.
    if (!obj.email || typeof obj.email !== 'string' || !obj.email.includes('@')) {
        errors.push('email');
    }

    // 최종 결과 반환:
    // errors 배열이 비어있으면 valid: true, 아니면 valid: false
    return {
        valid: errors.length === 0,
        errors: errors
    };
}`
                }
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
                hints: {
                    level1: [
                        '클로저를 사용하여 private 변수를 만드세요',
                        '객체를 반환하여 여러 메소드를 제공하세요',
                        'increment()는 값을 1 증가, decrement()는 1 감소시킵니다',
                        'getValue()는 현재 값 반환, reset()은 초기값으로 복원합니다',
                        '기본값 매개변수를 활용하세요'
                    ],
                    level2: [
                        '내부에 current와 initial 변수를 선언하여 상태를 관리하세요',
                        '각 메소드는 current 값을 조작하고 필요시 값을 반환합니다',
                        '클로저로 인해 각 카운터는 독립적인 상태를 가집니다',
                        'return 문에서 메소드들을 객체로 묶어 반환하세요'
                    ],
                    level3: `function createCounter(initialValue = 0) {
    // 클로저를 활용하여 private 변수를 만듭니다
    let current = /* 현재 카운터 값을 저장할 변수 */;
    const initial = /* 초기값을 저장할 변수 (reset용) */;
    
    // 메소드들을 가진 객체를 반환합니다
    return {
        increment: function() {
            // 힌트: current 값을 1 증가시키세요
            /* 여기에 증가 코드 작성 */
        },
        decrement: function() {
            // 힌트: current 값을 1 감소시키세요
            /* 여기에 감소 코드 작성 */
        },
        getValue: function() {
            // 힌트: 현재 값을 반환하세요
            return /* 여기에 현재 값 반환 코드 작성 */;
        },
        reset: function() {
            // 힌트: current를 초기값으로 복원하세요
            /* 여기에 리셋 코드 작성 */
        }
    };
}`
                }
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
                hints: {
                    level1: [
                        '중첩 반복문을 사용하세요',
                        '각 줄은 (n-i)개의 공백 + (2*i-1)개의 별로 구성됩니다',
                        'repeat() 메소드를 활용할 수 있습니다',
                        'i는 1부터 n까지 반복합니다'
                    ],
                    level2: [
                        'i번째 줄(1부터 시작)에는 (n-i)개 공백과 (2*i-1)개 별이 필요합니다',
                        '각 줄을 배열에 저장한 후 join("\\n")으로 연결하거나',
                        '문자열을 직접 연결하되 마지막 줄에는 \\n을 추가하지 마세요',
                        '" ".repeat(count)와 "*".repeat(count) 메소드가 유용합니다'
                    ],
                    level3: `function createPyramid(n) {
    // 각 줄을 저장할 배열을 준비합니다
    const lines = [];
    
    // i번째 줄(1부터 n까지)을 만드는 반복문
    for (let i = 1; i <= n; i++) {
        // 각 줄의 구성: (n-i)개의 공백 + (2*i-1)개의 별
        
        // 공백 개수 계산: n - i
        const spaces = /* ' '.repeat()를 사용하여 공백 문자열 생성 */;
        
        // 별 개수 계산: 2 * i - 1
        const stars = /* '*'.repeat()를 사용하여 별 문자열 생성 */;
        
        // 공백과 별을 결합하여 한 줄 완성
        lines.push(/* 여기에 spaces + stars 코드 작성 */);
    }
    
    // 배열의 모든 줄을 \\n으로 연결하여 반환
    return /* 여기에 join() 메소드 사용 코드 작성 */;
    
    // 참고: 직접 문자열로 만드는 방법도 있습니다
    // let result = '';
    // for (let i = 1; i <= n; i++) {
    //     result += ' '.repeat(n - i) + '*'.repeat(2 * i - 1);
    //     if (i < n) result += '\\n'; // 마지막 줄이 아니면 개행 추가
    // }
    // return result;
}`
                }
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
                hints: {
                    level1: [
                        '생성자 함수에서 this로 속성을 초기화하세요',
                        '프로토타입에 메소드를 정의하세요',
                        '배열의 push(), reduce() 메소드를 활용하세요',
                        '등급 기준: 90+ A, 80+ B, 70+ C, 60+ D, 나머지 F'
                    ],
                    level2: [
                        'Student 생성자에서 this.name과 this.scores = [] 초기화',
                        'addScore는 this.scores.push(score)로 점수 추가',
                        'getAverage는 scores 배열의 합계를 길이로 나누기',
                        'getGrade는 평균을 구한 후 조건문으로 등급 판정'
                    ],
                    level3: `function Student(name) {
    // 생성자 함수에서 속성을 초기화합니다
    this.name = /* 이름을 저장할 속성 */;
    this.scores = /* 점수들을 저장할 빈 배열 */;
}

Student.prototype.addScore = function(score) {
    // 힌트: 배열에 새 점수를 추가하는 메소드를 사용하세요
    /* 여기에 점수 추가 코드 작성 */;
};

Student.prototype.getAverage = function() {
    // 점수가 없을 때 처리
    if (this.scores.length === 0) {
        return 0;
    }
    
    // 배열의 모든 점수 합계를 구하기
    // 힌트: reduce() 메소드를 사용하여 합계를 계산하세요
    const sum = /* 여기에 합계 계산 코드 작성 */;
    
    // 평균 = 합계 / 개수
    return /* 여기에 평균 계산 코드 작성 */;
};

Student.prototype.getGrade = function() {
    const average = this.getAverage(); // 평균 점수 구하기
    
    // 평균에 따른 등급 반환
    // 90+ : A, 80+ : B, 70+ : C, 60+ : D, 그 외 : F
    if (average >= 90) return 'A';
    if (/* 여기에 B 등급 조건 작성 */) return 'B';
    if (/* 여기에 C 등급 조건 작성 */) return 'C';
    if (/* 여기에 D 등급 조건 작성 */) return 'D';
    return 'F';
};`
                }
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
                hints: {
                    level1: [
                        'Set 사용은 금지입니다',
                        'filter() 메소드와 indexOf() 메소드를 조합하세요',
                        '첫 번째 등장 위치와 현재 위치를 비교하세요',
                        'includes() 메소드와 새 배열을 만들어가는 방법도 있습니다'
                    ],
                    level2: [
                        'filter((item, index) => arr.indexOf(item) === index) 패턴 활용',
                        'indexOf는 해당 요소가 처음 등장하는 인덱스를 반환합니다',
                        '현재 인덱스와 첫 등장 인덱스가 같으면 중복이 아닙니다',
                        '또는 빈 배열에 하나씩 추가하면서 includes()로 중복 체크'
                    ],
                    level3: `function removeDuplicates(arr) {
    // 방법 1: filter와 indexOf 사용 (가장 효율적)
    return arr.filter((item, index) => {
        // 힌트: 현재 요소가 처음 등장하는 위치와 현재 위치를 비교
        // indexOf()는 해당 요소가 처음 등장하는 인덱스를 반환합니다
        return /* 여기에 중복 체크 조건 작성 */;
    });
    
    // 방법 2: 새 배열을 만들어가며 중복 체크
    // const result = [];
    // for (let i = 0; i < arr.length; i++) {
    //     // includes() 메소드로 이미 포함되어 있는지 확인
    //     if (/* 여기에 중복 체크 조건 작성 */) {
    //         result.push(arr[i]);
    //     }
    // }
    // return result;
    
    // 방법 3: forEach와 includes 사용
    // const result = [];
    // arr.forEach(item => {
    //     if (/* 여기에 중복 체크 조건 작성 */) {
    //         /* 여기에 배열 추가 코드 작성 */;
    //     }
    // });
    // return result;
}`
                }
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
                hints: {
                    level1: [
                        '처리 순서: 1) 짝수만 필터링 2) 각 숫자를 제곱 3) 모든 값의 합계',
                        'filter(), map(), reduce() 메소드를 순서대로 사용하세요',
                        '메소드 체이닝을 활용하세요',
                        '짝수 판별은 % 2 === 0을 사용하세요'
                    ],
                    level2: [
                        'numbers.filter(n => n % 2 === 0)로 짝수만 필터링',
                        '.map(n => n * n)으로 각 숫자를 제곱',
                        '.reduce((sum, n) => sum + n, 0)으로 합계 계산',
                        '빈 배열이거나 짝수가 없으면 reduce의 초기값 0이 반환됨'
                    ],
                    level3: `function processNumbers(numbers) {
    // 메소드 체이닝으로 단계별 처리
    return numbers
        .filter(/* 여기에 짝수 필터링 조건 작성 */)    // 1. 짝수만 필터링 (num % 2 === 0)
        .map(/* 여기에 제곱 변환 코드 작성 */)         // 2. 각 숫자를 제곱 (num => num * num)
        .reduce(/* 여기에 합계 계산 코드 작성 */, 0);   // 3. 모든 값의 합계 ((sum, num) => sum + num, 0)
    
    // 단계별로 나누어 처리하는 방법:
    // const evenNumbers = numbers.filter(/* 짝수 조건 */);
    // const squaredNumbers = evenNumbers.map(/* 제곱 변환 */);
    // const sum = squaredNumbers.reduce(/* 합계 계산 */, 0);
    // return sum;
}`
                }
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
                hints: {
                    level1: [
                        'Object.assign이나 spread 연산자(...) 사용은 금지입니다',
                        '새 객체를 만들고 속성을 하나씩 복사하세요',
                        'for...in 반복문이나 Object.keys()를 사용하세요',
                        '중첩 객체는 참조가 복사됩니다 (얕은 복사의 특징)'
                    ],
                    level2: [
                        '빈 객체 {}를 만든 후 원본 객체의 모든 속성을 복사',
                        'for...in 루프로 obj의 모든 속성을 순회',
                        '각 속성값을 그대로 새 객체에 할당 (1단계만)',
                        'Object.keys(obj).forEach()나 Object.entries() 활용도 가능'
                    ],
                    level3: `function shallowCopy(obj) {
    // 새 객체 생성
    const copy = {};
    
    // 방법 1: for...in 사용하여 속성 복사
    for (let key in obj) {
        // 객체 자체 속성만 복사 (상속된 속성 제외)
        if (/* 여기에 hasOwnProperty 체크 조건 작성 */) {
            copy[key] = /* 여기에 속성 복사 코드 작성 */; // 1단계 속성 복사
        }
    }
    
    return copy;
    
    // 방법 2: Object.keys() 사용
    // const copy = {};
    // Object.keys(obj).forEach(key => {
    //     copy[key] = /* 여기에 속성 복사 코드 작성 */;
    // });
    // return copy;
    
    // 방법 3: Object.entries() 사용
    // const copy = {};
    // for (const [key, value] of Object.entries(obj)) {
    //     copy[key] = /* 여기에 값 할당 코드 작성 */;
    // }
    // return copy;
}`
                }
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
                hints: {
                    level1: [
                        'var는 함수 스코프이며 호이스팅되지만 undefined로 초기화됩니다',
                        'let과 const는 블록 스코프이며 TDZ(Temporal Dead Zone) 적용',
                        '함수 스코프 vs 블록 스코프의 차이를 이해하세요',
                        '변수 선언이 실행되기 전까지는 상위 스코프의 값을 참조합니다'
                    ],
                    level2: [
                        'var a는 함수 내에서 호이스팅되어 undefined로 초기화',
                        'let b, const c는 함수 내에 선언이 없으므로 상위 스코프 참조',
                        '함수 내 var a = 10 이후에는 지역 변수 a가 10',
                        '함수 내 let b = 20, const c = 30 이후에는 각각 지역 변수'
                    ],
                    level3: `function analyzeScopeExample() {
    // 분석:
    // 1. var a는 함수 스코프로 호이스팅됨 -> undefined
    // 2. let b는 함수 내 선언이 없음 -> 상위 스코프의 2
    // 3. const c는 함수 내 선언이 없음 -> 상위 스코프의 3
    // 4. var a = 10 실행 후 -> 10
    // 5. let b = 20 실행 후 -> 20  
    // 6. const c = 30 실행 후 -> 30
    
    return [undefined, 2, 3, 10, 20, 30];
    
    /* 상세 설명:
    * var a는 함수 스코프 호이스팅으로 함수 시작 시 undefined
    * let b, const c는 함수 내에 선언이 없어 상위 스코프 값 참조
    * 첫 번째 console.log(a)는 호이스팅된 지역 변수 a (undefined)
    * 두 번째 console.log(b)는 상위 스코프의 b (2)
    * 세 번째 console.log(c)는 상위 스코프의 c (3)
    * var a = 10 실행 후 지역 변수 a는 10
    * let b = 20 실행 후 지역 변수 b는 20
    * const c = 30 실행 후 지역 변수 c는 30
    */
}`
                }
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
                hints: {
                    level1: [
                        'bind(), call(), apply() 중 하나를 사용하세요',
                        '메소드를 객체에서 추출할 때 this 바인딩이 사라집니다',
                        'obj[methodName]으로 메소드에 접근할 수 있습니다',
                        'bind()는 새로운 함수를 반환하고, call/apply는 즉시 실행합니다'
                    ],
                    level2: [
                        'obj[methodName]으로 메소드 함수를 가져오기',
                        'method.bind(newContext)로 새로운 this 바인딩',
                        'bind()는 새로운 함수를 반환하므로 이를 return',
                        'call()이나 apply()를 사용한다면 래퍼 함수가 필요'
                    ],
                    level3: `function bindMethod(obj, methodName, newContext) {
    // 메소드 함수를 객체에서 가져오기
    const method = /* 여기에 obj[methodName] 코드 작성 */;
    
    // 방법 1: bind() 사용 (가장 간단)
    return /* 여기에 bind를 사용한 바인딩 코드 작성 */;
    
    // 방법 2: call() 사용
    // return function() {
    //     return method.call(/* 여기에 this 바인딩과 arguments 전달 코드 작성 */);
    // };
    
    // 방법 3: apply() 사용
    // return function() {
    //     return method.apply(/* 여기에 this 바인딩과 arguments 전달 코드 작성 */);
    // };
    
    // 방법 4: 화살표 함수와 call() 조합
    // return (...args) => obj[methodName].call(/* 여기에 바인딩 코드 작성 */);
}`
                }
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
                hints: {
                    level1: [
                        'TodoManager 생성자: this.todos = [], this.lastId = 0',
                        'addTodo: {id: 숫자, text: 문자열, completed: false} 형태로 추가',
                        'completeTodo: 해당 id의 completed를 true로 변경',
                        'getTodos: "all", "completed", "pending" 필터 지원',
                        '배열 메소드 filter()를 활용하세요'
                    ],
                    level2: [
                        '생성자에서 todos 배열과 lastId 카운터 초기화',
                        'addTodo에서 새 할 일 객체 생성, 배열에 추가, ID 반환',
                        'completeTodo에서 find()로 해당 ID 찾아 completed = true',
                        'getTodos에서 filter에 따라 다른 조건으로 필터링'
                    ],
                    level3: `function TodoManager() {
    // 생성자에서 초기화
    this.todos = /* 할 일 목록을 저장할 배열 */;
    this.lastId = /* 마지막 사용된 ID (자동 증가용) */;
}

TodoManager.prototype.addTodo = function(text) {
    // ID 증가
    this.lastId++;
    
    // 새 할 일 객체 생성
    const todo = {
        id: /* 현재 ID 값 */,
        text: /* 입력받은 텍스트 */,
        completed: /* 기본값: 미완료 상태 */
    };
    
    // 배열에 추가
    /* 여기에 todos 배열에 todo 추가 코드 작성 */;
    
    // 생성된 ID 반환
    return /* 여기에 생성된 ID 반환 코드 작성 */;
};

TodoManager.prototype.completeTodo = function(id) {
    // ID로 할 일 찾기
    const todo = this.todos.find(/* 여기에 ID 매칭 조건 작성 */);
    
    if (todo) {
        todo.completed = /* 완료 상태로 변경 */;
    }
    
    // 또는 findIndex 사용하는 방법:
    // const index = this.todos.findIndex(/* ID 매칭 조건 */);
    // if (index !== -1) {
    //     this.todos[index].completed = /* 완료 상태 */;
    // }
};

TodoManager.prototype.getTodos = function(filter = 'all') {
    switch (filter) {
        case 'completed':
            return this.todos.filter(/* 완료된 할 일 조건 작성 */);
        case 'pending':
            return this.todos.filter(/* 미완료 할 일 조건 작성 */);
        case 'all':
        default:
            return /* 전체 배열의 복사본 반환 (slice() 사용) */;
    }
};`
                }
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
        console.log('=== 라이브러리 로딩 상태 확인 ===');
        console.log('jsPDF:', typeof window.jspdf !== 'undefined' ? '✓ 로드됨' : '✗ 로드 실패');
        console.log('html2canvas:', typeof html2canvas !== 'undefined' ? '✓ 로드됨' : '✗ 로드 실패');
        console.log('hljs:', typeof hljs !== 'undefined' ? '✓ 로드됨' : '✗ 로드 실패');
        
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
        }, 1000);
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
        console.log('PDF 생성 시작...');
        
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
            '진법 변환기': 'Base Converter',
            '문자열 분석기': 'String Analyzer',
            '값 유효성 검사기': 'Value Validator',
            '카운터 생성기': 'Counter Generator',
            '패턴 출력기': 'Pattern Generator',
            '학생 성적 관리': 'Student Grade Manager',
            '중복 제거 함수': 'Duplicate Remover',
            '데이터 변환 파이프라인': 'Data Transform Pipeline',
            '객체 얕은 복사': 'Object Shallow Copy',
            '스코프 분석기': 'Scope Analyzer',
            '메소드 바인딩 도구': 'Method Binding Tool',
            '간단한 할 일 관리자': 'Simple Todo Manager'
        };

        // 카테고리를 영문으로 매핑
        const categoryMapping = {
            'Number 타입 (4차시)': 'Number Type (Lesson 4)',
            'String 타입 (5차시)': 'String Type (Lesson 5)',
            'Boolean 타입 (6차시)': 'Boolean Type (Lesson 6)',
            '함수와 스코프 (8차시)': 'Functions & Scope (Lesson 8)',
            '제어 구문 (9차시)': 'Control Statements (Lesson 9)',
            '객체와 프로토타입 (10차시)': 'Objects & Prototypes (Lesson 10)',
            '배열 조작 (11차시)': 'Array Manipulation (Lesson 11)',
            '고차 함수 (11차시)': 'Higher-Order Functions (Lesson 11)',
            '참조와 값 (12차시)': 'Reference & Value (Lesson 12)',
            '호이스팅과 스코프 (12차시)': 'Hoisting & Scope (Lesson 12)',
            'this 바인딩 (13차시)': 'this Binding (Lesson 13)',
            '종합 응용': 'Comprehensive Application'
        };

        try {
            console.log('jsPDF 인스턴스 생성 중...');
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
            const fileName = `JavaScript_Midterm_Test_Results_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.pdf`;
            
            let y = 20;
            const pageWidth = 210;
            const margin = 20;
            const contentWidth = pageWidth - (margin * 2);

            console.log('PDF 내용 생성 중...');
            
            // === 헤더 섹션 ===
            // 배경 그라데이션 효과 (사각형으로 구현)
            doc.setFillColor(...colors.primary);
            doc.rect(0, 0, pageWidth, 50, 'F');
            
            // 헤더 텍스트
            doc.setTextColor(...colors.white);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('JavaScript Midterm Test', pageWidth/2, 25, { align: 'center' });
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.text('Comprehensive Assessment Report', pageWidth/2, 35, { align: 'center' });
            
            y = 60;
            
            // === 요약 정보 섹션 ===
            doc.setTextColor(...colors.dark);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('📊 Test Summary', margin, y);
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
            doc.text(`📅 Date: ${now.toLocaleDateString('en-US', { 
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
                doc.text(`🎯 Final Score: ${totalScore}/100 (${totalScore}%)`, margin + 5, y + 20);
                
                doc.setTextColor(...colors.dark);
                doc.setFont('helvetica', 'normal');
                doc.text(`⏱️ Total Time: ${timeStr}`, margin + 5, y + 30);
                doc.text(`📝 Questions: ${this.questions.length}`, margin + 100, y + 30);
            }
            
            y += 45;
            
            // === 성능 지표 ===
            if (this.results) {
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...colors.dark);
                doc.text('📈 Performance Metrics', margin, y);
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
            doc.text('📋 Detailed Results', margin, y);
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
                    doc.text('JavaScript Midterm Test - Continued', pageWidth/2, 15, { align: 'center' });
                    
                    y = 35;
                }

                console.log(`문제 ${index + 1} 처리 중...`);

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
                const statusText = passed ? '✅ CORRECT' : passedCount > 0 ? '⚠️ PARTIAL' : '❌ INCORRECT';
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
                doc.text('💻 Submitted Code:', margin, y);
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
                doc.text('JavaScript Midterm Assessment System', pageWidth/2, 296, { align: 'center' });
            }

            console.log('PDF 저장 중...');
            this.hideLoadingState();
            this.showLoadingState('파일 저장 중...', 'success');
            
            doc.save(fileName);
            console.log('PDF 생성 완료!');
            
            setTimeout(() => {
                this.hideLoadingState();
                this.showNotification(`🎉 PDF가 성공적으로 생성되었습니다!\n파일명: ${fileName}`, 'success');
            }, 500);

        } catch (error) {
            console.error('PDF 생성 중 상세 오류:', error);
            this.hideLoadingState();
            
            let errorMessage = '❌ PDF 생성 중 오류가 발생했습니다.\n\n';
            errorMessage += `오류 유형: ${error.name}\n`;
            errorMessage += `상세 내용: ${error.message}\n\n`;
            errorMessage += '텍스트 파일로 결과를 저장하시겠습니까?';
            
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
            processing: '⚙️',
            success: '✅',
            error: '❌'
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
            ${type === 'processing' ? '<div style="font-size: 12px; color: #7f8c8d; text-align: center;">잠시만 기다려주세요...</div>' : ''}
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
            success: '🎉',
            error: '❌',
            info: 'ℹ️'
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
        }, type === 'error' ? 6000 : 4000); // 에러 메시지는 더 오래 표시
        
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
            const fileName = `JavaScript_Midterm_Test_Results_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.txt`;
            
            let content = '=== JavaScript Midterm Test Results ===\n\n';
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
                '진법 변환기': 'Base Converter',
                '문자열 분석기': 'String Analyzer',
                '값 유효성 검사기': 'Value Validator',
                '카운터 생성기': 'Counter Generator',
                '패턴 출력기': 'Pattern Generator',
                '학생 성적 관리': 'Student Grade Manager',
                '중복 제거 함수': 'Duplicate Remover',
                '데이터 변환 파이프라인': 'Data Transform Pipeline',
                '객체 얕은 복사': 'Object Shallow Copy',
                '스코프 분석기': 'Scope Analyzer',
                '메소드 바인딩 도구': 'Method Binding Tool',
                '간단한 할 일 관리자': 'Simple Todo Manager'
            };

            const categoryMapping = {
                'Number 타입 (4차시)': 'Number Type (Lesson 4)',
                'String 타입 (5차시)': 'String Type (Lesson 5)',
                'Boolean 타입 (6차시)': 'Boolean Type (Lesson 6)',
                '함수와 스코프 (8차시)': 'Functions & Scope (Lesson 8)',
                '제어 구문 (9차시)': 'Control Statements (Lesson 9)',
                '객체와 프로토타입 (10차시)': 'Objects & Prototypes (Lesson 10)',
                '배열 조작 (11차시)': 'Array Manipulation (Lesson 11)',
                '고차 함수 (11차시)': 'Higher-Order Functions (Lesson 11)',
                '참조와 값 (12차시)': 'Reference & Value (Lesson 12)',
                '호이스팅과 스코프 (12차시)': 'Hoisting & Scope (Lesson 12)',
                'this 바인딩 (13차시)': 'this Binding (Lesson 13)',
                '종합 응용': 'Comprehensive Application'
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