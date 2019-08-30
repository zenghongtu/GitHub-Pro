const path = require("path")

module.exports = {
  env: {
    NODE_ENV: '"development"',
    ClOUD_ENV: '"dev-002r4"'
  },
  defineConstants: {},
  alias: {
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/hooks": path.resolve(__dirname, "..", "src/hooks"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/services": path.resolve(__dirname, "..", "src/services"),
    "@/constants": path.resolve(__dirname, "..", "src/constants.ts"),
    "@/package": path.resolve(__dirname, "..", "package.json")
  },
  copy: {
    patterns: [
      {
        from: "src/wemark",
        to: "dist/wemark"
      }
    ],
    options: {}
  },
  weapp: {
    compile: {
      exclude: ["src/wemark/remarkable.js"]
    }
  },
  h5: {}
}
