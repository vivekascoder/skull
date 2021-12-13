/**
 * @name fileSystemAPI
 * @description Contains utilities to work with the file system API.
 */

import { promises as fs } from "fs";
import path from "path";
import config from "../skull-config.js";

const getFilesIn = async (folderPath, pattern = /(\.md)/) => {
  return (await fs.readdir(folderPath)).filter((file) => pattern.test(file));
};

const getAllArticles = async () => {
  return await getFilesIn(path.join(config.contentDirectory, "articles"));
};

const getAllTags = async () => {
  return await getFilesIn(path.join(config.contentDirectory, "tags"));
};

export { getFilesIn, getAllArticles, getAllTags };
