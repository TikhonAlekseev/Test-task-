const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry:['whatwg-fetch','@babel/polyfill','./src/main.js']
  ,  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template:"./src/index.html"
    }),
    new MiniCssExtractPlugin({
    }),
  ],
  devServer:{
    contentBase: './dist'
  },
  module:{
    rules:[
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', 
                      ]
                    },
                  ],
                ],
              },
            },
          },
           "sass-loader",
          ],
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        loader:'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img',
          
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
      
    ]
  }
  


  

}; 