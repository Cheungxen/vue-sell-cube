const webpack = require('webpack')
const mockData = require('./data.json')
const seller = mockData.seller
const goods = mockData.goods
const ratings = mockData.ratings
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
    // config.plugin('context')
    //   .use(webpack.ContextReplacementPlugin,
    //     [/moment[/\\]locale$/, /zh-cn/])
  }
}
