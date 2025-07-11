# JavaScript 학습 가이드 프레젠테이션

웹 개발의 핵심 언어인 JavaScript를 체계적으로 학습할 수 있는 인터랙티브 프레젠테이션입니다.

## 📋 프로젝트 개요

이 프로젝트는 JavaScript의 기초부터 고급 개념까지 25개의 슬라이드로 구성된 웹 기반 프레젠테이션입니다. 초보자부터 중급자까지 JavaScript를 단계적으로 학습할 수 있도록 설계되었습니다.

## 🎯 학습 목표

- JavaScript의 기본 문법과 개념 이해
- 변수, 함수, 객체, 배열 등 핵심 데이터 타입 활용
- 비동기 프로그래밍과 모던 JavaScript 문법 습득
- 실무에서 활용할 수 있는 JavaScript 코딩 능력 향상

## 📚 커리큘럼

### 기초 과정 (1-11)
1. **튜토리얼: 기본 문법** - 주석, 리터럴, 기본 규칙
2. **JavaScript 소개** - 역사, ECMAScript, 브라우저 호환성
3. **튜토리얼: 변수와 타입** - const, let, typeof 연산자
4. **Number 타입** - 숫자 리터럴, 산술 연산, 특수 값들
5. **String 타입** - 문자열 조작, 템플릿 리터럴, 주요 메서드
6. **Boolean 타입** - 논리 연산자, Truthy/Falsy, 단축 평가
7. **null과 undefined** - 차이점과 활용법
8. **튜토리얼: 함수, 객체, 배열** - 기본 사용법
9. **튜토리얼: 제어 흐름** - 조건문, 반복문
10. **JavaScript 데이터 타입** - 원시 타입 vs 참조 타입
11. **배열과 유용한 메서드** - 고차 함수, 실용적 예제

### 심화 과정 (12-24)
12. **값 더 알아보기** - 스코프, 참조, 변수 사용 권장사항
13. **함수 더 알아보기** - 클로저, this 바인딩, 고차 함수
14. **객체 더 알아보기** - 프로토타입, 생성자 함수, 캡슐화
15. **연산자 심화** - 단축 평가, 옵셔널 체이닝
16. **내장 객체** - Object, Array, Date, Math 메서드
17. **함수형 프로그래밍** - 순수 함수, 커링, 함수 조합
18. **이터레이션** - 이터러블, 제너레이터, 무한 시퀀스
19. **클래스** - ES2015 문법, 상속, 프라이빗 필드
20. **자료구조** - Map, Set, WeakMap, WeakSet
21. **비동기 프로그래밍** - 콜백, Promise, async/await
22. **예외 처리** - try/catch, 커스텀 에러, 전역 에러 처리
23. **모듈 시스템** - import/export, 모듈의 특징
24. **기타** - 구조 분해, 스프레드 연산자, 정규식, JSON

## 🚀 시작하기

### 필요 환경
- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 로컬 웹 서버 (권장)

### 실행 방법

#### 1. 직접 실행
```bash
# 프로젝트 폴더로 이동
cd presentation

# index.html 파일을 웹 브라우저로 열기
open index.html  # macOS
start index.html # Windows
```

#### 2. 로컬 서버 사용 (권장)
```bash
# Python 3가 설치된 경우
python -m http.server 8000

# Node.js가 설치된 경우
npx serve .

# 브라우저에서 http://localhost:8000 접속
```

#### 3. VS Code Live Server 확장 사용
1. VS Code에서 Live Server 확장 설치
2. `index.html` 파일 우클릭 → "Open with Live Server"

## 🎮 사용법

### 네비게이션
- **방향키**: ← → 키로 슬라이드 이동
- **스페이스바**: 다음 슬라이드로 이동
- **Home/End**: 첫 번째/마지막 슬라이드로 이동
- **사이드바 메뉴**: 원하는 슬라이드로 직접 이동
- **하단 버튼**: 이전/다음 버튼 클릭

### 모바일/태블릿
- **햄버거 메뉴**: 화면 상단의 ☰ 버튼으로 목차 열기/닫기
- **터치**: 화면을 좌우로 스와이프하여 슬라이드 이동

## 📁 프로젝트 구조

```
presentation/
├── index.html          # 메인 프레젠테이션 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 기능
└── README.md          # 프로젝트 문서
```

## 🎨 주요 기능

- **반응형 디자인**: 데스크톱, 태블릿, 모바일 지원
- **다크 테마**: 눈에 편한 어두운 색상 테마
- **문법 하이라이팅**: highlight.js를 사용한 코드 구문 강조
- **진행률 표시**: 하단 프로그레스 바로 학습 진도 확인
- **키보드 단축키**: 효율적인 프레젠테이션 네비게이션
- **목차 네비게이션**: 사이드바를 통한 빠른 슬라이드 이동

## 🔧 커스터마이징

### 스타일 수정
`styles.css` 파일을 편집하여 색상, 폰트, 레이아웃을 변경할 수 있습니다.

### 슬라이드 추가/수정
`index.html` 파일의 `<section class="slide">` 요소를 추가하거나 수정하면 됩니다.

### 기능 확장
`script.js` 파일을 수정하여 새로운 기능을 추가할 수 있습니다.

## 📖 관련 자료

이 프레젠테이션은 다음 자료들과 함께 사용할 수 있습니다:

- **docs/**: 상세한 JavaScript 학습 문서
- **study_paper/**: 요약된 학습 자료
- **quiz/**: 각 주제별 퀴즈 문제

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 🙋‍♂️ 문의사항

프레젠테이션 사용 중 문제가 발생하거나 개선사항이 있다면 이슈를 등록해 주세요.

---

**즐거운 JavaScript 학습 되세요! 🎉** 