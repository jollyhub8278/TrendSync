// controllers/teamController.js
import TeamMember from '../models/TeamMember.js';

export const inviteMember = async (req, res) => {
  const { email, role } = req.body;
  try {
    const newInvite = await TeamMember.create({
      email,
      role,
      invitedBy: req.user._id
    });
    res.status(201).json(newInvite);
  } catch (error) {
    res.status(500).json({ error: "Invitation failed." });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({ invitedBy: req.user._id });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members." });
  }
};

export const getPendingInvites = async (req, res) => {
  try {
    const pending = await TeamMember.find({ status: 'pending' });
    res.json(pending);
  } catch (err) {
    console.error('Error fetching invites:', err);
    res.status(500).json({ error: 'Failed to fetch pending invitations' });
  }
};