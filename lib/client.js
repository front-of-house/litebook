;(function () {
  var menuToggle = document.getElementById('menuToggle')
  var menu = document.getElementById('menu')

  var open = false

  menuToggle.addEventListener('click', function () {
    if (open) {
      menu.style.display = 'none'
      document.body.style.overflow = ''
      open = false
    } else {
      menu.style.display = 'block'
      document.body.style.overflow = 'hidden'
      open = true
    }
  })
})()
