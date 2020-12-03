import path from "path";
import fs from "fs";

const rootDirectory = path.join(process.cwd());

// eslint-disable-next-line import/prefer-default-export
export async function getMarkdownData(id) {
  const fullPath = path.join(rootDirectory, `${id}.md`);
  const markdown = fs.readFileSync(fullPath, "utf8");
  return {
    id,
    markdown,
  };
}
