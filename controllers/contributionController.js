const {
  createContribution,
  getContributionsByEvent,
} = require("../services/contributionService");

const create = async (req, res, next) => {
  try {
    const contribution = await createContribution(req.body);
    return res.status(201).json(contribution);
  } catch (error) {
    next(error);
  }
};

const getByEvent = async (req, res, next) => {
  try {
    const contributions = await getContributionsByEvent(req.params.eventId);
    return res.json(contributions);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getByEvent };
