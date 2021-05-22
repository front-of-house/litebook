;(function () {
  var menuToggle = document.getElementById('menuToggle')
  var menu = document.getElementById('menu')

  var open = false

  menuToggle.addEventListener('click', function () {
    if (open) {
      menu.style.display = 'none'
      open = false
    } else {
      menu.style.display = 'block'
      open = true
    }
  })
})()
