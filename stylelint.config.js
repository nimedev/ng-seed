'use strict'

module.exports = {
  rules: {
    // at-rule
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'inside-block',
          'blockless-after-blockless'
        ]
      }
    ],

    // block
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',

    // color
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'color-no-invalid-hex': true,

    // Comment
    'comment-empty-line-before': [
      'always',
      {
        except: [
          'first-nested'
        ]
      }
    ],
    'comment-whitespace-inside': 'always',

    // Declaration block
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',

    // Declaration
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-newline-after': 'always-multi-line',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',

    // Function
    'function-calc-no-unspaced-operator': true,
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-whitespace-after': 'always',
    'function-url-quotes': 'always',

    // General
    indentation: 2,
    'max-empty-lines': 1,
    'max-line-length': [
      80,
      {
        ignore: 'non-comments'
      }
    ],
    'no-eol-whitespace': true,

    // length
    'length-zero-no-unit': true,

    // Media query list
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',

    // media
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    // number
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,

    // rule
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: [
          'first-nested'
        ],
        ignore: [
          'after-comment'
        ]
      }
    ],

    // selector list
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-space-before': 'never',

    // selector
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-pseudo-element-colon-notation': 'double',

    // string
    'string-quotes': 'double',

    // Value list
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never'
  }
}
