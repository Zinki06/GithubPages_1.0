// 📚 문제 데이터 정의
// 새로운 테스트를 만들 때는 이 파일의 QUESTIONS 배열만 수정하면 됩니다.

const QUESTIONS = [
    {
        id: 1,
        category: '배열 조작',
        title: '배열 뒤집기',
        text: '주어진 배열을 뒤집어서 반환하는 함수를 작성하세요.',
        description: '조건: 원본 배열은 변경하지 않습니다. 입력 배열의 길이는 0~1000입니다.',
        type: 'coding',
        difficulty: '하',
        timeLimit: 5,
        starterCode: `function reverseArray(arr) {
    // 여기에 코드를 작성하세요
    
}`,
        testCases: [
            { input: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
            { input: [[]], expected: [] },
            { input: [['a','b','c']], expected: ['c','b','a'] },
            { input: [[1]], expected: [1] },
            { input: [[1,2]], expected: [2,1] }
        ],
        hints: {
            level1: [
                '내장 메소드를 사용할 수 있습니다',
                '원본 배열을 변경하지 않도록 주의하세요',
                'slice()와 reverse() 조합을 생각해보세요'
            ],
            level2: [
                'arr.slice().reverse() 패턴을 사용하세요',
                'slice()는 복사본을 만들고, reverse()는 뒤집습니다',
                '또는 spread 연산자와 reverse() 조합도 가능합니다'
            ],
            level3: `function reverseArray(arr) {
    // 원본 배열을 변경하지 않기 위해 복사본 생성
    // 방법 1: slice() 사용
    return /* 여기에 복사 후 뒤집기 코드 작성 */;
    
    // 방법 2: spread 연산자 사용
    // return [...arr]./* 여기에 뒤집기 메소드 작성 */;
    
    // 방법 3: 수동으로 뒤집기
    // const result = [];
    // for (let i = arr.length - 1; i >= 0; i--) {
    //     result.push(/* 여기에 요소 추가 코드 작성 */);
    // }
    // return result;
}`
        }
    },
    {
        id: 2,
        category: '기본 연산',
        title: '배열 합계 구하기',
        text: '숫자 배열의 모든 요소의 합을 구하는 함수를 작성하세요.',
        description: '조건: 입력은 숫자로만 구성된 배열입니다. 빈 배열의 경우 0을 반환합니다.',
        type: 'coding',
        difficulty: '하',
        timeLimit: 5,
        starterCode: `function sumArray(numbers) {
    // 여기에 코드를 작성하세요
    
}`,
        testCases: [
            { input: [[1,2,3,4,5]], expected: 15 },
            { input: [[]], expected: 0 },
            { input: [[10,20,30]], expected: 60 },
            { input: [[-1,-2,-3]], expected: -6 },
            { input: [[0,0,0]], expected: 0 }
        ],
        hints: {
            level1: [
                'for 루프나 reduce 메소드를 사용할 수 있습니다',
                '빈 배열 처리를 잊지 마세요',
                '누적 변수를 0으로 초기화하세요'
            ],
            level2: [
                'reduce 메소드: arr.reduce((sum, num) => sum + num, 0)',
                'for 루프: let sum = 0; for문으로 모든 요소 더하기',
                '초기값 0은 빈 배열 처리에도 도움이 됩니다'
            ],
            level3: `function sumArray(numbers) {
    // 방법 1: reduce 사용
    return numbers.reduce((/* 누적값 */, /* 현재값 */) => {
        return /* 여기에 더하기 연산 작성 */;
    }, /* 여기에 초기값 작성 */);
    
    // 방법 2: for 루프 사용
    // let sum = /* 여기에 초기값 작성 */;
    // for (let i = 0; i < numbers.length; i++) {
    //     sum += /* 여기에 배열 요소 접근 코드 작성 */;
    // }
    // return sum;
}`
        }
    },
    {
        id: 3,
        category: '문자열 처리',
        title: '문자열 길이 확인',
        text: '문자열이 주어진 최대 길이 이하인지 확인하는 함수를 작성하세요.',
        description: '조건: 첫 번째 인수는 확인할 문자열, 두 번째 인수는 최대 길이입니다. 길이가 이하이면 true, 초과하면 false를 반환합니다.',
        type: 'coding',
        difficulty: '하',
        timeLimit: 5,
        starterCode: `function checkLength(str, maxLength) {
    // 여기에 코드를 작성하세요
    
}`,
        testCases: [
            { input: ['hello', 10], expected: true },
            { input: ['javascript', 5], expected: false },
            { input: ['', 0], expected: true },
            { input: ['test', 4], expected: true },
            { input: ['programming', 8], expected: false }
        ],
        hints: {
            level1: [
                'string.length 속성을 사용하세요',
                '비교 연산자를 사용하여 조건을 확인하세요',
                '이하 조건은 <= 연산자를 사용합니다'
            ],
            level2: [
                'str.length <= maxLength 조건을 확인하세요',
                '결과를 boolean 값으로 직접 반환할 수 있습니다',
                'if문 없이도 비교 결과를 바로 return 가능합니다'
            ],
            level3: `function checkLength(str, maxLength) {
    // 문자열의 길이를 구하고 최대 길이와 비교
    // string.length 속성으로 문자열 길이 확인
    
    return /* 여기에 길이 비교 조건 작성 */;
    
    // 힌트: str.length <= maxLength 형태로 비교
    // 비교 결과는 자동으로 boolean 값이 됩니다
}`
        }
    }
];

// 💡 새 문제 추가 예시:
// {
//     id: 4,  // 다음 순번
//     category: '새 카테고리',
//     title: '새 문제 제목',
//     text: '문제 설명...',
//     description: '상세 조건...',
//     type: 'coding',
//     difficulty: '중',  // '하', '중', '상'
//     timeLimit: 10,     // 분 단위
//     starterCode: `function 함수명() {
//         // 시작 코드
//     }`,
//     testCases: [
//         { input: [/* 입력값 */], expected: /* 예상 결과 */ }
//     ],
//     hints: {
//         level1: ['기본 힌트'],
//         level2: ['구체적 힌트'],
//         level3: `코드 가이드 템플릿`
//     }
// } 