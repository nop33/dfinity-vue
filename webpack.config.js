const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const dfxJson = require("./dfx.json");

// List of all aliases for canisters. This creates the module alias for
// the `import ... from "@dfinity/ic/canisters/xyz"` where xyz is the name of a
// canister.
const aliases = Object.entries(dfxJson.canisters).reduce(
  (acc, [name, _value]) => {
    // Get the network name, or `local` by default.
    const networkName = process.env["DFX_NETWORK"] || "local";
    const outputRoot = path.join(
      __dirname,
      ".dfx",
      networkName,
      "canisters",
      name
    );

    return {
      ...acc,
      ["dfx-generated/" + name]: path.join(outputRoot, name + ".js"),
    };
  },
  {}
);

/**
 * Generate a webpack configuration for a canister.
 */
function generateWebpackConfigForCanister(name, info, env) {
  if (typeof info.frontend !== "object") {
    return;
  }

  return {
    mode: env.development ? "development" : "production",
    entry: {
      // The frontend.entrypoint points to the HTML file for this build, so we need
      // to replace the extension to `.js`.
      index: path.join(__dirname, info.frontend.entrypoint).replace(/\.html$/, ".js"),
    },
    devtool: env.development ? "inline-source-map" : false,
    optimization: {
      minimize: true,
    },
    resolve: {
      alias: aliases,
      extensions: [".js", ".ts", ".jsx", ".tsx"],
      fallback: {
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "events": require.resolve("events/"),
        "stream": require.resolve("stream-browserify/"),
        "util": require.resolve("util/"),
      },
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist", name),
    },
    module: {
      rules: [
        { test: /\.vue$/, loader: "vue-loader" }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, info.frontend.entrypoint),
        filename: 'index.html',
        chunks: ['index'],
      }),
      new webpack.ProvidePlugin({
        Buffer: [require.resolve('buffer/'), 'Buffer'],
        process: require.resolve('process/browser'),
      }),
    ],
  };
}

// If you have additional webpack configurations you want to build
//  as part of this configuration, add them to the section below.
module.exports = env => {
  if (!env) {
    env = {}
  }

  return [
    ...Object.entries(dfxJson.canisters)
      .map(([name, info]) => {
        return generateWebpackConfigForCanister(name, info, env);
      })
      .filter((x) => !!x),
  ];
}
