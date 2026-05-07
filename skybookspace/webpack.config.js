const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const { presets } = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
  'react-native',
  'react-native-animatable',
  'react-native-vector-icons',
  'react-native-toast-message',
'@react-native/new-app-screen',    // ← ADD THIS
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));


const babelLoaderConfiguration = {
  test: /\.[jt]sx?$/,
  include: [
    path.resolve(__dirname, 'index.web.js'),
    path.resolve(__dirname, 'App.js'),        // ← ADD THIS
    path.resolve(__dirname, 'App.jsx'),       // ← ADD THIS (just in case)
    path.resolve(__dirname, 'App.tsx'),       // ← ADD THIS (just in case)
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'stubs'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: [
        'react-native-web',
        '@babel/plugin-transform-flow-strip-types',
      ],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [{ loader: '@svgr/webpack' }],
};

const fontLoaderConfiguration = {
  test: /\.(ttf|otf)$/,
  type: 'asset/resource',
  include: [
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
  ],
  generator: {
    filename: 'assets/fonts/[name][ext]',
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  type: 'asset/resource',
  generator: {
    filename: 'assets/images/[name][ext]',
  },
};

module.exports = {
  entry: {
    app: path.join(__dirname, 'index.web.js'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'skybookspace.bundle.js',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native/Libraries/TurboModule/TurboModuleRegistry': path.resolve(
        __dirname,
        'stubs/TurboModuleRegistry.web.js',
      ),
      'react-native-linear-gradient': path.resolve(
        __dirname,
        'stubs/LinearGradient.web.js',
      ),
      '@react-native-documents/picker': path.resolve(
        __dirname,
        'stubs/DocumentPicker.web.js',
      ),
         '@notifee/react-native': path.resolve(   // ← ADD THIS
      __dirname, 'stubs/Notifee.web.js',
    ),
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      fontLoaderConfiguration,
      {
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(true),
    }),
  ],
};