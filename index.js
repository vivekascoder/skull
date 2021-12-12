// import remark from 'remark';
import path from 'path';
import {promises as fs} from 'fs';
// import {remark} from 'remark';
import ejs from 'ejs';

// Remark Plugins
// import html from 'remark-html';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkPrism from 'remark-prism';
// import remarkHighlight from 'rehype-highlight'

import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism'
import frontMatter from 'markdown-it-front-matter';


// https://nextjs-prism.vercel.app/prism
const md =  MarkdownIt().use(frontMatter, (d) => {console.log(d)}).use(prism, {});
const rootDir = process.cwd();
const buildDir = path.join(rootDir, 'build');
const articleDir = path.join(rootDir, 'content', 'articles');
const articles = (await fs.readdir(articleDir)).filter((file) => file.endsWith('.md'));

// Loop over all the articles and convert them to HTML
articles.map(async (file) => {
    const filePath = path.join(articleDir, file);
    const content = await fs.readFile(filePath, 'utf8');
    // const htmlContent = await remark()
    //     .use(html)
    //     .use(remarkPrism,{
    //         plugins: [
    //             'autolinker',
    //             'command-line',
    //             'data-uri-highlight',
    //             'diff-highlight',
    //             'inline-color',
    //             'keep-markup',
    //             'line-numbers',
    //             'show-invisibles',
    //             'treeview',
    //         ]})
    //     .use(remarkFrontmatter, {type: 'yaml', marker: '-'})
    //     .use(() => (tree) => {
    //         console.dir(tree);
    //     })
    //     .process(content);
    
    const htmlContent = md.render(content);
    const htmlFileName = path.join(buildDir, file.replace('.md', '.html'));
    console.log(htmlContent);
    ejs.renderFile(
        path.join(rootDir, 'app/base.ejs'), 
        {content: htmlContent.toString()}, 
        {}, 
        async (err, str) => {
            await fs.writeFile(htmlFileName, str);
        }
    );
});
