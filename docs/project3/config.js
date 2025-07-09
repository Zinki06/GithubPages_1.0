// ⚙️ 시스템 설정 및 상수 정의
// 이 파일에서 모든 설정값을 중앙 관리합니다.

const CONFIG = {
    // 📅 저장소 설정
    STORAGE: {
        EXPIRY_HOURS: 24,           // 로컬스토리지 데이터 유지 시간 (시간)
        KEY: 'javascript_test_data'  // 로컬스토리지 키
    },
    
    // ⏰ 타이밍 설정
    TIMING: {
        NOTIFICATION_DURATION: {
            INFO: 4000,             // 정보 알림 지속 시간 (밀리초)
            ERROR: 6000,            // 에러 알림 지속 시간 (밀리초)
            SUCCESS: 3000           // 성공 알림 지속 시간 (밀리초)
        },
        AUTO_SAVE_INTERVAL: 30000,  // 자동 저장 간격 (밀리초)
        TIMER_UPDATE_INTERVAL: 1000 // 타이머 업데이트 간격 (밀리초)
    },
    
    // 🎨 UI 설정
    UI: {
        MAX_HINT_LEVEL: 3,          // 최대 힌트 레벨
        CONSOLE_MAX_LINES: 50,      // 콘솔 최대 라인 수
        CODE_EDITOR_PLACEHOLDER: '여기에 JavaScript 코드를 작성하세요...'
    },
    
    // 📊 점수 설정
    SCORING: {
        PERFECT_SCORE: 100,         // 만점
        DEFAULT_QUESTION_SCORE: 10, // 기본 문제 점수
        PASS_THRESHOLD: 60          // 합격 기준 점수
    },
    
    // 📄 PDF 설정
    PDF: {
        PAGE_MARGINS: {
            TOP: 20,
            RIGHT: 20,
            BOTTOM: 20,
            LEFT: 20
        },
        FONT_SIZE: {
            TITLE: 16,
            SUBTITLE: 14,
            BODY: 10,
            SMALL: 8
        },
        COLORS: {
            PRIMARY: '#2563eb',
            SUCCESS: '#059669',
            ERROR: '#dc2626',
            WARNING: '#d97706',
            TEXT: '#1f2937'
        }
    },
    
    // 🔧 개발자 설정
    DEV: {
        DEBUG_MODE: false,          // 디버그 모드 (개발시에만 true)
        ENABLE_CONSOLE_LOGS: false, // 콘솔 로그 활성화
        MOCK_RESULTS: false         // 테스트용 가짜 결과 사용
    }
};

// 📱 반응형 브레이크포인트
const BREAKPOINTS = {
    MOBILE: 768,    // 모바일
    TABLET: 1024,   // 태블릿  
    DESKTOP: 1200   // 데스크톱
};

// 🎯 테스트 관련 상수
const TEST_CONSTANTS = {
    MAX_QUESTIONS: 20,              // 최대 문제 수
    MIN_TIME_PER_QUESTION: 2,       // 문제당 최소 시간 (분)
    MAX_TIME_PER_QUESTION: 30,      // 문제당 최대 시간 (분)
    DEFAULT_TIME_LIMIT: 10          // 기본 제한 시간 (분)
};

// 🏷️ 카테고리 설정
const CATEGORIES = {
    '기본 문법': { icon: '📝', color: '#3b82f6' },
    '배열 조작': { icon: '📊', color: '#10b981' },
    '문자열 처리': { icon: '📄', color: '#f59e0b' },
    '객체 다루기': { icon: '🏗️', color: '#8b5cf6' },
    '함수와 스코프': { icon: '⚙️', color: '#ef4444' },
    '비동기 프로그래밍': { icon: '🔄', color: '#06b6d4' },
    '고급 개념': { icon: '🚀', color: '#6366f1' }
};

// 🎨 난이도 설정
const DIFFICULTY_LEVELS = {
    '하': { color: '#10b981', icon: '🟢', score: 5 },
    '중': { color: '#f59e0b', icon: '🟡', score: 10 },
    '상': { color: '#ef4444', icon: '🔴', score: 15 }
};

// 💾 내보내기 - 다른 파일에서 사용할 수 있도록 전역 변수로 설정
window.CONFIG = CONFIG;
window.BREAKPOINTS = BREAKPOINTS;
window.TEST_CONSTANTS = TEST_CONSTANTS;
window.CATEGORIES = CATEGORIES;
window.DIFFICULTY_LEVELS = DIFFICULTY_LEVELS; 