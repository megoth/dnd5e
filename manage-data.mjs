import { Command } from "commander/esm.mjs";
import downloadData from "./lib/download/index.mjs";

const program = new Command();

async function init() {
  program.parse(process.argv);
  if (program.args[0] === "download") {
    await downloadData(program.args[1]);
    return;
  }
  console.error("No process chosen (import)");
}

init();
