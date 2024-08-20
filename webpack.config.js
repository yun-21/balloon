const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 자바스크립트 파일의 진입점
  output: {
    filename: 'index.bundle.js', // 번들링된 파일 이름
    path: path.resolve(__dirname, 'dist') // 출력할 디렉토리
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // 원본 HTML 파일
    })
  ],
  mode: 'production' // 프로덕션 모드로 최적화
};
