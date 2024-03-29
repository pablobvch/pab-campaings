const fs = require('fs');

const errorLogStream = fs.createWriteStream('errors.log', { flags: 'a' });

// function to log errors by processing commands
const logError = (message) => {
 const timestamp = new Date().toISOString();
 const logMessage = `${timestamp} - ${message}\n`;

 errorLogStream.write(logMessage, (err) => {
    if (err) {
      console.error('Error writing to errors.log:', err);
    }
 });
};

module.exports = logError;