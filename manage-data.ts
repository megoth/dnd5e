import { Command } from "commander";
import downloadData from "./lib/download";

const program = new Command();

async function init() {
  program.parse(process.argv);
  if (program.args[0] === "download") {
    await downloadData();
    return;
  }
  console.error("No process chosen (download)");
}

init();
