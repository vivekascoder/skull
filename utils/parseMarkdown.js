/**
 * @name parseMarkdown
 * @description Parse markdown to html
 */

import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import frontMatter from "markdown-it-front-matter";
import YAML from "yaml";

const parseMarkdown = (markdown) => {
  let yamlContent;
  const md = new MarkdownIt()
    .use(frontMatter, (frontMatterContent) => {
      yamlContent = YAML.parse(frontMatterContent);
    })
    .use(prism, {});
  const htmlContent = md.render(markdown);
  return { html: htmlContent.toString(), frontMatter: yamlContent };
};

export { parseMarkdown };
