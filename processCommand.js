const logError = require("./utils/logError");
const isValidName = require("./utils/isvalidName");

// Process every single donation
const processDonate = (command, args, donors, campaigns) => {
  if (args.length !== 3) {
    logError(
      `Invalid 'Donate' - command: ${command}. Expected: donor name, campaign name, and amount.`
    );
    return;
  }
  const [donorName, campaignName, amount] = args;
  if (!donorName || !campaignName || isNaN(amount.replace(/\$/g, ""))) {
    logError(
      `Invalid format for 'Donate' - command: ${command}. Expected: donor name, campaign name, and amount.`
    );
    return;
  }
  const donor = donors.get(donorName);
  const campaign = campaigns.get(campaignName);
  if (!donor || !campaign) {
    logError(`Donor or campaign not found - command: ${command}.`);
    return;
  }
  if (donor && campaign) {
    const numericAmount = parseInt(amount.replace(/\$/g, ""));
    if (numericAmount < 0) {
      logError(`Donation amount cannot be negative - command: ${command}.`);
      return;
    }
    const newTotal = donor.total + parseInt(numericAmount);
    if (newTotal <= donor.limit) {
      donor.total = newTotal;
      donor.quantity = donor.quantity + 1;
      campaign.total += parseInt(numericAmount);
    } else {
      logError(`Donation amount exceeds donor's limit - command: ${command}.`);
    }
  }
};

// Process adding campaigns to the state
const processAddCampaign = (command, args, campaigns) => {
  if (args.length < 2) {
    logError(
      `Incomplete 'Add Campaign' command: ${command}. Expected at least one name.`
    );
    return;
  }

  const name = args.slice(1).join(" ");

  if (!name || !isValidName(name) || args.length > 2) {
    logError(
      `Invalid format for 'Add Campaign' - command: ${command}. Expected: name.`
    );
    return;
  }

  if (campaigns.has(name)) {
    logError(`Campaign already exists: ${command}.`);
    return;
  }

  campaigns.set(name, { total: 0, name });
};

// Process Add Donors
const processAddDonor = (command, args, donors) => {
  if (args.length < 3) {
    logError(
      `Incomplete 'Add Donor' - command: ${command}. Expected: name and limit.`
    );
    return;
  }

  const [name, limit, ...rest] = args.slice(1);

  if (
    !name ||
    isNaN(limit.replace(/\$/g, "")) ||
    parseInt(limit.replace(/\$/g, "")) <= 0 ||
    !isValidName(name) ||
    (rest && rest.length > 0)
  ) {
    logError(
      `Invalid format for 'Add Donor' - command: ${command}. Expected: name and limit.`
    );
    return;
  }

  if (donors.has(name)) {
    logError(`Donor already exists - command: ${command}.`);
    return;
  }

  const numericLimit = parseInt(limit.replace(/\$/g, ""));

  donors.set(name, {
    total: 0,
    quantity: 0,
    limit: parseInt(numericLimit),
    name,
  });
};

//Process every single line from the file
const processCommand = (command, donors, campaigns) => {
  const [action, ...args] = command.split(" ");

  switch (action) {
    case "Add":
      if (args[0] === "Donor") {
        processAddDonor(command, args, donors);
      } else if (args[0] === "Campaign") {
        processAddCampaign(command, args, campaigns);
      } else {
        logError(
          `Invalid 'Add' command: ${command}. Expected: 'Donor' or 'Campaign'.`
        );
      }
      break;
    case "Donate":
      processDonate(command, args, donors, campaigns);
      break;
    default:
      logError(`Invalid command: ${command}.`);
  }
};

module.exports = {
  processCommand,
};
