const fs = require("fs");
const readline = require("readline");
const { Readable } = require("stream");

const { printSummary } = require("../printSummary.js");
const { processCommand } = require("../processCommand.js");

const { main } = require("../pab-campaings.js");

jest.mock("fs");
jest.mock("readline");
jest.mock("../printSummary", () => ({
  printSummary: jest.fn(),
}));
jest.mock("../processCommand", () => ({
  processCommand: jest.fn(),
}));

process.env.NODE_ENV = "test";

describe("pab-campaings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("reads from a file when a filename is provided", async () => {
    const filename = "input.txt";
    process.argv = ["node", "pab-campaings.js", filename];
    fs.existsSync.mockReturnValue(true);

    const mockReadStream = new Readable({
      read() {
        this.push("linea de entrada estándar\n");
        this.push(null);
      },
    });

    readline.createInterface.mockReturnValue({
      input: mockReadStream,
      output: process.stdout,
      terminal: false,
      [Symbol.asyncIterator]: async function* () {
        for await (const chunk of this.input) {
          yield chunk.toString().trim();
        }
      },
      close: jest.fn(),
    });

    await main();

    expect(fs.existsSync).toHaveBeenCalledWith(filename);
    expect(readline.createInterface).toHaveBeenCalled();
    expect(processCommand).toHaveBeenCalled();
    expect(printSummary).toHaveBeenCalled();
  });

  test("shows an error when no input file is specified", async () => {
    process.argv = ["node", "pab-campaings.js"];

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const processExitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation(() => {});

    process.argv = ["node", "pab-campaings.js"];

    await main();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error: No input file specified. Please provide an input file as an argument."
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("shows an error when input file does not exist", async () => {
    const filename = "nonexistent.txt";
    process.argv = ["node", "pab-campaings.js", filename];
    fs.existsSync.mockReturnValue(false);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const processExitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation(() => {});

    await main();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `The file ${filename} doesn't exist`
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
