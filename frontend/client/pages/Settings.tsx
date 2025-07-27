import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Bell, Shield, User, Globe, LogOut, Trash2, Download } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    sessionReminders: true,
    skillPointUpdates: false,
    weeklyDigest: true
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showSkillPoints: true,
    showCollege: true,
    allowMessages: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-skill-mint">
      {/* Navigation */}
      <nav className="bg-skill-turquoise px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-skill-dark hover:bg-skill-teal/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link to="/" className="text-2xl font-bold text-skill-dark">
              SkilLink
            </Link>
          </div>
          <div className="text-skill-dark font-medium">
            Settings
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-skill-dark mb-2">Settings</h1>
          <p className="text-skill-dark/70">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="bg-white border border-skill-mint">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-skill-dark">Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">New Matches</Label>
                    <p className="text-sm text-skill-dark/60">Get notified when you have new skill matches</p>
                  </div>
                  <Switch 
                    checked={notifications.newMatches}
                    onCheckedChange={(value) => handleNotificationChange('newMatches', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Messages</Label>
                    <p className="text-sm text-skill-dark/60">Get notified about new messages</p>
                  </div>
                  <Switch 
                    checked={notifications.messages}
                    onCheckedChange={(value) => handleNotificationChange('messages', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Session Reminders</Label>
                    <p className="text-sm text-skill-dark/60">Reminders for upcoming skill exchange sessions</p>
                  </div>
                  <Switch 
                    checked={notifications.sessionReminders}
                    onCheckedChange={(value) => handleNotificationChange('sessionReminders', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Skill Point Updates</Label>
                    <p className="text-sm text-skill-dark/60">Get notified when you earn skill points</p>
                  </div>
                  <Switch 
                    checked={notifications.skillPointUpdates}
                    onCheckedChange={(value) => handleNotificationChange('skillPointUpdates', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Weekly Digest</Label>
                    <p className="text-sm text-skill-dark/60">Weekly summary of your activity and matches</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(value) => handleNotificationChange('weeklyDigest', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-skill-dark">Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your information and how you appear to others
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-skill-dark font-medium mb-2 block">Profile Visibility</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Everyone can see my profile</SelectItem>
                      <SelectItem value="students">Students only - Only other students can see my profile</SelectItem>
                      <SelectItem value="college">College only - Only students from my college can see my profile</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-skill-dark/60 mt-1">
                    Controls who can discover and view your profile
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Show Skill Points</Label>
                    <p className="text-sm text-skill-dark/60">Display your skill points on your profile</p>
                  </div>
                  <Switch 
                    checked={privacy.showSkillPoints}
                    onCheckedChange={(value) => handlePrivacyChange('showSkillPoints', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Show College</Label>
                    <p className="text-sm text-skill-dark/60">Display your college information</p>
                  </div>
                  <Switch 
                    checked={privacy.showCollege}
                    onCheckedChange={(value) => handlePrivacyChange('showCollege', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-skill-dark font-medium">Allow Messages</Label>
                    <p className="text-sm text-skill-dark/60">Let other students send you messages</p>
                  </div>
                  <Switch 
                    checked={privacy.allowMessages}
                    onCheckedChange={(value) => handlePrivacyChange('allowMessages', value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <div className="space-y-6">
              {/* Profile Management */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-skill-dark">Profile Management</CardTitle>
                  <CardDescription>
                    Manage your profile information and data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => navigate('/edit-profile')}
                    className="w-full bg-skill-teal hover:bg-skill-dark text-white"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-skill-purple text-skill-purple hover:bg-skill-purple hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                </CardContent>
              </Card>

              {/* Language & Region */}
              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-skill-dark">Language & Region</CardTitle>
                  <CardDescription>
                    Customize your language and regional preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-skill-dark font-medium mb-2 block">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-skill-dark font-medium mb-2 block">Time Zone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-white border-0 shadow-sm border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-skill-dark hover:bg-gray-50"
                    onClick={() => {
                      // TODO: Implement logout logic
                      navigate('/');
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-skill-purple px-6 py-12 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white mb-6">
            © 2025 SkilLink. Built at CodeReCET.
          </p>
          <div className="flex justify-center gap-8">
            <Link to="/about" className="text-white hover:text-skill-mint transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-skill-mint transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
