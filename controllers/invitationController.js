const {
  sendInvitation,
  getMyInvitations,
  acceptInvitation,
  refuseInvitation,
} = require("../services/invitationService");

const send = async (req, res, next) => {
  try {
    const invitation = await sendInvitation(req.body);
    return res.status(201).json(invitation);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const invitations = await getMyInvitations(req.params.userId);
    return res.json(invitations);
  } catch (error) {
    next(error);
  }
};

const accept = async (req, res, next) => {
  try {
    const invitation = await acceptInvitation(req.params.id);
    return res.json(invitation);
  } catch (error) {
    next(error);
  }
};

const refuse = async (req, res, next) => {
  try {
    const invitation = await refuseInvitation(req.params.id);
    return res.json(invitation);
  } catch (error) {
    next(error);
  }
};

module.exports = { send, getAll, accept, refuse };
