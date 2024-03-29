const { printSummary } = require("../printSummary");

describe("printSummary", () => {
  test("Printing donors and campaigns summary", () => {
    const donors = new Map([
      ["Donor 1", { total: 100, quantity: 2, name: "Donor 1" }],
      ["Donor 2", { total: 200, quantity: 1, name: "Donor 2" }],
    ]);

    const campaigns = new Map([
      ["Campaign 1", { total: 100, name: "Campaign 1" }],
      ["Campaign 2", { total: 200, name: "Campaign 2" }],
    ]);

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    printSummary(donors, campaigns);

    expect(consoleLogSpy).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "Donors:");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      "Donor 1: Total: $100 Average: $50"
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      3,
      "Donor 2: Total: $200 Average: $200"
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(4, "\nCampaigns:");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(5, "Campaign 1: Total: $100");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(6, "Campaign 2: Total: $200");

    consoleLogSpy.mockRestore();
  });

  test("Printing summary with no donors", () => {
    const donors = new Map();
    const campaigns = new Map([
      ["Campaign 1", { total: 0, name: "Campaign 1" }],
    ]);

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    printSummary(donors, campaigns);

    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "No donors");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "\nCampaigns:");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "Campaign 1: Total: $0");

    consoleLogSpy.mockRestore();
  });

  test("Printing summary with no campaigns", () => {
    const donors = new Map([
      ["Donor 1", { total: 0, quantity: 0, name: "Donor 1" }],
    ]);
    const campaigns = new Map();

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    printSummary(donors, campaigns);

    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "Donors:");
    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      2,
      "Donor 1: Total: $0 Average: No donations made"
    );
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "\nNo campaigns");

    consoleLogSpy.mockRestore();
  });
});
