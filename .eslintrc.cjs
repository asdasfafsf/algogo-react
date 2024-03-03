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
  "parserOptions": {
      "project": "./tsconfig.json"
  },
  "rules": {
      "react/react-in-jsx-scope": 'off',
      "react/destructuring-assignment": "off"
  }
}