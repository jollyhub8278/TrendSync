// routes/teamRoutes.js
import express from 'express';
import { inviteMember, getTeamMembers , getPendingInvites} from '../controllers/teamController.js';
import  authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/invite', authMiddleware, inviteMember);
router.get('/', authMiddleware, getTeamMembers);
router.get('/pending-invites', authMiddleware, getPendingInvites);

export default router;
// This code defines the routes for team management in a social media management application.
// It includes routes for inviting new team members and fetching the list of team members.