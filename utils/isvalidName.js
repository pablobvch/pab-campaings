// validating the names of donors and campaigns
const isValidName = (name) => {
  if (name.match(/^[A-Z][a-zA-Z0-9]*$/)) return true;

  return false;
};

module.exports = isValidName;
