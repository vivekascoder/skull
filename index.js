import path from "path";
import { promises as fs } from "fs";
import ejs from "ejs";
import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import frontMatter from "markdown-it-front-matter";
import config from "./skull-config.js";
import YAML from "yaml";

const md = MarkdownIt()
  .use(frontMatter, (d) => {
    console.log(YAML.parse(d));
  })
  .use(prism, {});

const rootDir = process.cwd();
const buildDir = path.join(rootDir, config.buildDirectory);
const articleDir = path.join(rootDir, config.contentDirectory, "articles");
const articles = (await fs.readdir(articleDir)).filter((file) =>
  file.endsWith(".md")
);

// Loop over all the articles and convert them to HTML
articles.map(async (file) => {
  const filePath = path.join(articleDir, file);
  const content = await fs.readFile(filePath, "utf8");
  const htmlContent = md.render(content);
  const htmlFileName = path.join(buildDir, file.replace(".md", ".html"));

  console.log(`Rendering ${file}...`);

  ejs.renderFile(
    path.join(rootDir, config.app.directory, config.app.baseTemplate),
    { content: htmlContent.toString() },
    {},
    async (err, str) => {
      await fs.writeFile(htmlFileName, str);
    }
  );
  console.log(`Compiled Project.`);
});
