import { readFileSync } from 'fs';
import remark from 'remark';
import html from 'remark-html';

const getFixturesPath = (isCustomTransformer) =>
  `${__dirname}/../${isCustomTransformer ? '' : 'transformers/'}__fixtures__`;

const readMarkdownFile = (fileName, isCustomTransformer) =>
  readFileSync(
    `${getFixturesPath(isCustomTransformer)}/${fileName}.md`,
    'utf8'
  );

export const getMarkdownASTForFile = (fileName, isCustomTransformer = false) =>
  remark.parse(readMarkdownFile(fileName, isCustomTransformer));

export const mdastToHtml = (ast) => remark().use(html).stringify(ast);
