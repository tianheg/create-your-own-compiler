const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer.js')
const generateCode = require('./generateCode')

module.exports = function compiler(input) {
  /**
   * 1. Lexical Analysis
   *    将输入代码（字符串）变成目标语言的基本语法（对象数组）
   */
  const tokens = tokenizer(input)
  /**
   * 2. Syntactic Analysis
   *    将标记（对象数组）转换成代表程序的 AST（对象树）
   */
  const lispAST = parser(tokens)
  /**
   * 3. Transformation
   *    将 Lisp AST 转换为 JavaScript AST
   */
  const jsAST = transformer(lispAST)

  /**
   * 4. Code Generation
   *    将目标 AST（多个对象中的一个） 转换成真实代码（字符串）
   */
  const jsCode = generateCode(jsAST)
  return jsCode
}