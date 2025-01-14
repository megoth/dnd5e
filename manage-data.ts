import { Command } from "commander";
import downloadData from "./src/utils/download";
import transformData from "./src/transformers";

const program = new Command();

async function init() {
  program.parse(process.argv);
  if (program.args[0] === "download") {
    await downloadData();
    return;
  }
  if (program.args[0] === "transform") {
    await transformData();
    return;
  }
  console.error("No process chosen (download)");
}

init();
