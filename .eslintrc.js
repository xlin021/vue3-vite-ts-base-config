module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // 'plugin:vue/essential',
    'plugin:vue/vue3-strongly-recommended',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'import/no-extraneous-dependencies': 'off'
  }
}
