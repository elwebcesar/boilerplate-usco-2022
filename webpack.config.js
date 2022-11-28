const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  devServer: {
    // contentBase
    static : {
      directory : path.join(__dirname, "dist/")
    },
    port: 3000,
    // publicPath
    devMiddleware:{
       publicPath: "https://localhost:3000/dist/",
    }
    // hotOnly
    // hot: "only", // hot:true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
          // "style-loader", // creates style nodes from JS strings
          // "css-loader", // translates CSS into CommonJS
          // "sass-loader", // compiles Sass to CSS
        ]
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin()
    // new MiniCssExtractPlugin({ filename: 'css/style.css' }) //queda dentro de folder js
    new MiniCssExtractPlugin({ filename: '../css/style.css' })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      // new TerserPlugin(),
    ]
  }
};

// ok
