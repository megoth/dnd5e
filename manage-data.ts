import { Command } from "commander";
import downloadData from "./lib/download";
import migrateData from "./lib/migrate";
import testTypes from "./lib/download/test-types";

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
  if (program.args[0] === "test-types") {
    await testTypes();
    return;
  }
  console.error("No process chosen (download, migrate)");
}

init();
