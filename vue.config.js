module.exports = {
  publicPath: '/cenital-web-control/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = "Cenital Web Control"
      return args;
    })
  }
}