/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["release"],
  plugins: [
    "@semantic-release/github",
    ['@semantic-release/npm',
      {
        npmPublish: false, // Отключает публикацию в npm, но версию в package.json обновит
      }],
    ["@semantic-release/exec", {
      "prepareCmd": "node scripts/update-tauri-version.js ${nextRelease.version}"
    }],
  ]
};
