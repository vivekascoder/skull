/**
 * @name fileSystemAPI
 * @description Contains utilities to work with the file system API.
 */

import { promises as fs } from "fs";
import path from "path";
import config from "../skull-config.js";
import { parseMarkdown } from "./parseMarkdown.js";
import ejs from "ejs";

const getFilesIn = async (folderPath, pattern = /(\.md)/) => {
  return (await fs.readdir(folderPath)).filter((file) => pattern.test(file));
};

const getAllArticles = async () => {
  return await getFilesIn(path.join(config.contentDirectory, "articles"));
};

const getAllTags = async () => {
  return await getFilesIn(path.join(config.contentDirectory, "tags"));
};

const getArticlePath = (article) => {
  return path.join(config.contentDirectory, "articles", article);
};

const getTagsPath = (article) => {
  return path.join(config.contentDirectory, "tags", article);
};

const getBuildDirectory = () => {
  return path.join(config.buildDirectory);
};
const getBaseTemplateFile = () => {
  return path.join(config.app.directory, config.app.baseTemplate);
};

const renderArticle = async (articleName) => {
  const articlePath = getArticlePath(articleName);
  const htmlFilePath = path.join(
    getBuildDirectory(),
    articleName.replace(".md", ".html")
  );
  const content = await fs.readFile(articlePath, "utf8");
  const parsedContent = parseMarkdown(content);
  ejs.renderFile(
    getBaseTemplateFile(),
    { content: parsedContent.html, ...parsedContent.frontMatter },
    {},
    async (err, html) => {
      if (err) {
        console.log(err);
      }
      await fs.writeFile(htmlFilePath, html);
    }
  );
  // console.log(parsedContent);
  return parsedContent;
};

const fileSystemAPI = {
  getFilesIn,
  getAllArticles,
  getAllTags,
  getArticlePath,
  getTagsPath,
  getBuildDirectory,
  renderArticle,
};

export default fileSystemAPI;
