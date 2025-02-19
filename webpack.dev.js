import { merge } from "webpack-merge";
import common from "./webpack.common.js";

/** @type {import("webpack").Configuration} */
export default merge(common, {
  mode: "development",
  devServer: {
    watchFiles: ["index.html", "src/**/*"],
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
