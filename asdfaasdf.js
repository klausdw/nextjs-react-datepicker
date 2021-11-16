module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "next/core-web-vitals",
        "prettier/@typescript-eslint",
        "prettier/standar",
        "pretter/react"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        // "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "space-before-function-paren": "off",
        "react/prop-types": "off"
    }
};
