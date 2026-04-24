const sidebar = document.getElementById('sidebar')
const mainContent = document.getElementById('main-content')
const toggleBtn = document.getElementById('toggle-btn')

if (localStorage.getItem('sidebarCollapsed') === 'true') {
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
