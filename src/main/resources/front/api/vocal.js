//获取语音识别结果
function getVocalData (params) {
  return $axios({
    url: '/vcl/get',
    method: 'get',
    params
  })
}

