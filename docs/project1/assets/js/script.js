// 가이드라인 Rule: 예측 가능성 - 프레젠테이션 상태와 동작을 클래스로 캡슐화
class PresentationController {
    constructor(selector) {
        this.container = document.querySelector(selector);
        if (!this.container) return;

        this.slides = Array.from(this.container.children);
        this.currentSlideIndex = 0;
        this.activeTimers = []; // 슬라이드별 애니메이션 타이머 관리

        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.progressBar = document.querySelector('.progress-bar');
        
        this.init();
    }

    init() {
        this.updateSlideVisibility();
        this.updateProgressBar();
        this.updateNavButtons();

        // 이벤트 리스너 바인딩
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });
    }

    goTo(index) {
        if (index < 0 || index >= this.slides.length || index === this.currentSlideIndex) return;

        this.clearAnimations(); // 이전 슬라이드 애니메이션 정리
        this.currentSlideIndex = index;
        this.updateSlideVisibility();
        this.updateProgressBar();
        this.updateNavButtons();
        this.runSlideSpecificAnimations(this.slides[index].dataset.slideId);
    }

    next() {
        this.goTo(this.currentSlideIndex + 1);
    }

    prev() {
        this.goTo(this.currentSlideIndex - 1);
    }

    updateSlideVisibility() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlideIndex);
        });
    }

    updateProgressBar() {
        const progress = ((this.currentSlideIndex + 1) / this.slides.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    updateNavButtons() {
        this.prevBtn.style.display = this.currentSlideIndex === 0 ? 'none' : 'block';
        this.nextBtn.style.display = this.currentSlideIndex === this.slides.length - 1 ? 'none' : 'block';
    }

    // 모든 타이머(setTimeout, setInterval)를 정리하여 슬라이드 간섭 방지
    clearAnimations() {
        this.activeTimers.forEach(timerId => clearTimeout(timerId));
        this.activeTimers = [];
        // 동적으로 추가된 요소 정리 (예: 아키텍처 다이어그램 화살표)
        const dynamicElements = document.querySelectorAll('.dynamic-element');
        dynamicElements.forEach(el => el.remove());
    }

    // 현재 슬라이드에 필요한 애니메이션 실행
    runSlideSpecificAnimations(slideId) {
        if (slideId === '4') {
            this.createArchitectureAnimation();
        }
    }
    
    // 가이드라인 Rule: 응집도 - 개념 시각화 로직의 높은 응집도 유지
    createArchitectureAnimation() {
        const diagram = document.getElementById('architecture-diagram');
        if (!diagram) return;

        const client = document.getElementById('arch-client');
        const server = document.getElementById('arch-server');
        const db = document.getElementById('arch-db');
        
        const createArrow = (from, to, id, text, topOffset = 0) => {
            const arrow = document.createElement('div');
            arrow.id = id;
            arrow.className = 'arch-arrow dynamic-element';
            
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            const diagramRect = diagram.getBoundingClientRect();

            const startX = fromRect.right - diagramRect.left;
            const endX = toRect.left - diagramRect.left;

            arrow.style.position = 'absolute';
            arrow.style.left = `${startX + 10}px`;
            arrow.style.top = `${fromRect.height / 2 + topOffset}px`;
            arrow.style.width = `${endX - startX - 20}px`;
            arrow.style.opacity = '0';
            arrow.style.transition = 'opacity 0.5s ease-in-out';
            arrow.style.color = 'var(--accent-green)';
            arrow.style.fontSize = '1rem';
            arrow.style.display = 'flex';
            arrow.style.alignItems = 'center';
            arrow.style.justifyContent = 'center';
            
            arrow.innerHTML = `<i class="fas fa-long-arrow-alt-right"></i> <span class="text-sm ml-2">${text}</span>`;
            diagram.appendChild(arrow);
            return arrow;
        };

        const createBackArrow = (from, to, id, text, topOffset = 0) => {
            const arrow = document.createElement('div');
            arrow.id = id;
            arrow.className = 'arch-arrow dynamic-element';
            
            const fromRect = from.getBoundingClientRect();
            const toRect = to.getBoundingClientRect();
            const diagramRect = diagram.getBoundingClientRect();

            const startX = fromRect.left - diagramRect.left;
            const endX = toRect.right - diagramRect.left;

            arrow.style.position = 'absolute';
            arrow.style.left = `${endX + 10}px`;
            arrow.style.top = `${fromRect.height / 2 + topOffset}px`;
            arrow.style.width = `${startX - endX - 20}px`;
            arrow.style.opacity = '0';
            arrow.style.transition = 'opacity 0.5s ease-in-out';
            arrow.style.color = 'var(--accent-blue)';
            arrow.style.fontSize = '1rem';
            arrow.style.display = 'flex';
            arrow.style.alignItems = 'center';
            arrow.style.justifyContent = 'center';
            arrow.style.textAlign = 'right';
            
            arrow.innerHTML = `<span class="text-sm mr-2">${text}</span> <i class="fas fa-long-arrow-alt-left"></i>`;
            diagram.appendChild(arrow);
            return arrow;
        };

        const arrow1 = createArrow(client, server, 'arrow1', '요청');
        const arrow2 = createBackArrow(client, server, 'arrow2', '응답', 40);
        const arrow3 = createArrow(server, db, 'arrow3', '데이터 조회/저장', 20);

        // 애니메이션 순차 실행
        const timer1 = setTimeout(() => { arrow1.style.opacity = '1'; }, 500);
        const timer2 = setTimeout(() => { arrow3.style.opacity = '1'; }, 1000);
        const timer3 = setTimeout(() => { arrow2.style.opacity = '1'; }, 1500);

        this.activeTimers.push(timer1, timer2, timer3);
    }
}

// DOM이 로드된 후 프레젠테이션 컨트롤러 실행
document.addEventListener('DOMContentLoaded', () => {
    new PresentationController('#presentation-container');
}); 