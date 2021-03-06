/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const path = require( "path" );
const webpack = require( "webpack" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );

const iP = process.env.NODE_ENV === "production";

const HtmlWebpackPluginConfig = {
  filename: "index.html",
  template: "src/index.html",
};

module.exports = {
  iP,
  config: {
    entry: [
      "./src/index.js",
    ],

    output: {
      path: path.join( __dirname, "../dist" ),
      filename: "script.js",
      publicPath: "/",
    },

    resolve: {
      alias: {
        react: "preact-compat",
        "react-dom": "preact-compat",
      },
    },

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "env" ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images/",
              name: "[md5:hash:base64:6].[ext]",
            },
          },
        ],
      },
    ],

    plugins: [
      new UglifyJSPlugin(),
      new HtmlWebpackPlugin( HtmlWebpackPluginConfig ),
      new webpack.DefinePlugin( {
        "process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV || "development" ),
      } ),
    ],
  },
};
