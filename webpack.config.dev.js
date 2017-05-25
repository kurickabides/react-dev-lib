import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/client/app.jsx')
  ],
  target: 'web',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
        // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      title:'React',
      fullTitle: 'My WebSite',
      template: 'src/client/index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
  ],
  module: {
      loaders: [
       {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
       },
      {
        test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
      },
      //this is for loading Less and CSS
      {
        test: /\.less$/,
        loader: "style!css!autoprefixer!less?sourceMap", include: path.join(__dirname, 'src/client/public/styles')},
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap', include: path.join(__dirname, 'src/client/public/styles')},
      //This is for loading image files and fonts
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=10000'
      },
  {  test: /\.(jpg|png|gif|svg)$/,
  exclude: /(node_modules)/,
  loader: 'file-loader',
  options: {
    name: '[images][name].[ext]',
  }
},{
  test: /\.html$/,
  ignoreCustomFragments: [/\{\{.*?}}/],
  exclude: /node_modules/,
  loader: "raw-loader"
}
    ]
  }
}
