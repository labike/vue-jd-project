const MAX_FONT = 32

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > MAX_FONT ? MAX_FONT : fontSize
  html.style.fontSize = fontSize + 'px'
})
