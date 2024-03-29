const { processCommand } = require("../processCommand");

describe("processCommand", () => {
  let donors, campaigns;

  beforeEach(() => {
    donors = new Map();
    campaigns = new Map();
  });

  /*HAPPY PATHS TESTS*/

  test("Adding a donor success", () => {
    processCommand("Add Donor John $100", donors, campaigns);
    expect(donors.get("John")).toEqual({
      total: 0,
      quantity: 0,
      limit: 100,
      name: "John",
    });
  });

  test("Adding a campaign success", () => {
    processCommand("Add Campaign SummerFundraiser", donors, campaigns);
    expect(campaigns.get("SummerFundraiser")).toEqual({
      total: 0,
      name: "SummerFundraiser",
    });
  });

  test("Donating to a campaign success", () => {
    donors.set("John", { total: 0, quantity: 0, limit: 100, name: "John" });
    campaigns.set("SummerFundraiser", { total: 0, name: "SummerFundraiser" });

    processCommand("Donate John SummerFundraiser $50", donors, campaigns);
    expect(donors.get("John")).toEqual({
      total: 50,
      quantity: 1,
      limit: 100,
      name: "John",
    });
    expect(campaigns.get("SummerFundraiser")).toEqual({
      total: 50,
      name: "SummerFundraiser",
    });
  });

  /*WRONG CASES*/

  test("Invalid command format", () => {
    processCommand("Add Donor", donors, campaigns);
    expect(donors.size).toBe(0);
  });

  test("Adding a donor without a name", () => {
    processCommand("Add Donor $100", donors, campaigns);
    expect(donors.size).toBe(0);
  });

  test("Donating beyond a donor's limit", () => {
    donors.set("John", { total: 0, quantity: 0, limit: 100, name: "John" });
    campaigns.set("SummerFundraiser", { total: 0, name: "SummerFundraiser" });

    processCommand("Donate John SummerFundraiser $150", donors, campaigns);

    expect(donors.get("John")).toEqual({
      total: 0,
      quantity: 0,
      limit: 100,
      name: "John",
    });

    expect(campaigns.get("SummerFundraiser")).toEqual({
      total: 0,
      name: "SummerFundraiser",
    });
  });

  test("Adding a duplicate donor", () => {
    processCommand("Add Donor John $100", donors, campaigns);
    processCommand("Add Donor John $100", donors, campaigns);
    expect(donors.size).toBe(1);
  });

  test("Adding a duplicate campaign", () => {
    processCommand("Add Campaign SummerFundraiser", donors, campaigns);
    processCommand("Add Campaign SummerFundraiser", donors, campaigns);
    expect(campaigns.size).toBe(1);
  });

  test("Non-existent command", () => {
    processCommand("NonExistentCommand", donors, campaigns);
    expect(donors.size).toBe(0);
    expect(campaigns.size).toBe(0);
  });

  test("Donating a negative amount", () => {
    donors.set("John", { total: 0, quantity: 0, limit: 100, name: "John" });
    campaigns.set("SummerFundraiser", { total: 0, name: "SummerFundraiser" });

    processCommand("Donate John SummerFundraiser -$50", donors, campaigns);
    expect(donors.get("John")).toEqual({
      total: 0,
      quantity: 0,
      limit: 100,
      name: "John",
    });
    expect(campaigns.get("SummerFundraiser")).toEqual({
      total: 0,
      name: "SummerFundraiser",
    });
  });

  test("Adding a donor with special characters in the name", () => {
    processCommand("Add Donor John!Doe $100", donors, campaigns);
    expect(donors.size).toBe(0);
  });

  test("Adding a campaign with special characters in the name", () => {
    processCommand("Add Campaign Summer!Fundraiser", donors, campaigns);
    expect(campaigns.size).toBe(0);
  });

  test("Adding a donor with extra arguments", () => {
    processCommand("Add Donor John $100 extraArgument", donors, campaigns);
    expect(donors.size).toBe(0);
  });

  test("Adding a campaign with extra arguments", () => {
    processCommand(
      "Add Campaign SummerFundraiser extraArgument",
      donors,
      campaigns
    );
    expect(campaigns.size).toBe(0); // Asegura que no se agregó ninguna campaña con argumentos extra
  });

  test("Donating with extra arguments", () => {
    donors.set("John", { total: 0, quantity: 0, limit: 100, name: "John" });
    campaigns.set("SummerFundraiser", { total: 0, name: "SummerFundraiser" });

    processCommand(
      "Donate John SummerFundraiser $50 extraArgument",
      donors,
      campaigns
    );
    expect(donors.get("John")).toEqual({
      total: 0,
      quantity: 0,
      limit: 100,
      name: "John",
    });
    expect(campaigns.get("SummerFundraiser")).toEqual({
      total: 0,
      name: "SummerFundraiser",
    });
  });

  test("Adding a donor with special characters", () => {
    processCommand("Add Donor John $100!", donors, campaigns);
    expect(donors.size).toBe(0);
  });

  test("Adding a donor with extra spaces", () => {
    processCommand(" Add Donor John $100 ", donors, campaigns);
    expect(donors.size).toBe(0);
  });
});
