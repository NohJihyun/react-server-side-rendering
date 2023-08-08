const paths = require("./paths");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const getClientEnvironment = require("./env");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: "production", // 프로덕션 모드로 설정하여 최적화 옵션들을 활성화
  entry: paths.ssrIndexJs, // 엔트리 경로
  target: "node", // node 환경에서 실행 될 것이라는 것을 명시
  output: {
    path: paths.ssrBuild, // 빌드 경로
    filename: "server.js", // 파일이름
    chunkFilename: "js/[name].chunk.js", // 청크 파일이름
    publicPath: paths.publicUrlOrPath, // 정적 파일이 제공 될 경로
  },

  module: {
    rules: [
      {
        oneOf: [
          // 자바스크립트를 위한 처리
          // 기존 webpack.config.js 를 참고하여 작성
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides"
              ),
              presets: [
                [
                  require.resolve("babel-preset-react-app"),
                  {
                    runtime: "automatic",
                  },
                ],
              ],
              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          "@svgr/webpack?-svgo,+titileProp,+ref![path]",
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          // CSS 를 위한 처리
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            //  exportOnlyLocals: true 옵션을 설정해야 실제 css 파일을 생성하지 않습니다.
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
          // CSS Module 을 위한 처리
          {
            test: cssModuleRegex,
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,

              modules: {
                exportOnlyLocals: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          // Sass 를 위한 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 3,
                  module: {
                    exportOnlyLocals: true,
                  },
                },
              },
              require.resolve("sass-loader"),
            ],
          },
          // Sass + CSS Module 을 위한 처리
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 3,
                  modules: {
                    exportOnlyLocals: true,
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
              },
              require.resolve("sass-loader"),
            ],
          },
          // url-loader 를 위한 설정
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("resolve-url-loader"),
            options: {
              emitFile: false, // 파일을 따로 저장하지 않는 옵션
              limit: 10000, // 원래는 9.76KB가 넘어가면 파일로 저장하는데
              // emitFile 값이 false 일땐 경로만 준비하고 파일은 저장하지 않습니다.
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // 위에서 설정된 확장자를 제외한 파일들은
          // file-loader 를 사용합니다.
          {
            loader: require.resolve("file-loader"),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false, // 파일을 따로 저장하지 않는 옵션
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
  },
  externals: [
    nodeExternals({
      allowlist: [/@babel/],
    }),
  ],
  plugins: [
    new webpack.DefinePlugin(env.stringified), // 환경변수를 주입해줍니다.
  ],
};

// //547 서버사이드렌더링구현
// //547 서버사이드렌더링 - 작성한 엔트리 파일을 웹팩으로 불러와서 빌드하려면 1.서버전용환경설정2.웹팩환경설정파일작성
// //547 두번째 웹팩환경설정파일작성
// const paths = require("./paths");
// //548 로더 설정 확장자에 맞게 처리
// const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
// //553 서버를 위해 번들링할 때는 node_modules에서 불러오는것을 제외하고 번들링하는것이 좋다
// //553 webpack-node-externals 라이브러리 적용 상위 내용으로 라이브러리 적용한다
// const nodeExternals = require("webpack-node-externals");
// //553 환경변수주입
// const webpack = require("webpack");
// const getClientEnvironment = require("./env");

// //Regex 정규표현식
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
// const sassRegex = /\.(scss|sass)$/;
// const sassModuleRegex = /\.module\.(scss|sass)$/;

// //553 환경변수
// const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

// module.exports = {
//   mode: "production", // 프로덕션 모드로 설정하여 최적화 옵션들을 활성화
//   entry: paths.ssrIndexJs, // 엔트리 경로
//   target: "node", // node 환경에서 실행될 것이라는 점을 명시
//   output: {
//     path: paths.ssrBuild, //빌드경로
//     filename: "server.js", // 파일 이름
//     chunkFilename: "js/[name].chunk.js", //청크 파일 이름
//     publicPath: paths.publicUrlOrPath, //정적 파일 제공될 경로
//   },
//   // 로더 설정
//   // 웹팩의 로더는 파일을 불러올 때 확장자에 맞게 필요한 처리를 해줌.
//   module: {
//     rules: [
//       {
//         oneOf: [
//           // 자바스크립트를 위한 처리
//           // 기존 webpack.config.js 를 참고하여 작성
//           {
//             test: /\.(js|mjs|jsx|ts|tsx)$/,
//             include: paths.appSrc,
//             loader: require.resolve("babel-loader"),
//             options: {
//               customize: require.resolve(
//                 "babel-preset-react-app/webpack-overrides"
//               ),
//               plugins: [
//                 [
//                   require.resolve("babel-plugin-named-asset-import"),
//                   {
//                     loaderMap: {
//                       svg: {
//                         ReactComponent: "@svgr/webpack?-svgo![path]",
//                       },
//                     },
//                   },
//                 ],
//               ],
//               cacheDirectory: true,
//               cacheCompression: false,
//               compact: false,
//             },
//           },

//           // CSS 를 위한 처리
//           {
//             test: cssRegex,
//             exclude: cssModuleRegex,
//             //  exportOnlyLocals: true 옵션을 설정해야 실제 css 파일을 생성하지 않습니다.
//             loader: require.resolve("css-loader"),
//             options: {
//               exportOnlyLocals: true,
//             },
//           },
//           // CSS Module 을 위한 처리
//           {
//             test: cssModuleRegex,
//             loader: require.resolve("css-loader"),
//             options: {
//               modules: true,
//               exportOnlyLocals: true,
//               getLocalIdent: getCSSModuleLocalIdent,
//             },
//           },
//           // Sass 를 위한 처리
//           {
//             test: sassRegex,
//             exclude: sassModuleRegex,
//             use: [
//               {
//                 loader: require.resolve("css-loader"),
//                 options: {
//                   exportOnlyLocals: true,
//                 },
//               },
//               require.resolve("sass-loader"),
//             ],
//           },
//           // Sass + CSS Module 을 위한 처리
//           {
//             test: sassRegex,
//             exclude: sassModuleRegex,
//             use: [
//               {
//                 loader: require.resolve("css-loader"),
//                 options: {
//                   modules: true,
//                   exportOnlyLocals: true,
//                   getLocalIdent: getCSSModuleLocalIdent,
//                 },
//               },
//               require.resolve("sass-loader"),
//             ],
//           },
//           // url-loader 를 위한 설정
//           {
//             test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//             loader: require.resolve("url-loader"),
//             options: {
//               emitFile: false, // 파일을 따로 저장하지 않는 옵션
//               limit: 10000, // 원래는 9.76KB가 넘어가면 파일로 저장하는데
//               // emitFile 값이 false 일땐 경로만 준비하고 파일은 저장하지 않습니다.
//               name: "static/media/[name].[hash:8].[ext]",
//             },
//           },
//           // 위에서 설정된 확장자를 제외한 파일들은
//           // file-loader 를 사용합니다.
//           {
//             loader: require.resolve("file-loader"),
//             exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
//             options: {
//               emitFile: false, // 파일을 따로 저장하지 않는 옵션
//               name: "static/media/[name].[hash:8].[ext]",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   //node_modules 내부의 라이브러리를 불러올 수 있게 설정
//   resolve: {
//     modules: ["node_modules"],
//   },
//   //553 서버를 위해 번들링할때 노드모듈스에서 불러오는것을 제외하고 번들링하기 위해서 적용
//   externals: [
//     nodeExternals({
//       allowlist: [/@babel/],
//     }),
//   ],
//   // 환경변수를 주입해줍니다.
//   plugins: [new webpack.DefinePlugin(env.stringified)],
// };
