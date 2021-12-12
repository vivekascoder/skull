import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkPrism from 'remark-prism'
import fs from 'fs'
import path from 'path'
const filePath = path.join('.', 'index.md')

main()

async function main() {
  fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, data) {
    if (err) console.error(err)
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(data)
    console.log(String(file))
  })
}
