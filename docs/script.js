// 프로젝트 데이터
const projects = [
    {
        id: "project1",
        title: "AI 시대, 비개발자를 위한 개발 지식",
        description: "AI가 코드를 짜주는 시대, 비개발자를 위한 개발 지식 프레젠테이션입니다. 키보드 방향키로 슬라이드를 탐색할 수 있습니다.",
        thumbnail: "assets/thumbnails/project1-thumbnail.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        url: "./project1/",
        status: "완료"
    },
    {
        id: "project2",
        title: "Cursor 사용법 고급 팁 12가지",
        description: "AI 코딩 도구 Cursor를 효과적으로 사용하는 12가지 고급 팁을 담은 인터랙티브 프레젠테이션입니다. 키보드 방향키로 슬라이드를 탐색할 수 있습니다.",
        thumbnail: "assets/thumbnails/project2-thumbnail.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        url: "./project2/",
        status: "완료"
    },
    {
        id: "project3",
        title: "포트폴리오 갤러리",
        description: "반응형 이미지 갤러리와 Lightbox 기능을 구현한 포트폴리오 사이트입니다.",
        thumbnail: "assets/thumbnails/project3-thumbnail.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        url: "./project3/",
        status: "진행중"
    },
    {
        id: "project4",
        title: "JavaScript 중간점검",
        description: "JavaScript 핵심 개념을 테스트하는 인터랙티브 코딩 테스트 애플리케이션입니다. 실시간 코드 실행 및 테스트 케이스 검증을 포함합니다.",
        thumbnail: "assets/thumbnails/project4-thumbnail.jpg",
        tags: ["JavaScript", "코딩테스트", "교육"],
        url: "./project4/",
        status: "완료"
    }
];

// DOM 요소들
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const tagButtons = document.querySelectorAll('.tag-btn');
const loading = document.getElementById('loading');

// 전역 변수
let filteredProjects = [...projects];
let currentFilter = 'all';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    
    // 실제 앱에서는 API 호출이나 데이터 로딩 시뮬레이션
    setTimeout(() => {
        hideLoading();
        renderProjects();
        initializeEventListeners();
    }, 1000);
});

// 로딩 화면 표시
function showLoading() {
    loading.classList.add('show');
}

// 로딩 화면 숨기기
function hideLoading() {
    loading.classList.remove('show');
}

// 프로젝트 카드 렌더링
function renderProjects() {
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <h3>프로젝트를 찾을 수 없습니다</h3>
                <p>다른 검색어나 필터를 시도해보세요.</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = filteredProjects.map((project, index) => `
        <article class="project-card" data-project-id="${project.id}" onclick="navigateToProject('${project.url}')">
            <div class="project-thumbnail ${!project.thumbnail.includes('http') ? 'placeholder' : ''}">
                ${project.thumbnail.includes('http') || project.thumbnail.includes('assets') ? 
                    `<img src="${project.thumbnail}" alt="${project.title} 썸네일" onerror="this.parentElement.innerHTML='${project.id.slice(-1)}';">` : 
                    project.id.slice(-1)
                }
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.url}" class="project-link" onclick="event.stopPropagation();">
                    프로젝트 보기 →
                </a>
            </div>
        </article>
    `).join('');

    // 애니메이션을 위한 지연 적용
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// 프로젝트로 이동
function navigateToProject(url) {
    // 부드러운 전환 효과
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

// 이벤트 리스너 초기화
function initializeEventListeners() {
    // 검색 기능
    searchInput.addEventListener('input', handleSearch);
    
    // 태그 필터 기능
    tagButtons.forEach(button => {
        button.addEventListener('click', handleTagFilter);
    });
    
    // 키보드 네비게이션
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// 검색 처리
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    filterProjects(searchTerm, currentFilter);
}

// 태그 필터 처리
function handleTagFilter(event) {
    const tag = event.target.dataset.tag;
    
    // 활성 버튼 업데이트
    tagButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    currentFilter = tag;
    const searchTerm = searchInput.value.toLowerCase().trim();
    filterProjects(searchTerm, tag);
}

// 프로젝트 필터링
function filterProjects(searchTerm = '', tag = 'all') {
    filteredProjects = projects.filter(project => {
        const matchesSearch = !searchTerm || 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(t => t.toLowerCase().includes(searchTerm));
            
        const matchesTag = tag === 'all' || project.tags.includes(tag);
        
        return matchesSearch && matchesTag;
    });
    
    renderProjects();
    
    // 검색 결과 통계 업데이트 (선택사항)
    updateSearchStats();
}

// 검색 결과 통계 업데이트
function updateSearchStats() {
    const total = projects.length;
    const filtered = filteredProjects.length;
    
    console.log(`총 ${total}개 프로젝트 중 ${filtered}개 표시`);
}

// 키보드 네비게이션
function handleKeyboardNavigation(event) {
    if (event.key === 'Escape') {
        // ESC 키로 검색 초기화
        searchInput.value = '';
        currentFilter = 'all';
        tagButtons.forEach(btn => btn.classList.remove('active'));
        tagButtons[0].classList.add('active'); // 전체 버튼 활성화
        filterProjects();
    }
    
    if (event.key === '/' && !event.target.matches('input')) {
        // '/' 키로 검색창 포커스
        event.preventDefault();
        searchInput.focus();
    }
}

// 유틸리티 함수들
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 성능 최적화를 위한 디바운스된 검색
const debouncedSearch = debounce(handleSearch, 300);

// 검색 입력에 디바운스 적용
if (searchInput) {
    searchInput.removeEventListener('input', handleSearch);
    searchInput.addEventListener('input', debouncedSearch);
}

// 반응형 처리
function handleResize() {
    // 필요시 반응형 로직 추가
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // 모바일 최적화
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// 리사이즈 이벤트 리스너
window.addEventListener('resize', debounce(handleResize, 250));

// 초기 반응형 체크
handleResize();

// 페이지 가시성 API 활용
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 페이지가 다시 보일 때 필요한 작업
        console.log('페이지가 다시 활성화되었습니다.');
    }
});

// 에러 처리
window.addEventListener('error', function(event) {
    console.error('JavaScript 오류:', event.error);
    
    // 사용자에게 친화적인 오류 메시지 (선택사항)
    if (projectsGrid && projectsGrid.children.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state">
                <h3>일시적인 오류가 발생했습니다</h3>
                <p>페이지를 새로고침해주세요.</p>
            </div>
        `;
    }
});

// 개발 모드 로깅
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 개발 모드에서 실행 중');
    console.log('프로젝트 데이터:', projects);
    
    // 개발용 전역 함수들
    window.debugProjects = () => console.table(projects);
    window.debugFiltered = () => console.table(filteredProjects);
} 