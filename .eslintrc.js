module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
}
