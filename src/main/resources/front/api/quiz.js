//随机获取一个与上一次小测试不同的小测试
function getQuizByType (params) {
  return $axios({
    url: '/quiz/get',
    method: 'get',
    params
  })
}
//添加一个小测试
function addQuiz (params) {
  return $axios({
    url: '/quiz/post',
    method: 'post',
    params
  })
}