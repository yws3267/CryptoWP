// HTML 요소들을 변수에 할당합니다.
const sidebar = document.getElementById('sidebar')
const mainContent = document.getElementById('main-content')
const toggleBtn = document.getElementById('toggle-btn')

// 버튼에 클릭 이벤트 리스너를 추가합니다.
toggleBtn.addEventListener('click', () => {
  // 1. 사이드바의 상태를 토글 (펼침 <-> 접힘)
  // CSS에서 설정한 .sidebar.collapsed 스타일이 적용됩니다.
  sidebar.classList.toggle('collapsed')

  // 2. 메인 콘텐츠의 여백을 토글 (기본 여백 <-> 좁은 여백)
  // CSS에서 설정한 .main-content.expanded 스타일이 적용됩니다.
  mainContent.classList.toggle('expanded')

  // (선택 사항) 버튼의 모양을 변경하고 싶다면 아래 코드를 추가하세요.
  if (sidebar.classList.contains('collapsed')) {
    toggleBtn.innerText = '☰' // 접혔을 때 모양
  } else {
    toggleBtn.innerText = '☰' // 펼쳐졌을 때 모양
  }
})
