const Invitation = require("../models/Invitation");
const Event = require("../models/Event");
const User = require("../models/User");

const sendInvitation = async (data) => {
  const { eventId, senderEmail, receiverEmail } = data;

  const sender = await User.findOne({ email: senderEmail });
  if (!sender) throw { status: 400, message: "Expéditeur introuvable" };

  const receiver = await User.findOne({ email: receiverEmail });
  if (!receiver)
    throw { status: 404, message: "Aucun utilisateur trouvé avec cet email" };

  if (sender._id.equals(receiver._id))
    throw { status: 400, message: "Vous ne pouvez pas vous inviter vous-même" };

  const existing = await Invitation.findOne({
    event: eventId,
    receiver: receiver._id,
    status: "pending",
  });
  if (existing)
    throw { status: 400, message: "Une invitation est déjà en attente pour cet utilisateur" };

  const event = await Event.findById(eventId);
  const alreadyMember = event.members.some(
    (m) => m.user.toString() === receiver._id.toString(),
  );
  if (alreadyMember)
    throw { status: 400, message: "Cet utilisateur est déjà membre de l'événement" };

  const invitation = await Invitation.create({
    event: eventId,
    sender: sender._id,
    receiver: receiver._id,
  });
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
