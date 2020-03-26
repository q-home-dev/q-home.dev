module.exports = {
  root: true,

  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },

  env: {
    browser: true
  },

  extends: [
    // "prettier",
    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // "plugin:vue/essential" // Priority A: Essential (Error Prevention)
    "plugin:vue/strongly-recommended" // Priority B: Strongly Recommended (Improving Readability)
    // 'plugin:vue/recommended' // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
  ],

  // required to lint *.vue files
  plugins: ["vue"],

  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true
  },

  // add your custom rules here
  rules: {
    "prefer-promise-reject-errors": "off",

    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "vue/html-indent": ["error", 2, { attribute: 2, closeBracket: 0 }],
    "vue/html-self-closing": "off",
    "max-len": "off",
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never"
      }
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 10,
        multiline: {
          max: 5,
          allowFirstLine: true
        }
      }
    ],
    "vue/multiline-html-element-content-newline": "off",
    // "vue/singleline-html-element-content-newline": [
    //   "error",
    //   {
    //     ignoreWhenNoAttributes: true,
    //     ignoreWhenEmpty: true,
    //     ignores: ["pre", "textarea", "p", "span", "li"]
    //   }
    // ],
    "vue/singleline-html-element-content-newline": "off"
  }
};
