// 프로젝트 데이터를 동적으로 로드하는 시스템
let projects = [];

// DOM 요소들
const projectsGrid = document.getElementById('projectsGrid');
const searchInput = document.getElementById('searchInput');
const tagButtons = document.querySelectorAll('.tag-btn');
const loading = document.getElementById('loading');

// 전역 변수
let filteredProjects = [];
let currentFilter = 'all';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    loadAllProjects();
});

// 프로젝트들을 동적으로 로드
async function loadAllProjects() {
    try {
        const loadedProjects = [];
        let projectNumber = 1;
        let consecutiveFailures = 0;
        
        // project1, project2, project3... 순서대로 시도
        while (consecutiveFailures < 3 && projectNumber <= 50) { // 연속 3번 실패하거나 50개까지
            try {
                const projectId = `project${projectNumber}`;
                const metaResponse = await fetch(`./${projectId}/project-meta.json`);
                
                if (metaResponse.ok) {
                    const projectMeta = await metaResponse.json();
                    projectMeta.url = `./${projectId}/`;
                    loadedProjects.push(projectMeta);
                    console.log(`✅ ${projectId} 로드 완료`);
                    consecutiveFailures = 0; // 성공하면 실패 카운트 초기화
                } else {
                    consecutiveFailures++;
                    console.log(`⚠️ ${projectId} 메타데이터를 찾을 수 없습니다`);
                }
            } catch (error) {
                consecutiveFailures++;
                console.log(`⚠️ project${projectNumber} 로드 실패:`, error.message);
            }
            projectNumber++;
        }
        
        projects = loadedProjects;
        filteredProjects = [...projects];
        
        console.log(`🎉 총 ${projects.length}개 프로젝트 로드 완료`);
        
        hideLoading();
        renderProjects();
        initializeEventListeners();
        
    } catch (error) {
        console.error('프로젝트 로딩 중 오류:', error);
        hideLoading();
        showErrorMessage();
    }
}

// 에러 메시지 표시
function showErrorMessage() {
    projectsGrid.innerHTML = `
        <div class="empty-state">
            <h3>프로젝트를 불러올 수 없습니다</h3>
            <p>잠시 후 다시 시도해주세요.</p>
            <button onclick="location.reload()" class="retry-btn" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">새로고침</button>
        </div>
    `;
}

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

    projectsGrid.innerHTML = filteredProjects.map((project, index) => {
        // 그라데이션 썸네일 처리
        let thumbnailContent = '';
        if (project.thumbnail.startsWith('gradient-')) {
            const gradientNumber = project.thumbnail.split('-')[1];
            const gradients = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            ];
            const gradientIndex = (parseInt(gradientNumber) - 1) % gradients.length;
            thumbnailContent = `<div class="gradient-thumbnail" style="background: ${gradients[gradientIndex]}; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">${project.id.replace('project', '')}</div>`;
        } else if (project.thumbnail.includes('http') || project.thumbnail.includes('assets')) {
            thumbnailContent = `<img src="${project.thumbnail}" alt="${project.title} 썸네일" onerror="this.parentElement.innerHTML='<div class=\\"gradient-thumbnail\\" style=\\"background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;\\">${project.id.slice(-1)}</div>';">`;
        } else {
            thumbnailContent = `<div class="gradient-thumbnail" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">${project.id.slice(-1)}</div>`;
        }

        return `
            <article class="project-card" data-project-id="${project.id}" onclick="navigateToProject('${project.url}')">
                <div class="project-thumbnail">
                    ${thumbnailContent}
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
        `;
    }).join('');

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

// 성능 최적화를 위한 디바운스 함수
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

// 디바운스된 검색 처리
const debouncedSearch = debounce(function(searchTerm, filter) {
    filterProjects(searchTerm, filter);
}, 300);

// 반응형 그리드 최적화
function handleResize() {
    // 반응형 처리가 필요한 경우 여기에 추가
}

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', debounce(handleResize, 250));

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
    console.log('프로젝트 로딩 시스템 활성화');
    
    // 개발용 전역 함수들
    window.debugProjects = () => console.table(projects);
    window.debugFiltered = () => console.table(filteredProjects);
    window.reloadProjects = () => {
        showLoading();
        loadAllProjects();
    };
} 