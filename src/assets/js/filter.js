import Vue from 'vue'

Vue.filter('priceValue', (value) => {
  if (!value) {
    return '0.00'
  }
  let result = parseFloat(value)
  if (Number.isInteger(result)) {
    return result
  }
  return result.toFixed(2)
})

Vue.filter('filterTime', (value) => {
  if (!value) {
    return ''
  }

  // value 是不是时间格式 时:分:秒
  if (value.indexOf(':') === -1) {
    return value
  }

  let result = ''
  // arr[0] 小时
  // arr[1] 分钟
  // arr[3] 秒数
  const arr = value.split(':')

  // 对 小时、分钟、秒数 补0

  // 时
  if (parseInt(arr[0]) < 10) {
    result = '0' + arr[0]
  } else {
    result = arr[0]
  }

  // 分
  if (parseInt(arr[1]) < 10) {
    result = result + ':0' + arr[1]
  } else {
    result = result + ':' + arr[1]
  }

  // 秒
  if (parseInt(arr[2]) < 10) {
    result = result + ':0' + arr[2]
  } else {
    result = result + ':' + arr[2]
  }

  return result
})
