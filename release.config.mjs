/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["release"],
  plugins: [
    ["@semantic-release/github", {
      labels: ["release"]
    }],
    ['@semantic-release/npm', {
      npmPublish: false, // Отключает публикацию в npm, но версию в package.json обновит
    }],
    ["@semantic-release/exec", {
      verifyConditionsCmd: "./verify.sh",
      prepareCmd: "node scripts/update-tauri-version.js ${nextRelease.version}",
    }],
  ]
};
