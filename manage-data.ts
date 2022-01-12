// @ts-ignore
const { Command } = require("commander");
const downloadData = require("./lib/download");

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
