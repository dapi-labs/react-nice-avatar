module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      "version": "detect"
    }
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  "overrides": [
    {
      "files": ["*.js", "*.ts"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "warn"
      }
    }
  ]
};