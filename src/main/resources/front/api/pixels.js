function getPixels (params) {
  return $axios({
    url: '/img/pixels',
    method: 'get',
    params
  })
}

function getSizes (params) {
  return $axios({
    url: '/img/sizes',
    method: 'get',
    params
  })
}
