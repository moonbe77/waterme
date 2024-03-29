module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
				".eslintrc.{js,cjs}", 
				"babel.config.{js,cjs}", 
				"metro.config.{js,cjs}", 
				"jest.config.{js,cjs}",
				"webpack.config.{js,cjs}"
			],
      parserOptions: {				
        sourceType: "script",
        ecmaFeatures: {
          jsx: true
        },
        // project: "./tsconfig.json",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
		"no-var-requires": "off",
		"@typescript-eslint/no-var-requires": "off"
  },
};
