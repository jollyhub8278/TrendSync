import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  UserPlus,
  Mail,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Shield,
  Eye,
  Edit,
} from "lucide-react";
import { mockTeamMembers } from "../utils/mockData";
import axios from "axios";
import { useEffect } from "react";

const Team = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState("editor");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://trendsync-1d7b.onrender.com/api/team/invite",
        { email: emailInput, role: roleInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Invitation sent!");
      setEmailInput("");
      setShowInviteForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to send invite.");
    }
  };

  const formatLastActive = (date) => {
    if (!date) return "Never";

    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return minutes === 0 ? "Just now" : `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Shield size={12} className="mr-1" /> Admin
          </span>
        );
      case "editor":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Edit size={12} className="mr-1" /> Editor
          </span>
        );
      case "viewer":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Eye size={12} className="mr-1" /> Viewer
          </span>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://trendsync-1d7b.onrender.com/api/team", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, []);

  const pendingInvites = teamMembers.filter(
    (member) => member.status === "pending"
  );

  const renderTeamMember = (member) => {
    return (
      <div
        key={member.id}
        className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
      >
        <div className="flex items-center">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
            <p className="text-xs text-gray-500">{member.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {getRoleBadge(member.role)}

          <div className="flex items-center text-xs text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>{formatLastActive(member.lastActive)}</span>
          </div>

          <div className="relative">
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-500">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Manage your team and permissions
        </p>
        <Button
          variant="primary"
          icon={<UserPlus size={16} />}
          onClick={() => setShowInviteForm(true)}
        >
          Invite Team Member
        </Button>
      </div>

      {showInviteForm && (
        <Card title="Invite a Team Member">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="flex">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    className="bg-white text-sm rounded-lg pl-10 pr-4 py-2.5 w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="colleague@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                className="bg-white text-sm rounded-lg py-2.5 px-4 w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
              >
                <option value="admin">Admin (Full access)</option>
                <option value="editor">Editor (Create/Edit content)</option>
                <option value="viewer">Viewer (View only)</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                {roleInput === "admin" &&
                  "Can manage team members, settings, and all content."}
                {roleInput === "editor" &&
                  "Can create and edit content but cannot change settings."}
                {roleInput === "viewer" &&
                  "Can only view content and analytics without making changes."}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowInviteForm(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={<Mail size={16} />}
              onClick={handleInvite}
              disabled={!emailInput}
            >
              Send Invitation
            </Button>
          </div>
        </Card>
      )}

      <Card title="Team Members">
        <div className="divide-y divide-gray-100">
          {teamMembers.map(renderTeamMember)}
        </div>
      </Card>

      <Card title="Pending Invitations">
        <div className="py-2">
          {pendingInvites.length === 0 ? (
            <p className="text-sm text-gray-500">No pending invitations.</p>
          ) : (
            pendingInvites.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between py-3 border-b border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {member.email}
                    </h3>
                    <p className="text-xs text-gray-500">Invited recently</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {member.role}
                  </span>
                  <div className="flex items-center text-xs text-yellow-500">
                    <Clock size={14} className="mr-1" />
                    <span>Pending</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Resend
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card title="Role Permissions">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permission
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Editor
                </th>
                <th className="py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Viewer
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-4 text-sm text-gray-700">
                  View content and analytics
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-gray-700">
                  Create and edit posts
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">—</td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-gray-700">Schedule content</td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">—</td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-gray-700">
                  Manage team members
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">—</td>
                <td className="py-4 text-center">—</td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-gray-700">
                  Change account settings
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">—</td>
                <td className="py-4 text-center">—</td>
              </tr>
              <tr>
                <td className="py-4 text-sm text-gray-700">
                  Connect social accounts
                </td>
                <td className="py-4 text-center">
                  <CheckCircle size={16} className="inline text-green-500" />
                </td>
                <td className="py-4 text-center">—</td>
                <td className="py-4 text-center">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Team;
