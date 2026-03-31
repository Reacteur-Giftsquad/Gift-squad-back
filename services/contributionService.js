const Contribution = require("../models/Contribution");

const createContribution = async (data) => {
  const contribution = await Contribution.create(data);
  return contribution;
};

const getContributionsByEvent = async (eventId) => {
  const contributions = await Contribution.find({ event: eventId }).populate(
    "user",
  );
  return contributions;
};

module.exports = { createContribution, getContributionsByEvent };
