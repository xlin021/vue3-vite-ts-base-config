module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    // 'plugin:vue/essential',
    'plugin:vue/vue3-strongly-recommended',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    camelcase: [1, {
      properties: 'never'
    }],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never'
      }
    ],
    'vue/multi-word-component-names': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
  // overrides: [
  //   {
  //     files: ['src/api/**/*.ts'],
  //     rules: {
  //       camelcase: 'off'
  //     }
  //   }
  // ]
}
