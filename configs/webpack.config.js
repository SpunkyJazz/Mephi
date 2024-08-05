const prod = process.env.NODE_ENV === "production";

const path = require("path");
const rootDir = path.resolve(__dirname, "..");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const commonWebpackConfig = {
    mode: prod ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
      filename:
        env.NODE_ENV === "production"
          ? "[name].[contenthash].bundle.js"
          : "[name].bundle.js",
      path: path.resolve(rootDir, "build"),
      asyncChunks: true,
      chunkFilename: (pathData) => {
        return pathData.chunk.name === "main"
          ? "[name].chunk.js"
          : "[name]/[name].chunk.js";
      },
      clean: true,
      publicPath: "/",
      iife: false
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css", ".less", ".json"],
      alias: {
        src: path.resolve(rootDir, "src"),
        "styled-components": path.resolve(
          rootDir,
          "node_modules",
          "styled-components"
        )
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"]
          },
          use: "ts-loader"
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.(png|jpg|woff|woff2|eot|otf|gif|ico|mp4|webm|webp|jpeg)$/,
          type: "asset"
        }
      ]
    },
    devtool: prod ? undefined : "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        favicon: path.resolve(rootDir, "src/layout/favicon.ico"),
        template: path.resolve(rootDir, "src/layout/default.ejs"),
        publicPath: "/"
      }),
      new MiniCssExtractPlugin()
    ],
    devServer: {
      historyApiFallback: true,
      host: "localhost",
      port: 41001,
      hot: false,
      liveReload: true,
      static: path.join(rootDir, "build"),
      proxy: { "/test": "http://192.168.31.116:5005" }
    }
  };

  return commonWebpackConfig;
};
