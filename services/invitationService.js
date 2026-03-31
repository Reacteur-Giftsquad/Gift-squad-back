const Invitation = require("../models/Invitation");
const Event = require("../models/Event");

const sendInvitation = async (data) => {
  const invitation = await Invitation.create(data);
  return invitation;
};

const getMyInvitations = async (userId) => {
  const invitations = await Invitation.find({ receiver: userId })
    .populate("event")
    .populate("sender");
  return invitations;
};

const acceptInvitation = async (id) => {
  const invitation = await Invitation.findByIdAndUpdate(
    id,
    { status: "accepted" },
    { new: true },
  );
  await Event.findByIdAndUpdate(invitation.event, {
    $push: { members: { user: invitation.receiver } },
  });
  return invitation;
};

const refuseInvitation = async (id) => {
  const invitation = await Invitation.findByIdAndUpdate(
    id,
    { status: "refused" },
    { new: true },
  );
  return invitation;
};

module.exports = {
  sendInvitation,
  getMyInvitations,
  acceptInvitation,
  refuseInvitation,
};
