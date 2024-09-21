module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "airbnb",
      "airbnb/hooks",
      "airbnb-typescript"
  ],
  "ignorePatterns": ['vite.config.ts', "postcss.config.js"],
  "parserOptions": {
      "project": "./tsconfig.json",
  },
  "rules": {
      "react/react-in-jsx-scope": 'off',
      "react/destructuring-assignment": "off",
      "react/require-default-props": "off",
      "no-nested-ternary": "off",
      "import/no-extraneous-dependencies": "off",
      "react-hooks/exhaustive-deps": "off",
      "jsx-a11y/no-static-element-interactions": 'off',
      "@typescript-eslint/no-shadow": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "react/jsx-props-no-spreading": "off",
      "import/no-named-as-default": "off",
      'import/prefer-default-export': 'off',
      'no-param-reassign': 'off',
      'no-restricted-globals': 'off',
  }
}