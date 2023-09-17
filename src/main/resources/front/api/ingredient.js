//获取随机一个药材图片
function getRandomIngredientPic (params) {
  return $axios({
    url: '/ingredient/pic',
    method: 'get',
    params
  })
}
//获取随机一个药材其信息
function getRandomIngredient (params) {
  return $axios({
    url: '/ingredient/rand',
    method: 'get',
    params
  })
}
//添加一个药材信息
function addIngredient (params) {
  return $axios({
    url: '/ingredient/post',
    method: 'post',
    params
  })
}
//通过id获取药材的信息
function getIngredientById (params) {
  return $axios({
    url: '/ingredient/get',
    method: 'get',
    params
  })
}
//通过名称获取药材的信息
function getIngredientByName (params) {
  return $axios({
    url: '/ingredient/nameget',
    method: 'get',
    params
  })
}