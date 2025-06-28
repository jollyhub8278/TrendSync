import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Shield, Trash } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUserData(storedUser);
  }, []);

  const renderTab = (label, icon, key) => (
    <button
      key={key}
      onClick={() => setActiveTab(key)}
      className={`flex items-center px-4 py-2 w-full text-left rounded-lg transition-colors ${
        activeTab === key
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  const renderProfileSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={userData.name}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          value={userData.email}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter new password"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Confirm new password"
        />
      </div>
      <Button variant="primary">Update Password</Button>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      <label className="flex items-center space-x-3">
        <input type="checkbox" className="form-checkbox" />
        <span>Receive email notifications</span>
      </label>
      <label className="flex items-center space-x-3">
        <input type="checkbox" className="form-checkbox" />
        <span>Receive push notifications</span>
      </label>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-700">
        Manage your data and privacy preferences here.
      </p>
      <Button variant="outline">Download My Data</Button>
    </div>
  );

  const renderAccountDeletion = () => (
    <div className="space-y-4">
      <p className="text-sm text-red-600">
        Deleting your account is permanent and cannot be undone.
      </p>
      <Button variant="destructive">Delete My Account</Button>
    </div>
  );

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotifications();
      case 'privacy':
        return renderPrivacySettings();
      case 'delete':
        return renderAccountDeletion();
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/4 space-y-2">
        {renderTab('Profile', <User size={18} />, 'profile')}
        {renderTab('Security', <Lock size={18} />, 'security')}
        {renderTab('Notifications', <Bell size={18} />, 'notifications')}
        {renderTab('Privacy', <Shield size={18} />, 'privacy')}
        {renderTab('Delete Account', <Trash size={18} />, 'delete')}
      </div>

      <div className="flex-1">
        <Card title="Account Settings">
          {renderCurrentTab()}
        </Card>
      </div>
    </div>
  );
};

export default Settings;
