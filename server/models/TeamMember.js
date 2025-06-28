// models/TeamMember.js
import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accepted: { type: Boolean, default: false },
  lastActive: Date,
}, { timestamps: true });

export default mongoose.model('TeamMember', teamMemberSchema);
// This schema defines a TeamMember model for managing team members in a social media management application.
// It includes fields for email, role, who invited them, whether they accepted the invitation, and their last active date.
