import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Camera,
  X,
  Save,
  Trash2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import StudentSide from '../components/StudentSide';

const StudentSettings = () => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: 'Christophe',
    lastName: 'Muneza',
    email: 'christophermuneza1@gmail.com',
    phone: '+250 788 673 682',
    avatar: '/images/christopher.jpg',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: false,
      updates: true,
      marketing: false
    },
    preferences: {
      language: 'English',
      timezone: 'UTC-5',
      darkMode: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabContent = {
    personal: (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b">
          <div className="relative">
            <img
              src={formData.avatar}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-white"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-medium">Profile Picture</h3>
            <p className="text-sm text-gray-500">
              Upload a new profile picture. JPG, GIF or PNG. Max 1MB.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full"
            />
          </div>
        </div>
      </div>
    ),
    security: (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Password</label>
          <Input
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleInputChange}
            placeholder="Enter current password"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <Input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <Input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm new password"
            className="w-full"
          />
        </div>
      </div>
    ),
    notifications: (
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(formData.notifications).map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-4">
            <div className="space-y-0.5">
              <div className="text-sm font-medium capitalize">{key} Notifications</div>
              <div className="text-sm text-gray-500">
                Receive {key} notifications about your activity
              </div>
            </div>
            <Switch
              checked={value}
              onCheckedChange={() => handleNotificationToggle(key)}
            />
          </div>
        ))}
      </div>
    ),
    preferences: (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <select
            className="w-full p-2 border rounded-md bg-white"
            value={formData.preferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Timezone</label>
          <select
            className="w-full p-2 border rounded-md bg-white"
            value={formData.preferences.timezone}
            onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
          >
            <option>UTC-5</option>
            <option>UTC+0</option>
            <option>UTC+1</option>
            <option>UTC+2</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-4">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">Dark Mode</div>
            <div className="text-sm text-gray-500">
              Enable dark mode for better viewing at night
            </div>
          </div>
          <Switch
            checked={formData.preferences.darkMode}
            onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
          />
        </div>
      </div>
    )
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="lg:w-64 shrink-0">
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${showMobileSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
           onClick={() => setShowMobileSidebar(false)}>
        <div className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
             onClick={e => e.stopPropagation()}>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Menu</h2>
            <button onClick={() => setShowMobileSidebar(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <StudentSide />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r bg-white">
        <StudentSide />
      </div>
      </div>
      
      <div className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Account Settings</h1>
        </div>

        {saveSuccess && (
          <Alert className="bg-green-50 border-green-200 mb-4">
            <AlertDescription>Settings saved successfully!</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Settings Navigation */}
          <Card className="w-full lg:w-48 shrink-0">
            <CardContent className="p-2 sm:p-4">
              <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
                <Button
                  variant={activeTab === 'personal' ? 'default' : 'ghost'}
                  className="flex-1 lg:flex-none lg:w-full justify-start"
                  onClick={() => setActiveTab('personal')}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Personal</span>
                </Button>
                <Button
                  variant={activeTab === 'security' ? 'default' : 'ghost'}
                  className="flex-1 lg:flex-none lg:w-full justify-start"
                  onClick={() => setActiveTab('security')}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </Button>
                <Button
                  variant={activeTab === 'notifications' ? 'default' : 'ghost'}
                  className="flex-1 lg:flex-none lg:w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Notifications</span>
                </Button>
                <Button
                  variant={activeTab === 'preferences' ? 'default' : 'ghost'}
                  className="flex-1 lg:flex-none lg:w-full justify-start"
                  onClick={() => setActiveTab('preferences')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Preferences</span>
                </Button>
              </nav>
            </CardContent>
          </Card>

          {/* Settings Content */}
          <Card className="flex-1">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                {activeTab === 'personal' && <User className="w-5 h-5" />}
                {activeTab === 'security' && <Shield className="w-5 h-5" />}
                {activeTab === 'notifications' && <Bell className="w-5 h-5" />}
                {activeTab === 'preferences' && <Globe className="w-5 h-5" />}
                <span className="capitalize">{activeTab} Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit}>
                {tabContent[activeTab]}
                
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6 pt-6 border-t">
                  <Button type="button" variant="outline" className="w-full sm:w-auto gap-2">
                    <Trash2 className="w-4 h-4" />
                    Reset
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;