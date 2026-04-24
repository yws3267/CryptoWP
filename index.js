const sidebar = document.getElementById('sidebar')
const mainContent = document.getElementById('main-content')
const toggleBtn = document.getElementById('toggle-btn')

if (window.innerWidth <= 768) {
  sidebar.classList.add('collapsed')
  mainContent.classList.add('expanded')
  localStorage.setItem('sidebarCollapsed', 'true')
} else if (localStorage.getItem('sidebarCollapsed') === 'true') {
  sidebar.classList.add('collapsed')
  mainContent.classList.add('expanded')
}

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed')
  mainContent.classList.toggle('expanded')

  localStorage.setItem(
    'sidebarCollapsed',
    sidebar.classList.contains('collapsed'),
  )
})
