const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/main.ts",
    preload: "./src/preload.ts",
  },
  target: "electron-main",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [
          {
            loader: "ts-loader",
            options: {
              //트랜스파일시 타입체킹 무시 - 빌드 속도 비약적으로 상승
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: __dirname + "/.prod",
    filename: "[name].js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./static", to: "./static/" },
        /*electron에서 main.js와 같은 폴더에 없으면 실행 안 됨*/
        {
          from: "./package-deploy.json",
          to: "./package.json",
        },
        {
          from: "./next/out",
          to: "./",
        },
      ],
    }),
  ],
};
