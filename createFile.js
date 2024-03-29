// script that generates an `input.txt` file with a large number of donation and campaign management commands
const fs = require('fs');
const path = require('path');

const numDonors = 10000;
const numCampaigns = 100;
const maxDonationAmount = 1000;
const minDonationAmount = 10;
const outputFilePath = path.join(__dirname, 'input.txt');

let commands = [];
for (let i = 1; i <= numDonors; i++) {
 commands.push(`Add Donor Donor${i} $${Math.floor(Math.random() * (maxDonationAmount - minDonationAmount + 1)) + minDonationAmount}`);
}
for (let i = 1; i <= numCampaigns; i++) {
 commands.push(`Add Campaign Campaign${i}`);
}

for (let i = 1; i <= numDonors; i++) {
 for (let j = 1; j <= numCampaigns; j++) {
    const donationAmount = Math.floor(Math.random() * (maxDonationAmount - minDonationAmount + 1)) + minDonationAmount;
    commands.push(`Donate Donor${i} Campaign${j} $${donationAmount}`);
 }
}

fs.writeFileSync(outputFilePath, commands.join('\n') + '\n');

console.log(`File created: ${outputFilePath}`);
