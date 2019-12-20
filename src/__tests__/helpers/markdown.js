import { readFileSync } from 'fs';
import remark from 'remark';

const readMarkdownFile = fileName =>
  readFileSync(
    `${__dirname}/../transformers/__fixtures__/${fileName}.md`,
    'utf8'
  );

export const getMarkdownASTForFile = filename =>
  remark.parse(readMarkdownFile(filename));

export const parseASTToMarkdown = remark.stringify;
