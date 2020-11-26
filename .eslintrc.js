// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
<<<<<<< HEAD
    'plugin:vue/essential', 
=======
    'plugin:vue/essential',
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
<<<<<<< HEAD
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
=======
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ["error", "never"]
>>>>>>> 8c8ac4eb34182153ae500e78e204442ef4759574
  }
}
