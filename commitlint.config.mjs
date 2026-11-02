const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 运维改动（服务器、DNS、Ansible）用 ops。
    "type-enum": [
      2,
      "always",
      ["build", "chore", "ci", "docs", "feat", "fix", "ops", "perf", "refactor", "revert", "style", "test"],
    ],
    // 正文常写成一整段中文说明，不按行宽折行。
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};

export default config;
