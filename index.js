const cjk = require('cjk-regex')

const cjkRegExp = cjk().toRegExp()

/**
 * @private
 * @param {string} character
 * @returns {boolean}
 */
function isCJK (character) {
  return cjkRegExp.test(character)
}

/**
 * @param {import('markdown-it')} markdownIt
 */
module.exports = function cjkDelimiters (markdownIt) {
  markdownIt.inline.ruler2.before('balance_pairs', 'cjk_delimiters', function cjkDelimiters ({ tokens, delimiters }) {
    for (let i = 0, l = delimiters.length; i < l; i += 1) {
      const delimiter = delimiters[i]
      if (delimiter.jump === 0 && !delimiter.open) {
        // Possible delimiter opener
        const prevToken = tokens[delimiter.token - 1]
        if (prevToken != null && prevToken.type === 'text') {
          const prevCharacter = typeof prevToken.content === 'string' &&
            prevToken.content.slice(-1)
          if (isCJK(prevCharacter)) {
            // Make it delimiter opener
            for (let j = 0, m = delimiter.length; j < m; j += 1) {
              const openedDelimiter = delimiters[i + j]
              if (openedDelimiter != null) {
                openedDelimiter.open = true
              }
            }
          }
        }
      }
      if (delimiter.jump === delimiter.length - 1) {
        // Possible delimiter closer
        const nextToken = tokens[delimiter.token + 1]
        if (nextToken != null && nextToken.type === 'text') {
          const nextCharacter = typeof nextToken.content === 'string' &&
            nextToken.content.slice(0, 1)
          if (isCJK(nextCharacter)) {
            // Make it delimiter opener
            for (let j = 0, m = delimiter.length; j < m; j += 1) {
              const closedDelimiter = delimiters[i - j]
              if (closedDelimiter != null) {
                closedDelimiter.close = true
              }
            }
          }
        }
      }
    }
  })
}
