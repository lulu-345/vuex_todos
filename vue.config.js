const BASE_URL = process.env.NODE_ENV === 'production' ? '/vuex_todos/' : '/'
module.exports = {
  publicPath: BASE_URL
}
