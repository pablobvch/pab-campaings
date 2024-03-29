// main

const fs = require("fs");
const readline = require("readline");
const { printSummary } = require("./printSummary");
const { processCommand } = require("./processCommand");

const isTestEnvironment = process.env.NODE_ENV === "test";

const donors = new Map();
const campaigns = new Map();

const showLoader = () => {
  if (isTestEnvironment) return;
  console.log("Loading... Please, sit tight");
};

const readLines = async (input) => {
  showLoader();

  const rl = readline.createInterface({
    input,
    output: process.stdout,
    terminal: false,
  });

  try {
    for await (const line of rl) {
      processCommand(line, donors, campaigns);
    }
    rl.close();
  } catch (error) {
    console.log("Error reading lines", error);
  }

  printSummary(donors, campaigns);
};

const readFile = async (filename) => {
  if (!fs.existsSync(filename)) {
    console.error(`The file ${filename} doesn't exist`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(filename);
  await readLines(fileStream);
};

const readStdin = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  let hasData = false;
  for await (const line of rl) {
    if (!hasData){
      showLoader();
    }
    hasData = true;
    processCommand(line, donors, campaigns);
  }

  if (!hasData) {
    console.error(
      "Error: No input file specified. Please provide an input file as an argument."
    );
    process.exit(1);
  }

  printSummary(donors, campaigns);
};

const main = async () => {
  if (process.argv.length < 3) {
    if (!process.stdin.isTTY) {
      await readStdin();
    } else {
      console.error(
        "Error: No input file specified. Please provide an input file as an argument."
      );
      process.exit(1);
    }
  } else {
    const filename = process.argv[2];
    await readFile(filename);
  }
};

module.exports = { main };

if (require.main === module) {
  main().catch(console.error);
}
