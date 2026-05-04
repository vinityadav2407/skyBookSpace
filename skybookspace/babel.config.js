// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-react',
  ],
  plugins: ['react-native-web'],
};