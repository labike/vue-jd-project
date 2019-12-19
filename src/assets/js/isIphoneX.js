const isIphoneX = () => {
  if (typeof window !== 'undefined' && window) {
    // window.navigator.userAgent
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812
  }
  return false
}

window.isIphoneX = isIphoneX()
