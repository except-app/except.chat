const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
const path = require('path');
const webpack = require('webpack');

const VENDOR = ['react', 'react-dom'];

module.exports = {
  // context: path.resolve('src/'),
  devtool: 'inline-source-map',
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', //we will only use [name].[chunkhash:8].js in production
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'css-hot-loader' },
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), //for prod we will use webpack.HashedModuleIdsPlugin()
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new webpack.DefinePlugin({
      DEV: true
    })
    // new webpack.IgnorePlugin(/\.svg$/),
    // new OfflinePlugin({ caches: { main: [] } }),
  ],
  devServer: {
    hot: true,
    inline: true,
    open: true,
    // host: '192.168.0.106',
    port: '8080',
    // https: true,
    compress: true,
    stats: {
      hash: true,           // add the hash of the compilation
      version: false,       // add webpack version information
      timings: true,        // add timing information
      assets: false,        // add assets information
      chunks: true,         // add chunk information
      chunkModules: false,  // add built modules information to chunk information
      env: true,
      performance: true,
      modules: false,       // add built modules information
      cached: true,         // add also information about cached (not built) modules
      reasons: true,        // add information about the reasons why modules are included
      source: false,        // add the source code of modules
      errorDetails: false,  // add details to errors (like resolving log)
      chunkOrigins: false,  // add the origins of chunks and chunk merging info
      modulesSort: false,   // (string) sort the modules by that field
      chunksSort: false,    // (string) sort the chunks by that field
      assetsSort: false,
    }
  },
};