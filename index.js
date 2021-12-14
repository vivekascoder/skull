import fileSystemAPI from "./utils/fileSystemAPI.js";
import parseMarkdown from "./utils/parseMarkdown.js";
import path from "path";
import ejs from "ejs";
import { promises as fs } from "fs";

let allParsedArticles = [];

const renderAllArticles = async () => {
  const articles = await fileSystemAPI.getAllArticles();
  articles.map(async (article) => {});
  for (let i = 0; i < articles.length; i++) {
    let article = articles[i];
    let parsed = await fileSystemAPI.renderArticle(article);
    console.log(parsed);
    allParsedArticles.push({
      ...parsed.frontMatter,
      url: path.join("./", article.replace(".md", ".html")),
    });
    // console.log(allParsedArticles);
  }
  ejs.renderFile(
    "./app/index.ejs",
    { articles: allParsedArticles },
    async (err, str) => {
      if (err) throw err;
      await fs.writeFile("./build/index.html", str);
    }
  );
};

await renderAllArticles();
console.log("Parsed:", allParsedArticles);
