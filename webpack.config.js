const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/index.js',
    about: './src/js/about.js',
    contact: './src/js/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader","css-loader",{
          loader: 'postcss-loader', 
          options: {
            plugins: function () { 
              return [
                require('autoprefixer')
              ];
            }
          }
        }, "sass-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: "body",
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/about.html',
      filename: 'pages/about.html',
      inject: "body",
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/contact.html',
      filename: 'pages/contact.html',
      inject: "body",
      chunks: ['contact']
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}