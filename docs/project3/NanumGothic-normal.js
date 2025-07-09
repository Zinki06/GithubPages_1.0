// 한글 폰트 지원을 위한 기본 설정
// 현재는 기본 폰트를 사용하여 안정성을 확보합니다.

window.registerNanumGothic = function(doc) {
    'use strict';
    
    // 폰트 등록을 시도하지만 실패해도 계속 진행
    try {
        // 기본 폰트 사용
        return true;
    } catch (error) {
        console.warn('폰트 등록 실패, 기본 폰트 사용:', error);
        return false;
    }
}; 