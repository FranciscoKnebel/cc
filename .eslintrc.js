module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "browser": true,
    "node": true,
		"jquery": true
  },
  "rules": {
    "indent": [2, "tab"],
		"no-tabs": 0,
		"consistent-return": 0,
		"strict": 0,
		"no-underscore-dangle": 0,
		"no-unused-vars": 0,
		"no-param-reassign": 0,
		"prefer-arrow-callback": 0,
  }
};
