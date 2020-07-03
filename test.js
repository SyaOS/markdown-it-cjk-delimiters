/* eslint-env mocha */
const MarkdownIt = require('markdown-it')

const cjkDelimiters = require('.')

describe('markdown-it-cjk-delimiters', function () {
  it('should render delimiters in CJK correctly', function () {
    const markdownIt = new MarkdownIt()
    markdownIt.use(cjkDelimiters)
    markdownIt.renderInline('你好__世界__').should.be.equal('你好<strong>世界</strong>')
    markdownIt.renderInline('__你好__世界').should.be.equal('<strong>你好</strong>世界')
    markdownIt.renderInline('__你__好__世界').should.be.equal('<strong>你</strong>好__世界')
    markdownIt.renderInline('你好__世__界__').should.be.equal('你好<strong>世</strong>界__')
    markdownIt.renderInline('你__好__世__界').should.be.equal('你<strong>好</strong>世__界')
  })
})
