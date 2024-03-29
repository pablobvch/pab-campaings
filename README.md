# pab-campaings

# Introduction

`pab-campaings` is a console application designed to manage donations and fundraising campaigns. This project allows users to enter donations and associate them with specific campaigns, providing a detailed summary of donations and the total contribution to each campaign. This project was part of a NodeJS Challenge.

## Requirements

- Node.js v18 or higher
- Access to a terminal and a shell (bash, zsh, etc.)

## Challenge Overview

You are designing a command-line implementation of a new recurring donation
feature for <THE COMPANY>. We want donors to be able to specify a monthly recurring
donation limit and make recurring donations of specified amounts to individual
campaigns. To support this our command-line interface will need to accept input
from STDIN or from a file passed as an argument to the command-line tool. For
example:

``` shell
cat input.txt | pab-campaings

pab-campaings input.txt
```

should produce the same output.

The command-line tool will need to accept 3 different commands, one to add a
campaign, one to add a donor, and one to set up a recurring donation for a given
donor to a given campaign. The following commands will set up a recurring monthly
donation of \$100 from a donor named Greg with a limit of \$1000 to a campaign
named SaveTheDogs:

``` text
Add Donor Greg $1000
Add Campaign SaveTheDogs
Donate Greg SaveTheDogs $100
```

Any `Donate` command that would cause the monthly total donation to go over the
limit specified in the `Add Donor` command should be ignored. After the entire
input is consumed by the tool, it should print a summary and exit with a
successful exit code. The summary should consist of each Donor's total donations
for a month, each Donor's average donation size, and each Campaign's total
received donations for a month. There should be separate sections for Donors and
Campaigns, and the Donors and Campaigns should be printed in alphabetical order.
The following input

``` text
Add Donor Greg $1000
Add Donor Janine $100
Add Campaign SaveTheDogs
Add Campaign HelpTheKids
Donate Greg SaveTheDogs $100
Donate Greg HelpTheKids $200
Donate Janine SaveTheDogs $50
```

Should result in exactly the following output:

``` text
Donors:
Greg: Total: $300 Average: $150
Janine: Total: $50 Average: $50

Campaigns:
HelpTheKids: Total: $200
SaveTheDogs: Total: $150
```

## Installation and Execution

### Installing dependencies

Install all the dependencies for this project using the command `npm install`

### Installing `pkg` Globally

Before you can compile your Node.js application into an executable, you need to install `pkg` globally. This allows you to use the `pkg` command from any directory in your terminal. To install `pkg` globally, run the following command:

`npm install -g pkg`

* If you encounter permission errors during installation, you may need to run the command with `sudo`

## Compile the Executable

To compile the project into an executable, navigate to the project directory and run the following command:

`npm run build`

* note that this command will compile the project only for running on macOS

### Compiling for Different Operating Systems

`pkg` supports multiple platforms, allowing you to generate binaries for macOS, Linux, and Windows. To compile your project for all supported operating systems, navigate to the project directory and run the following command:

`npm run build:all`

This command will generate the requested binaries within the directory. Note that the generated files will have platform-specific sufixes (e.g., `pab-campaings-macos`, `pab-campaings-linux`, `pab-campaings-win.exe`).

## Running the Executable

Before executing the file, you might need to rename it to remove the platform-specific sufix. For example, on macOS, you would rename `pab-campaings-macos` to `pab-campaings`. Similarly, for Linux and Windows, you would rename the corresponding files to `pab-campaings` as well.

Once renamed, ensure the file has execution permissions (if on Linux or macOS):

- **macOS**:

`chmod +x pab-campaings`

- **Linux**:

`chmod +x pab-campaings`

- **Windows**:

Double-click to check the `pab-campaings.exe` file or run it from the command line.

Now you can run the program with:

``` shell
cat input.txt | pab-campaings

or

pab-campaings input.txt
```

You can use whatever file name. In this example the text file is called input.txt

## Running Tests

You can run the tests using the `npm test` command. This script is going to test the program using the unit tests from this project. Or you can do your own manual tests modifying the input.txt content and running the script in console.

## Create File Input

`npm run create:file` Runs a custom script called `createFile`. This script could be used to generate the input file with random values and evaluate the performance.

## Solution Process and Rationale

The design and implementation of `pab-campaings` draws from the need to manage donations and fundraising campaigns. This application addresses the challenge of tracking individual donations, associating them with specific campaigns, and generating reports on donation summaries and campaign totals.

### Key Features and Implementation Stages

1. **Input Processing**: `pab-campaings` accepts input commands from a text file, allowing for flexibility in how donations and campaigns are managed.

2. **Data Management**: The application maintains a state that includes lists of donors and campaigns. This state is updated in real-time as commands are processed, ensuring the data is always current.

3. **Command Execution**: Commands for donations and campaign management are executed in real-time. This includes adding donors, creating campaigns, and recording donations. The application ensures that each command is processed correctly and updates the state accordingly.

4. **Reporting**: At the end of the program generates a summary report. This report includes donors and campaigns data: total per donors and avarage by donation, and totals per campaign.

### Considerations for the `isValidName` Function

The `isValidName` function was designed with the goal of strictly validating the names of donors and campaigns, ensuring they adhere to certain format criteria. Key considerations for this function include:

- **UpperCamelCase**: Names must be in UpperCamelCase format, meaning they must start with an uppercase letter and not contain spaces or special characters.
- **Exclusion of whitespaces and special characters**: To ensure names are clear and easy to manage, whitespace and special characters was not allowed.

These decisions were made to ensure that donor and campaign names are consistent and easy to handle, which in turn facilitates the management and processing of data within the application.

### Script to Create the `input.txt` File

To evaluate the performance of the application when processing thousands of records, a script was developed that generates an `input.txt` file with a large number of donation and campaign management commands. This script was created as an integral part of the solution, even though it was not explicitly requested by the challenge.
The purpose of this script is to provide how the application handles large volumes of data.

#### Explanation of the script createFile.js

This script generates a list of commands for a fictional donation system, simulating the addition of donors and campaigns, as well as donations from donors to campaigns. It then writes these commands to a file named input.txt in the same directory as the script. Here's a breakdown of what it does:

1. Initialization: It sets up variables for the number of donors (numDonors), the number of campaigns (numCampaigns), the maximum and minimum donation amounts (maxDonationAmount and minDonationAmount), and the path to the output file (outputFilePath).
2. Generating Donor Commands: It creates a loop that generates numDonors commands to add donors to the system. Each donor is assigned a random donation amount between minDonationAmount and maxDonationAmount.
3. Generating Campaign Commands: It creates another loop that generates numCampaigns commands to add campaigns to the system.
4. Generating Donation Commands: It creates a nested loop that generates donation commands for each donor and each campaign. Each donation command includes a random donation amount between minDonationAmount and maxDonationAmount.
5. Writing to File: It writes all generated commands to input.txt, with each command on a new line.
6. Logging: Finally, it logs the path to the created file.

In summary, this script simulates a scenario where donors are added to a system, campaigns are created, and donations are made from donors to campaigns, with all actions represented as commands in a text file.

### Error Logging Mechanism

The `pab-campaings` application is equipped with an error logging mechanism that captures and records errors encountered during the execution of commands or other operations. This mechanism is designed to provide detailed information about the errors, including the type of error, the command or operation that caused the error, and the time the error occurred.
The error logs are stored in a dedicated log file, which is automatically updated whenever an error is encountered.
