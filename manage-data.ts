import { Command } from "commander";
import downloadData from "./lib/download";
import migrateData from "./lib/migrate";

const program = new Command();

async function init() {
  program.parse(process.argv);
  if (program.args[0] === "download") {
    await downloadData();
    return;
  }
  if (program.args[0] === "migrate") {
    await migrateData();
    return;
  }
  console.error("No process chosen (download, migrate)");
}

init();
