//输入一个字符串，表示图片的**绝对地址**.返回一个字符串表示该图片的长宽,每个像素的RGBA值。使用滑动窗口算法取出每个值
function getImageData (params) {
  return $axios({
    url: '/img/data',
    method: 'get',
    params
  })
}

