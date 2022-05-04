module.exports = {
    extends: [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "prettier", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    plugins: ["@typescript-eslint", "prettier"],
    settings: {
        react: {
            version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    // Fine tune rules
    rules: {
        "import/no-extraneous-dependencies": "off",
        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "react/prop-types": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "react/button-has-type": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "no-param-reassign": "off",
        "react/no-array-index-key": "off",
        "jsx-a11y/no-autofocus": "off",
        "jest/no-conditional-expect": "off",
        "jest/no-try-expect": "off",
        "jsx-a11y/no-noninteractive-tabindex": "off",
        "class-methods-use-this": "off",
        "react/display-name": "off",
        "import/extensions": "off",
        "no-bitwise": "off",
        "no-nested-ternary": "off",
        "jsx-a11y/tabindex-no-positive": "off",
        "no-underscore-dangle": "off",
        "import/no-named-as-default": "off",
        "promise/catch-or-return": "off",
        "promise/always-return": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-empty-function": "off",
        "prettier/prettier": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/no-children-prop": "off",
    },
};
