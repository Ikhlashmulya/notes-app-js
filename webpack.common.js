import HtmlWebpackPlugin from "html-webpack-plugin";
import { join } from "path";
import { cwd } from "process";

/** @type {import("webpack").Configuration} */
export default {
  entry: join(cwd(), "src/main.js"),
  output: {
    path: join(cwd(), "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(cwd(), "index.html"),
      filename: "index.html",
    }),
  ],
};
