const printCampaigns = (campaigns) => {
  if (campaigns.size === 0) {
    console.log("\nNo campaigns");
    return;
  }
  console.log("\nCampaigns:");
  Array.from(campaigns.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((campaign) =>
      console.log(`${campaign.name}: Total: $${campaign.total}`)
    );
};

const printDonors = (donors) => {
  if (donors.size === 0) {
    console.log("No donors");
    return;
  }
  console.log("Donors:");
  Array.from(donors.values()).forEach((donor) => {
    if (donor.quantity === 0) {
      console.log(
        `${donor.name}: Total: $${donor.total} Average: No donations made`
      );
    } else {
      console.log(
        `${donor.name}: Total: $${donor.total} Average: $${
          donor.total / donor.quantity
        }`
      );
    }
  });
};

// Print the final report
const printSummary = (donors, campaigns) => {
  printDonors(donors);
  printCampaigns(campaigns);
};

module.exports = {
  printSummary,
};
