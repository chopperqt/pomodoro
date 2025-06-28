/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ["release"],
  plugins: [
    "@semantic-release/github",
    ["@semantic-release/exec", {
      "prepareCmd": "node scripts/update-tauri-version.js ${nextRelease.version}"
    }],
  ]
};
