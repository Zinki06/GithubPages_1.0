class JavaScriptMidtermTest {
    constructor() {
        this.questions = [
            {
                id: 1,
                category: 'Number/String 복합',
                title: '암호화 시스템',
                text: '문자열을 숫자 기반으로 암호화하고 복호화하는 시스템을 구현하세요.',
                description: '각 문자의 ASCII 코드에 시프트 값을 더해 암호화하고, 결과를 16진수로 변환합니다.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 5 * 60,
                starterCode: `function createCipher(shift) {
    return {
        encrypt: function(text) {
            // 암호화: 각 문자 ASCII + shift → 16진수 변환
        },
        decrypt: function(encryptedHex) {
            // 복호화: 16진수 → ASCII - shift → 문자
        }
    };
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const cipher = createCipher(3);
                            const encrypted = cipher.encrypt('ABC');
                            if (encrypted !== '444748') return { passed: false, result: 'Encrypt failed for ABC' };
                            const decrypted = cipher.decrypt('44474a');
                            if (decrypted !== 'ABD') return { passed: false, result: 'Decrypt failed for 44474a' };
                            return { passed: true, result: 'OK' };
                        `,
                        expected: { passed: true, result: 'OK' }
                    },
                    {
                        input: 'custom',
                        test: `
                            const cipher = createCipher(10);
                            const encrypted = cipher.encrypt('Hello');
                            if (encrypted !== '4c6f727676') return { passed: false, result: 'Encrypt failed for Hello' };
                            const decrypted = cipher.decrypt(encrypted);
                            if (decrypted !== 'Hello') return { passed: false, result: 'Decrypt failed for ' + encrypted };
                            return { passed: true, result: 'OK' };
                        `,
                        expected: { passed: true, result: 'OK' }
                    }
                ],
                hints: [
                    'String.prototype.charCodeAt(index)로 문자의 ASCII 코드를 얻을 수 있습니다.',
                    'String.fromCharCode(ascii)로 ASCII 코드에서 문자를 얻을 수 있습니다.',
                    'Number.prototype.toString(16)으로 16진수 문자열로 변환할 수 있습니다.',
                    '암호화: text.split("").map(char => (char.charCodeAt(0) + shift).toString(16)).join("")',
                    '복호화: encryptedHex.match(/.{2}/g).map(hex => String.fromCharCode(parseInt(hex, 16) - shift)).join("")',
                    '두 자리 16진수로 통일하려면 padStart(2, "0")을 사용하세요. 예: hex.padStart(2, "0")'
                ]
            },
            {
                id: 2,
                category: 'String 고급 처리',
                title: '템플릿 엔진',
                text: '간단한 템플릿 엔진을 구현하여 변수 치환을 수행하세요.',
                description: '{{변수명}} 형태를 data 객체의 값으로 치환합니다. 중첩 객체도 지원합니다(예: {{user.name}}).',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 6 * 60,
                starterCode: `function templateEngine(template, data) {
    // 여기에 코드를 작성하세요
}`,
                testCases: [
                    { input: ['Hello {{name}}!', { name: 'World' }], expected: 'Hello World!' },
                    { input: ['{{user.name}} is {{user.age}} years old', { user: { name: 'Kim', age: 25 } }], expected: 'Kim is 25 years old' },
                    { input: ['Price: ${{price}} ({{currency}})', { price: 100, currency: 'USD' }], expected: 'Price: $100 (USD)' },
                    { input: ['No variables here', { a: 1 }], expected: 'No variables here' },
                ],
                hints: [
                    'String.prototype.replace() 메소드를 정규식과 함께 사용할 수 있습니다.',
                    '정규식 그룹을 사용하여 중괄호 안의 변수명을 추출하세요. /{{\\s*([\\w.]+)\\s*}}/g',
                    '추출된 변수명(예: "user.name")을 점(.)으로 분리하여 객체에 순차적으로 접근해야 합니다.',
                    'replace의 두 번째 인자로 함수를 전달할 수 있습니다: template.replace(regex, (match, varName) => { ... })',
                    '중첩 객체 접근: varName.split(".").reduce((obj, key) => obj && obj[key], data)',
                    '변수가 존재하지 않는 경우 빈 문자열이나 원본 텍스트를 반환하도록 처리하세요.'
                ]
            },
            {
                id: 3,
                category: 'Boolean 복합 논리',
                title: '권한 검사 시스템',
                text: '복잡한 권한 규칙을 검사하는 시스템을 구현하세요.',
                description: '규칙: 1. admin은 모든 권한, 2. owner는 자신의 리소스에 대한 모든 권한, 3. member는 read 권한만, 4. guest는 public 리소스의 read 권한만 가집니다.',
                type: 'coding',
                difficulty: '중상',
                timeLimit: 6 * 60,
                starterCode: `function checkPermissions(user, resource, action) {
    // 여기에 코드를 작성하세요
}`,
                testCases: [
                    { input: [{ role: 'admin', id: 1 }, { ownerId: 2, isPublic: false }, 'delete'], expected: true },
                    { input: [{ role: 'owner', id: 2 }, { ownerId: 2, isPublic: false }, 'write'], expected: true },
                    { input: [{ role: 'member', id: 1 }, { ownerId: 2, isPublic: false }, 'write'], expected: false },
                    { input: [{ role: 'member', id: 1 }, { ownerId: 2, isPublic: true }, 'read'], expected: true },
                    { input: [{ role: 'guest', id: 3 }, { ownerId: 2, isPublic: true }, 'read'], expected: true },
                    { input: [{ role: 'guest', id: 3 }, { ownerId: 2, isPublic: false }, 'read'], expected: false },
                ],
                hints: [
                    '논리 연산자 `||`와 `&&`를 사용하여 조건을 조합하세요.',
                    'if/else if/else 문이나 switch 문을 사용할 수 있습니다.',
                    '역할(role)에 따라 분기하여 각기 다른 조건을 검사하는 것이 깔끔합니다.',
                    'admin 체크: user.role === "admin"',
                    'owner 체크: user.role === "owner" && user.id === resource.ownerId',
                    'member/guest의 read 권한: action === "read" && (resource.isPublic || user.role === "member")'
                ]
            },
            {
                id: 4,
                category: 'Boolean 상태 머신',
                title: '신호등 상태 관리',
                text: '신호등의 상태 전환을 관리하는 시스템을 구현하세요.',
                description: '상태는 \'red\' → \'green\' → \'yellow\' → \'red\' 순으로 변경됩니다. 현재 상태 확인, 다음 상태 변경, 통과 가능 여부 확인 메소드를 구현해야 합니다.',
                type: 'coding',
                difficulty: '중',
                timeLimit: 5 * 60,
                starterCode: `function TrafficLight() {
    // 여기에 코드를 작성하세요
}
// 프로토타입을 사용해서 메소드를 정의하세요.
// 예: TrafficLight.prototype.next = function() { ... };`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const light = new TrafficLight();
                            if (light.getCurrentState() !== 'red') return { passed: false, reason: 'Initial state is not red' };
                            light.next();
                            if (light.getCurrentState() !== 'green') return { passed: false, reason: 'State after first next() is not green' };
                            if (!light.canGo()) return { passed: false, reason: 'canGo() should be true for green' };
                            light.next();
                            if (light.getCurrentState() !== 'yellow') return { passed: false, reason: 'State after second next() is not yellow' };
                            light.next();
                            if (light.getCurrentState() !== 'red') return { passed: false, reason: 'State should be red after yellow' };
                            if (light.canGo()) return { passed: false, reason: 'canGo() should be false for red' };
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '생성자 함수 내에서 `this`를 사용하여 현재 상태를 저장하는 변수를 초기화하세요. (예: `this.currentState = ...`)',
                    '클로저를 사용하여 private 변수로 상태를 관리할 수도 있습니다.',
                    '`next` 메소드에서는 현재 상태에 따라 다음 상태로 변경하는 로직을 구현하세요.',
                    'function TrafficLight() { this.state = "red"; }',
                    'TrafficLight.prototype.next = function() { const states = ["red", "green", "yellow"]; ... }',
                    'canGo() 메소드는 this.state === "green"을 반환하면 됩니다.'
                ]
            },
            {
                id: 5,
                category: '함수형 프로그래밍',
                title: '함수 조합기 (compose, pipe)',
                text: '함수들을 조합하여 새로운 함수를 만드는 compose와 pipe 함수를 구현하세요.',
                description: 'compose는 함수를 오른쪽에서 왼쪽으로, pipe는 왼쪽에서 오른쪽으로 합성합니다. (예: compose(f, g, h)(x)는 f(g(h(x)))와 같습니다)',
                type: 'coding',
                difficulty: '상',
                timeLimit: 7 * 60,
                starterCode: `function compose(...functions) {
    // 여기에 코드를 작성하세요
}
    
function pipe(...functions) {
    // 여기에 코드를 작성하세요
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const add1 = x => x + 1;
                            const double = x => x * 2;
                            const square = x => x * x;
                            const composed = compose(square, double, add1);
                            const piped = pipe(add1, double, square);
                            if (composed(3) !== 64) return { passed: false, reason: 'compose failed' };
                            if (piped(3) !== 49) return { passed: false, reason: 'pipe failed' };
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '`compose`는 `reduceRight`, `pipe`는 `reduce`를 사용하여 구현할 수 있습니다.',
                    '반환되는 함수는 초기값을 받아 각 함수를 순차적으로 적용해야 합니다.',
                    '나머지 매개변수(`...functions`)를 활용하여 여러 개의 함수를 인자로 받으세요.',
                    'compose: return (input) => functions.reduceRight((acc, fn) => fn(acc), input)',
                    'pipe: return (input) => functions.reduce((acc, fn) => fn(acc), input)',
                    '빈 함수 배열일 때는 입력값을 그대로 반환하는 항등함수를 반환하세요.'
                ]
            },
            {
                id: 6,
                category: '고급 클로저',
                title: '메모이제이션 팩토리',
                text: '함수의 결과를 캐싱하는 메모이제이션 함수를 구현하세요.',
                description: '함수와 인자를 받아서, 이전에 같은 인자로 실행된 결과가 있다면 캐시에서 반환하고, 없다면 함수를 실행하고 결과를 캐시에 저장 후 반환합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 7 * 60,
                starterCode: `function memoize(fn, keyGenerator = JSON.stringify) {
    // 여기에 코드를 작성하세요
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            let callCount = 0;
                            const expensiveFunction = (n, m) => {
                                callCount++;
                                return n * m;
                            };
                            const memoized = memoize(expensiveFunction);
                            memoized(5, 2);
                            memoized(5, 2);
                            if (callCount !== 1) return { passed: false, reason: 'Function was called more than once for the same arguments' };
                            memoized(3, 4);
                            if (callCount !== 2) return { passed: false, reason: 'Function was not called for new arguments' };
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '클로저를 사용하여 캐시(객체 또는 Map)를 저장할 공간을 만드세요.',
                    '반환되는 함수는 인자들을 받아서 캐시 키를 생성해야 합니다.',
                    '`keyGenerator` 함수를 사용하여 인자로부터 고유한 키를 생성하세요. 기본값은 `JSON.stringify`가 유용합니다.',
                    'const cache = {}; return function(...args) { const key = keyGenerator(args); ... }',
                    '캐시 확인: if (key in cache) return cache[key];',
                    '캐시 저장: const result = fn.apply(this, args); cache[key] = result;'
                ]
            },
            {
                id: 7,
                category: '비동기 시뮬레이션',
                title: '이벤트 스케줄러',
                text: '지연된 함수 실행을 관리하는 스케줄러를 구현하세요.',
                description: '지정한 시간(delay) 후에 함수를 실행하고, 예약을 취소하거나 모든 예약을 초기화하는 기능을 제공해야 합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 6 * 60,
                starterCode: `function createScheduler() {
    return {
        schedule: function(fn, delay) {
            // delay ms 후에 fn 실행하는 ID 반환
        },
        cancel: function(id) {
            // 예약된 함수 실행 취소
        },
        clear: function() {
            // 모든 예약 취소
        }
    };
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            return new Promise((resolve) => {
                                const scheduler = createScheduler();
                                let task1Ran = false;
                                let task2Ran = false;
                                const id1 = scheduler.schedule(() => { task1Ran = true; }, 20);
                                scheduler.schedule(() => { task2Ran = true; }, 40);
                                scheduler.cancel(id1);
                                setTimeout(() => {
                                    resolve({ passed: !task1Ran && task2Ran });
                                }, 50);
                            });
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    "JavaScript의 내장 함수인 `setTimeout`을 사용하면 지정된 시간 후에 함수를 실행할 수 있습니다.",
                    "`setTimeout`은 타이머 ID를 반환합니다. 이 ID를 어딘가에 저장해두어야 나중에 취소할 수 있습니다.",
                    "예약을 취소할 때는 `clearTimeout(타이머_ID)` 함수를 사용합니다.",
                    "`schedule` 메소드에서는 `setTimeout`을 호출하고, 반환된 타이머 ID를 `createScheduler`의 클로저 스코프에 있는 객체나 Map에 저장하세요.",
                    "`cancel` 메소드에서는 인자로 받은 ID를 사용해 클로저에 저장된 `setTimeout`의 타이머 ID를 찾아 `clearTimeout`을 호출해야 합니다.",
                    "`clear` 메소드는 저장된 모든 타이머를 순회하며 `clearTimeout`을 호출하여 모든 예약을 취소합니다."
                ]
            },
             {
                id: 8,
                category: '제어 구문 응용',
                title: '미로 찾기 알고리즘',
                text: '2D 배열로 표현된 미로에서 경로를 찾는 함수를 구현하세요.',
                description: '주어진 시작점에서 도착점까지의 경로를 배열로 반환하세요. 경로는 좌표 `[row, col]`의 배열 형태입니다. (0: 길, 1: 벽)',
                type: 'coding',
                difficulty: '상',
                timeLimit: 8 * 60,
                starterCode: `function findPath(maze, start, end) {
    // 여기에 코드를 작성하세요
}`,
                testCases: [
                    {
                        input: [
                            [[0, 1, 0, 0], [0, 1, 0, 1], [0, 0, 0, 1], [1, 1, 0, 0]],
                            [0, 0],
                            [3, 3]
                        ],
                        expected: [[0, 0], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [3, 2], [3, 3]] // This is one possible path, your implementation might find another
                    },
                     {
                        input: [
                            [[0, 0, 0], [1, 1, 0], [0, 0, 0]],
                            [0, 0],
                            [2, 2]
                        ],
                        expected: [[0,0], [0,1], [0,2], [1,2], [2,2]]
                    },
                ],
                hints: [
                    "이 문제는 그래프 탐색 알고리즘으로 해결할 수 있습니다. 대표적으로 너비 우선 탐색(BFS)이나 깊이 우선 탐색(DFS)이 있습니다.",
                    "다음에 방문할 위치들을 저장할 자료구조가 필요합니다. BFS를 사용한다면 큐(Queue, `[]` 배열의 `push`와 `shift`로 구현 가능)가 적합합니다.",
                    "한 번 방문했던 길을 다시 방문하면 무한 루프에 빠질 수 있습니다. 이를 방지하기 위해, 미로와 똑같은 크기의 '방문 기록' 배열(visited array)을 만들어 방문 여부를 체크하세요.",
                    "큐(Queue)에 시작점을 넣고, 큐가 빌 때까지 반복하는 `while` 루프를 만드세요. 각 반복마다 큐에서 현재 위치를 꺼내고, 상하좌우로 이동 가능한 다음 위치를 찾습니다.",
                    "다음 위치가 미로 범위 안이고, 벽(1)이 아니며, 아직 방문하지 않은 곳이라면 큐에 추가하고 방문했다고 표시하세요.",
                    "경로를 추적하려면, 큐에 위치 정보만 넣는 것이 아니라 `[위치, 현재까지의_경로]` 형태로 저장하세요. 도착점에 도달했을 때 함께 저장된 경로를 반환하면 됩니다."
                ],
                 // Custom checker because there can be multiple valid paths
                customCheck: (actual, expected) => {
                    if (!actual) return false;
                    const maze = [[0, 1, 0, 0], [0, 1, 0, 1], [0, 0, 0, 1], [1, 1, 0, 0]];
                    if (actual[0][0] !== 0 || actual[0][1] !== 0) return false;
                    if (actual[actual.length - 1][0] !== 3 || actual[actual.length - 1][1] !== 3) return false;

                    for(let i=0; i < actual.length; i++) {
                        const [r, c] = actual[i];
                        if(r < 0 || c < 0 || r >= maze.length || c >= maze[0].length || maze[r][c] === 1) return false;
                        if(i > 0) {
                           const [pr, pc] = actual[i-1];
                           if(Math.abs(pr-r) + Math.abs(pc-c) !== 1) return false;
                        }
                    }
                    return true;
                }
            },
            {
                id: 9,
                category: '객체 팩토리 패턴',
                title: '상태 관리 스토어',
                text: 'Redux와 유사한 상태 관리 스토어를 구현하세요.',
                description: '`getState`, `dispatch`, `subscribe` 메소드를 가진 스토어 객체를 생성하는 팩토리 함수를 만듭니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 8 * 60,
                starterCode: `function createStore(reducer, initialState) {
    // reducer: (state, action) => newState
    // 여기에 코드를 작성하세요
    // 반환: { getState(), dispatch(action), subscribe(listener) }
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const counterReducer = (state = 0, action) => {
                                switch (action.type) {
                                    case 'INCREMENT': return state + 1;
                                    case 'DECREMENT': return state - 1;
                                    default: return state;
                                }
                            };
                            const store = createStore(counterReducer, 0);
                            let finalState = 0;
                            store.subscribe(() => { finalState = store.getState(); });
                            store.dispatch({ type: 'INCREMENT' });
                            store.dispatch({ type: 'INCREMENT' });
                            if (store.getState() !== 2 || finalState !== 2) return { passed: false, reason: 'State or listener incorrect' };
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '클로저를 사용하여 `state`와 `listeners` 배열을 비공개로 관리하세요.',
                    '`getState`는 현재 `state`를 반환합니다.',
                    '`dispatch`는 `reducer`를 호출하여 새로운 `state`를 만들고, 모든 `listeners`를 실행합니다.',
                    '`subscribe`는 `listener` 함수를 `listeners` 배열에 추가하고, 구독을 취소하는 함수를 반환합니다.',
                    'let state = initialState; const listeners = []; return { getState: () => state, ... }',
                    'dispatch에서: state = reducer(state, action); listeners.forEach(listener => listener());'
                ]
            },
            {
                id: 10,
                category: '프로토타입 체인',
                title: '다중 상속 시뮬레이션 (Mixin)',
                text: '여러 객체의 기능을 조합하는 믹스인 패턴을 구현하세요.',
                description: '`mixin` 함수는 타겟 생성자의 프로토타입에 소스 객체들의 프로토타입에 있는 모든 메소드를 복사해야 합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 7 * 60,
                starterCode: `function mixin(target, ...sources) {
    // 여기에 코드를 작성하세요
}

// 테스트용 객체들
function Flyable() {}
Flyable.prototype.fly = function() { return \`\${this.name} is flying\`; };

function Swimmable() {}
Swimmable.prototype.swim = function() { return \`\${this.name} is swimming\`; };`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            function Duck(name) { this.name = name; }
                            mixin(Duck, Flyable, Swimmable);
                            const duck = new Duck('Donald');
                            if (duck.fly() !== 'Donald is flying' || duck.swim() !== 'Donald is swimming') {
                                return { passed: false };
                            }
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '`Object.assign()`을 사용하여 여러 소스 객체의 속성을 타겟의 프로토타입에 병합할 수 있습니다.',
                    '`sources` 배열을 순회하며 각 소스의 프로토타입을 가져와야 합니다.',
                    '`for...in` 루프와 `hasOwnProperty`를 사용하여 각 프로토타입의 메소드를 직접 복사할 수도 있습니다.',
                    'sources.forEach(source => Object.assign(target.prototype, source.prototype))',
                    '또는 수동으로: for (const source of sources) { for (const key in source.prototype) { ... } }',
                    'hasOwnProperty 체크: if (source.prototype.hasOwnProperty(key)) { target.prototype[key] = source.prototype[key]; }'
                ]
            },
            {
                id: 11,
                category: '배열 고급 처리',
                title: '데이터 그룹핑 엔진',
                text: '배열 데이터를 다양한 기준으로 그룹핑하는 함수를 구현하세요.',
                description: '주어진 배열을 특정 키 또는 함수를 기준으로 그룹핑합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 7 * 60,
                starterCode: `function groupBy(array, keyOrFunction) {
    // keyOrFunction이 문자열이면 해당 속성으로 그룹핑
    // 함수면 함수 결과로 그룹핑
}`,
                testCases: [
                    {
                        input: [
                            [{ name: 'Kim', age: 25, department: 'IT' }, { name: 'Lee', age: 30, department: 'IT' }, { name: 'Park', age: 25, department: 'HR' }],
                            'department'
                        ],
                        expected: {
                            IT: [{ name: 'Kim', age: 25, department: 'IT' }, { name: 'Lee', age: 30, department: 'IT' }],
                            HR: [{ name: 'Park', age: 25, department: 'HR' }]
                        }
                    },
                    {
                        input: [
                            [{ name: 'Kim', age: 25 }, { name: 'Lee', age: 30 }, { name: 'Park', age: 25 }],
                            item => item.age
                        ],
                        expected: {
                            '25': [{ name: 'Kim', age: 25 }, { name: 'Park', age: 25 }],
                            '30': [{ name: 'Lee', age: 30 }]
                        }
                    }
                ],
                hints: [
                    '배열의 `reduce` 메소드를 사용하는 것이 가장 간결합니다.',
                    '결과를 담을 빈 객체 `{}`를 `reduce`의 초기값으로 사용하세요.',
                    '각 아이템에 대해 그룹핑 키를 얻고, 결과 객체에 해당 키의 배열이 없으면 생성한 후 아이템을 추가합니다.',
                    'return array.reduce((groups, item) => { const key = typeof keyOrFunction === "function" ? keyOrFunction(item) : item[keyOrFunction]; ... }, {})',
                    '그룹 생성: if (!groups[key]) groups[key] = [];',
                    '아이템 추가: groups[key].push(item); return groups;'
                ]
            },
            {
                id: 12,
                category: '배열 알고리즘',
                title: '효율적인 검색 엔진',
                text: '정렬된 배열에서 이진 검색과 범위 검색을 구현하세요.',
                description: '생성자에 정렬된 배열을 받아, 이진 검색과 특정 범위의 값들을 찾는 메소드를 가진 인스턴스를 생성합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 8 * 60,
                starterCode: `function SearchEngine(sortedArray) {
    this.data = sortedArray;
}

SearchEngine.prototype.binarySearch = function(target) {
    // 이진 검색으로 target의 인덱스 반환 (없으면 -1)
};

SearchEngine.prototype.rangeSearch = function(min, max) {
    // min <= value <= max 범위의 모든 값 반환
};`,
                testCases: [
                     {
                        input: 'custom',
                        test: `
                            const engine = new SearchEngine([1, 3, 5, 7, 9, 11, 13]);
                            if (engine.binarySearch(7) !== 3) return { passed: false, reason: 'binarySearch failed'};
                            const range = engine.rangeSearch(5, 9);
                            if (JSON.stringify(range) !== JSON.stringify([5, 7, 9])) return { passed: false, reason: 'rangeSearch failed'};
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '`binarySearch`: `while` 루프 안에서 low, high, mid 인덱스를 사용하여 탐색 범위를 절반씩 줄여나가세요.',
                    '`rangeSearch`: 이진 검색을 응용하여 min 값 이상의 첫 번째 위치와 max 값 이하의 마지막 위치를 찾은 후, 그 사이를 `slice` 할 수 있습니다.',
                    '또는 `filter`를 사용할 수도 있지만, 정렬된 배열의 이점을 살리는 것이 더 효율적입니다.',
                    'binarySearch: let low = 0, high = this.data.length - 1; while (low <= high) { const mid = Math.floor((low + high) / 2); ... }',
                    'rangeSearch 간단 버전: return this.data.filter(val => val >= min && val <= max)',
                    'rangeSearch 최적화: 시작과 끝 인덱스를 이진검색으로 찾아 slice 사용'
                ]
            },
             {
                id: 13,
                category: '참조와 불변성',
                title: '불변 데이터 구조',
                text: '불변성을 보장하는 데이터 구조를 구현하세요.',
                description: '모든 변경 작업(push, filter 등)은 원본을 수정하지 않고, 새로운 인스턴스를 반환하는 `ImmutableArray`를 구현합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 7 * 60,
                starterCode: `function ImmutableArray(initialData = []) {
    // 여기에 코드를 작성하세요
}
    
// 프로토타입 메소드들을 추가하세요.
`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const arr1 = new ImmutableArray([1, 2, 3]);
                            const arr2 = arr1.push(4);
                            if (arr1 === arr2) return { passed: false, reason: 'push should return a new instance' };
                            if (arr1.toArray().length !== 3) return { passed: false, reason: 'Original array was modified' };
                            if (JSON.stringify(arr2.toArray()) !== JSON.stringify([1, 2, 3, 4])) return { passed: false, reason: 'push result is incorrect' };

                            const arr3 = arr2.filter(x => x % 2 === 0);
                            if (JSON.stringify(arr3.toArray()) !== JSON.stringify([2, 4])) return { passed: false, reason: 'filter result is incorrect' };
                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '생성자 함수 내에서 데이터를 비공개로 관리하기 위해 클로저나 `Object.freeze`를 사용할 수 있습니다.',
                    '`push` 메소드는 원본 배열을 복사한 뒤 아이템을 추가하고, 그 새 배열로 `ImmutableArray`의 새 인스턴스를 만들어 반환해야 합니다.',
                    '`toArray` 메소드는 내부 데이터의 복사본을 반환하여 외부에서 원본 데이터를 수정할 수 없도록 해야 합니다.',
                    'function ImmutableArray(data = []) { const _data = [...data]; this.toArray = () => [..._data]; }',
                    'ImmutableArray.prototype.push = function(item) { return new ImmutableArray([...this.toArray(), item]); }',
                    'filter 구현: ImmutableArray.prototype.filter = function(fn) { return new ImmutableArray(this.toArray().filter(fn)); }'
                ]
            },
            {
                id: 14,
                category: '호이스팅과 스코프 고급',
                title: '스코프 체인 분석기',
                text: '복잡한 스코프 상황에서의 변수 접근을 분석하는 함수를 구현하세요.',
                description: '주어진 코드의 `console.log`가 어떤 값을 출력할지 예측하여 순서대로 배열에 담아 반환하세요.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 6 * 60,
                starterCode: `function analyzeComplexScope() {
    /* 분석할 코드:
    var x = 1;
    let y = 2;
    const z = 3;
    
    function outer() {
        var x = 10;
        let y = 20;
        
        function inner() {
            console.log(x); // ?
            console.log(y); // ?
            console.log(z); // ?
            
            if (true) {
                var x = 100;
                let y = 200;
                const z = 300;
                
                console.log(x); // ?
                console.log(y); // ?
                console.log(z); // ?
            }
            
            console.log(x); // ?
            console.log(y); // ?
            console.log(z); // ?
        }
        
        inner();
    }
    
    outer();
    */
    
    // 예측된 출력값들을 배열로 반환
    return [];
}`,
                testCases: [
                    { input: [], expected: [undefined, 20, 3, 100, 200, 300, 100, 20, 3] }
                ],
                hints: [
                    '`var`는 함수 스코프를 가지며, 같은 함수 내에서 선언이 호이스팅됩니다.',
                    '`let`과 `const`는 블록 스코프(`{...}`)를 가집니다.',
                    '`inner` 함수 내의 `var x = 100` 선언은 `inner` 함수 최상단으로 호이스팅되므로 첫 `console.log(x)`는 `undefined`가 됩니다.',
                    '`if` 블록이 끝난 후 `x`는 `100`으로 유지되지만, `y`와 `z`는 블록 스코프를 벗어나 이전 스코프의 값을 다시 참조합니다.',
                    '호이스팅으로 인해 inner 함수는 실제로는 var x; console.log(x); ... x = 100; 순서로 실행됩니다.',
                    'TDZ(Temporal Dead Zone): let/const는 선언 전까지 접근할 수 없지만, 여기서는 상위 스코프 변수에 접근합니다.'
                ]
            },
            {
                id: 15,
                category: 'this 바인딩 마스터',
                title: '동적 메소드 디스패처',
                text: '객체의 메소드를 동적으로 호출하고 this를 올바르게 바인딩하는 시스템을 구현하세요.',
                description: '주어진 객체의 메소드를 동적으로 호출하고, `this` 컨텍스트를 바꿔 호출하거나, 모든 메소드를 원본 객체에 바인딩하는 기능을 제공합니다.',
                type: 'coding',
                difficulty: '상',
                timeLimit: 8 * 60,
                starterCode: `function createDispatcher(obj) {
    return {
        call: function(methodName, ...args) {
            // obj의 methodName을 올바른 this로 호출
        },
        callWithContext: function(methodName, context, ...args) {
            // obj의 methodName을 context를 this로 호출
        },
        bindAll: function() {
            // obj의 모든 메소드를 obj에 바인딩한 새 객체 반환
        }
    };
}`,
                testCases: [
                    {
                        input: 'custom',
                        test: `
                            const person = {
                                name: 'Kim',
                                greet: function(msg) { return \`\${msg}, \${this.name}!\`; },
                                introduce: function() { return \`I'm \${this.name}\`; }
                            };
                            const dispatcher = createDispatcher(person);

                            if (dispatcher.call('greet', 'Hello') !== 'Hello, Kim!') return { passed: false, reason: 'call failed'};
                            
                            const otherPerson = { name: 'Lee' };
                            if(dispatcher.callWithContext('greet', otherPerson, 'Hi') !== 'Hi, Lee!') return { passed: false, reason: 'callWithContext failed'};

                            const bound = dispatcher.bindAll();
                            const greet = bound.greet;
                            if (greet('Hey') !== 'Hey, Kim!') return { passed: false, reason: 'bindAll failed' };

                            return { passed: true };
                        `,
                        expected: { passed: true }
                    }
                ],
                hints: [
                    '`call`: `Function.prototype.call()` 또는 `Function.prototype.apply()`를 사용하세요.',
                    '`callWithContext`: `call`과 유사하지만, `this`로 사용할 `context`를 첫 인자로 전달합니다.',
                    '`bindAll`: `for...in` 루프로 객체의 속성을 순회하며, 값이 함수인 경우에만 `bind` 메소드를 사용하여 바인딩된 새 함수를 만들어 새 객체에 할당하세요.',
                    'call: return obj[methodName].call(obj, ...args)',
                    'callWithContext: return obj[methodName].call(context, ...args)',
                    'bindAll: const result = {}; for (const key in obj) { if (typeof obj[key] === "function") result[key] = obj[key].bind(obj); } return result;'
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
        
        document.getElementById('run-code-btn').addEventListener('click', () => this.runCode());
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        document.getElementById('close-hint-btn').addEventListener('click', () => this.closeHint());
        document.getElementById('more-hints-btn').addEventListener('click', () => this.showMoreHints());
    }
    
    startTest() {
        this.startTime = new Date();
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.currentQuestionIndex = 0;
        this.startTimer();
        this.showQuestion();
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('prev-btn').disabled = false;
        document.getElementById('next-btn').disabled = false;
        document.getElementById('submit-btn').disabled = false;
        this.showScreen('question');
        this.updateNavigation();
    }
    
    startTimer() {
        const timerEl = document.getElementById('timer');
        timerEl.textContent = '⏱️ 01:00:00';
        let totalSeconds = 60 * 60;

        this.timer = setInterval(() => {
            totalSeconds--;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            timerEl.textContent = 
                `⏱️ ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (totalSeconds <= 0) {
                clearInterval(this.timer);
                this.submitTest();
            }
        }, 1000);
    }
    
    showQuestion() {
        if (this.currentQuestionTimer) {
            clearInterval(this.currentQuestionTimer);
        }

        const question = this.questions[this.currentQuestionIndex];
        
        document.getElementById('question-number').textContent = `문제 ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-category').textContent = question.category;
        document.getElementById('question-difficulty').textContent = question.difficulty;
        document.getElementById('question-title').textContent = question.title;
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('question-description').innerHTML = question.description; // Allow HTML for line breaks
        
        this.startQuestionTimer(question.timeLimit);
        
        const codeEditor = document.getElementById('code-editor');
        codeEditor.value = this.userAnswers[this.currentQuestionIndex] || question.starterCode;
        
        document.getElementById('total-tests').textContent = question.testCases.length;
        document.getElementById('passed-tests').textContent = '0';
        
        this.updateTestResults(question, []);
        this.clearConsoleOutput();
        
        document.getElementById('hint-panel').style.display = 'none';
        
        this.updateProgress();
        this.updateNavigation();
    }
    
    startQuestionTimer(timeLimitInSeconds) {
        if (this.currentQuestionTimer) {
            clearInterval(this.currentQuestionTimer);
        }
        
        let remainingTime = timeLimitInSeconds;
        const timerEl = document.getElementById('question-timer');
        
        const updateTimer = () => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            timerEl.textContent = 
                `⏱️ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (remainingTime <= 0) {
                clearInterval(this.currentQuestionTimer);
                timerEl.textContent = '시간 초과!';
            }
            remainingTime--;
        };
        
        updateTimer();
        this.currentQuestionTimer = setInterval(updateTimer, 1000);
    }
    
    async runCode() {
        const question = this.questions[this.currentQuestionIndex];
        const code = document.getElementById('code-editor').value;
        
        this.userAnswers[this.currentQuestionIndex] = code;
        this.updateNavigation();
        
        this.clearConsoleOutput();
        
        try {
            const results = await this.runTestCases(question, code);
            this.updateTestResults(question, results);
            
            const passedCount = results.filter(result => result.passed).length;
            document.getElementById('passed-tests').textContent = passedCount;
            
            this.addToConsole(`실행 완료: ${passedCount}/${results.length} 테스트 통과`, 'info');
            
        } catch (error) {
            this.addToConsole(`에러: ${error.message}`, 'error');
            this.updateTestResults(question, []);
        }
    }
    
    async runTestCases(question, code) {
        const results = [];
        
        for (let i = 0; i < question.testCases.length; i++) {
            const testCase = question.testCases[i];
            let actual, passed = false, error = null;
            
            try {
                if (testCase.input === 'custom') {
                    const testFunction = new Function(code + '\n' + testCase.test);
                    actual = await Promise.resolve(testFunction());
                    passed = this.deepEqual(actual, testCase.expected);
                } else {
                    const functionName = this.extractFunctionName(question.starterCode);
                    const userFunction = new Function(code + `\nreturn ${functionName};`)();
                    actual = userFunction.apply(null, testCase.input);
                    if (question.customCheck) {
                        passed = question.customCheck(actual, testCase.expected);
                    } else {
                        passed = this.deepEqual(actual, testCase.expected);
                    }
                }
            } catch (e) {
                error = e.message;
                }
                
                results.push({
                    input: testCase.input,
                    expected: testCase.expected,
                actual,
                passed,
                error
            });
        }
        return results;
    }

    
    deepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;
        
        if (obj1 == null || typeof obj1 != "object" || obj2 == null || typeof obj2 != "object") {
            return obj1 === obj2;
        }

        let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);

        if (keys1.length != keys2.length) return false;
        
        for (let key of keys1) {
            if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) return false;
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
            const actualResult = result.error ? `에러: ${result.error}` : JSON.stringify(result.actual, null, 2);
            
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
                            <strong>예상 결과:</strong> ${JSON.stringify(result.expected, null, 2)}
                        </div>
                        <div class="test-actual">
                            <strong>실제 결과:</strong> ${actualResult}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    clearConsoleOutput() {
        const consoleEl = document.getElementById('console-output');
        consoleEl.innerHTML = '<div class="console-placeholder">코드를 실행하면 결과가 여기에 표시됩니다.</div>';
    }
    
    addToConsole(message, type = 'log') {
        const consoleEl = document.getElementById('console-output');
        const placeholder = consoleEl.querySelector('.console-placeholder');
        if (placeholder) {
            consoleEl.innerHTML = '';
        }
        
        const logEntry = document.createElement('div');
        logEntry.className = `console-entry console-${type}`;
        logEntry.textContent = message;
        consoleEl.appendChild(logEntry);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    }
    
    showHint() {
        const question = this.questions[this.currentQuestionIndex];
        const hintContent = document.getElementById('hint-content');
        const moreHintsContainer = document.getElementById('more-hints-container');
        const moreHintsBtn = document.getElementById('more-hints-btn');
        
        const tieredHintQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        if (tieredHintQuestions.includes(question.id)) {
            const level1Hints = question.hints.slice(0, 3);
            hintContent.innerHTML = level1Hints.map((hint, index) => 
                `<div class="hint-item">
                    <strong>기본 힌트 ${index + 1}:</strong> ${hint}
                </div>`
            ).join('');
            moreHintsContainer.style.display = 'block';
            moreHintsBtn.style.display = 'inline-flex';
        } else {
        hintContent.innerHTML = question.hints.map((hint, index) => 
            `<div class="hint-item">
                <strong>힌트 ${index + 1}:</strong> ${hint}
            </div>`
        ).join('');
            moreHintsContainer.style.display = 'none';
        }

        document.getElementById('hint-panel').style.display = 'block';
    }
    
    showMoreHints() {
        const question = this.questions[this.currentQuestionIndex];
        const hintContent = document.getElementById('hint-content');
        const moreHintsBtn = document.getElementById('more-hints-btn');

        const level2Hints = question.hints.slice(3); // 심화 힌트
        const level2Html = level2Hints.map((hint, index) => 
            `<div class="hint-item">
                <strong>심화 힌트 ${index + 1}:</strong> ${hint}
            </div>`
        ).join('');

        hintContent.insertAdjacentHTML('beforeend', level2Html);
        moreHintsBtn.style.display = 'none'; // 버튼 숨기기
    }
    
    closeHint() {
        document.getElementById('hint-panel').style.display = 'none';
    }
    
    extractFunctionName(code) {
        const match = code.match(/function\s+([a-zA-Z0-9_]+)/);
        return match ? match[1] : '';
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
        nextBtn.disabled = this.currentQuestionIndex === this.questions.length - 1;
        submitBtn.disabled = this.currentQuestionIndex !== this.questions.length - 1;
    }
    
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion();
        }
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        }
    }
    
    submitTest() {
        if(this.timer) clearInterval(this.timer);
        if(this.currentQuestionTimer) clearInterval(this.currentQuestionTimer);

        this.endTime = new Date();
        this.calculateResults();
        this.showResults();
        this.showScreen('result');
    }
    
    async calculateResults() {
        let totalScore = 0;
        this.testResults = [];

        for(let i=0; i < this.questions.length; i++) {
            const question = this.questions[i];
            const code = this.userAnswers[i];
            let questionScore = 0;
            let results = [];
            
            if (code && code !== question.starterCode) {
                try {
                    results = await this.runTestCases(question, code);
                    const passedTests = results.filter(r => r.passed).length;
                    if(results.length > 0) {
                        questionScore = (passedTests / results.length) * (100 / this.questions.length);
                    }
                } catch (e) {
                    questionScore = 0;
                }
            }
            this.testResults.push({ results, score: questionScore });
            totalScore += questionScore;
        }

        const duration = this.startTime ? this.endTime - this.startTime : 0;
        
        this.results = {
            totalScore: Math.round(totalScore),
            duration: duration
        };
    }
    
    showResults() {
        const { totalScore, duration } = this.results;
        
        document.getElementById('final-score').querySelector('.score-number').textContent = totalScore;
        
        const accuracy = this.questions.length > 0 ? Math.round(totalScore) : 0;
        document.getElementById('accuracy-rate').textContent = `${accuracy}%`;
        
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);
        document.getElementById('total-time').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('total-questions').textContent = this.questions.length;
        
        // Simplified category results
        const categoryContainer = document.getElementById('category-results');
        categoryContainer.innerHTML = `<h3>종합 점수: ${totalScore}/100</h3>`;
    }
    
    showReview() {
        const reviewContent = document.getElementById('review-content');
        
        const reviewItems = this.questions.map((question, index) => {
                const userAnswer = this.userAnswers[index];
            const testResult = this.testResults[index];
            const isCorrect = testResult && testResult.score > 0 && Math.round(testResult.score) === Math.round(100/this.questions.length);

            if (isCorrect) return ''; // 정답 문제는 리뷰에서 제외

            let testDetails = '';
            if (testResult && testResult.results.length > 0) {
                const passed = testResult.results.filter(r => r.passed).length;
                const total = testResult.results.length;
                testDetails = `
                            <div class="test-summary">
                        <strong>테스트 결과:</strong> ${passed}/${total} 통과
                            </div>
                        `;
                }
                
                return `
                    <div class="review-item">
                        <div class="review-question">
                            <h4>문제 ${question.id}: ${question.title}</h4>
                        <p>${question.description}</p>
                        </div>
                        <div class="review-answer">
                            <div class="user-code">
                            <strong>제출한 코드:</strong>
                            <pre><code class="language-javascript">${userAnswer || '// 코드를 제출하지 않았습니다.'}</code></pre>
                            </div>
                        ${testDetails}
                            <div class="explanation">
                            <strong>해설 및 힌트:</strong>
                            <ul>${question.hints.map(h => `<li>${h}</li>`).join('')}</ul>
                            </div>
                        </div>
                    </div>
                `;
        }).join('');
        
        const incorrectCount = this.testResults.filter(r => r.score < (100/this.questions.length)).length;
        if (incorrectCount === 0) {
            reviewContent.innerHTML = '<div class="perfect-score">🎉 모든 문제를 맞히셨습니다!</div>';
        } else {
            reviewContent.innerHTML = reviewItems;
        }
        
        this.showScreen('review');
        hljs.highlightAll();
    }
    
    closeReview() {
        this.showScreen('result');
    }
    
    restartTest() {
        window.location.reload();
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`${screenName}-screen`).classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JavaScriptMidtermTest();
});