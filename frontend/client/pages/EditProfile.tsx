import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Save, X, Plus, CheckCircle, Zap, User, Brain, Target, Settings2 } from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Pre-filled with current user data
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@mit.edu",
    college: "MIT",
    year: "3rd Year",
    department: "Computer Science",
    bio: "Passionate about coding and learning new technologies. Love sharing knowledge and helping others grow their skills!",
    location: "Cambridge, MA",
    availability: "Evenings"
  });

  const [skillsToTeach, setSkillsToTeach] = useState(["React", "Python", "Guitar"]);
  const [skillsToLearn, setSkillsToLearn] = useState(["UI/UX Design", "Photography", "Spanish"]);
  const [newSkillToTeach, setNewSkillToTeach] = useState("");
  const [newSkillToLearn, setNewSkillToLearn] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkillToTeach = () => {
    if (newSkillToTeach.trim() && !skillsToTeach.includes(newSkillToTeach.trim())) {
      setSkillsToTeach([...skillsToTeach, newSkillToTeach.trim()]);
      setNewSkillToTeach("");
    }
  };

  const removeSkillToTeach = (skill: string) => {
    setSkillsToTeach(skillsToTeach.filter(s => s !== skill));
  };

  const addSkillToLearn = () => {
    if (newSkillToLearn.trim() && !skillsToLearn.includes(newSkillToLearn.trim())) {
      setSkillsToLearn([...skillsToLearn, newSkillToLearn.trim()]);
      setNewSkillToLearn("");
    }
  };

  const removeSkillToLearn = (skill: string) => {
    setSkillsToLearn(skillsToLearn.filter(s => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual profile update logic
      console.log('Updated profile:', { ...formData, skillsToTeach, skillsToLearn });
      
      // Show success state
      setShowSuccess(true);
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <Card className="bg-cyber-card border border-cyber-neon/50 shadow-2xl shadow-cyber-glow-neon max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-cyber-neon mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-cyber-blue mb-2">
              Profile Updated!
            </h2>
            <p className="text-cyber-muted mb-4">
              Your profile has been successfully updated. Redirecting to dashboard...
            </p>
            <div className="w-full bg-cyber-border rounded-full h-2">
              <div className="bg-gradient-to-r from-cyber-neon to-cyber-blue h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="bg-cyber-darker border-b border-cyber-border px-6 py-4 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-cyber-text hover:bg-cyber-navy hover:text-cyber-blue"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link to="/" className="text-2xl font-bold text-cyber-blue flex items-center gap-2">
              <Zap className="w-8 h-8 text-cyber-neon" />
              SkilLink
              <div className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse"></div>
            </Link>
          </div>
          <div className="text-cyber-text font-medium flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-cyber-blue" />
            Edit Profile
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-neon mb-2">
            Edit Your Profile
          </h1>
          <p className="text-cyber-muted">
            Update your information to help others find the perfect skill exchange match
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card className="bg-cyber-card border border-cyber-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-cyber-text flex items-center gap-2">
                <User className="w-5 h-5 text-cyber-blue" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-cyber-muted">
                Basic information about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-cyber-text font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-cyber-text font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyber-text font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-cyber-text font-medium">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell others about yourself, your interests, and what makes you excited about skill sharing..."
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text min-h-[100px]"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-cyber-muted">
                  A good bio helps others understand your personality and teaching style
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="bg-cyber-card border border-cyber-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-cyber-text flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyber-purple" />
                Academic Information
              </CardTitle>
              <CardDescription className="text-cyber-muted">
                Your educational background and current studies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="college" className="text-cyber-text font-medium">
                  College/University *
                </Label>
                <Input
                  id="college"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-cyber-text font-medium">
                    Year of Study *
                  </Label>
                  <Select 
                    value={formData.year}
                    onValueChange={(value) => handleInputChange('year', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue text-cyber-text">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-card border-cyber-border">
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-cyber-text font-medium">
                    Department *
                  </Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-cyber-text font-medium">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-cyber-text font-medium">
                    Availability
                  </Label>
                  <Select 
                    value={formData.availability}
                    onValueChange={(value) => handleInputChange('availability', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue text-cyber-text">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-card border-cyber-border">
                      <SelectItem value="Weekdays">Weekdays</SelectItem>
                      <SelectItem value="Weekends">Weekends</SelectItem>
                      <SelectItem value="Evenings">Evenings</SelectItem>
                      <SelectItem value="Mornings">Mornings</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Information */}
          <Card className="bg-cyber-card border border-cyber-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-cyber-text flex items-center gap-2">
                <Target className="w-5 h-5 text-cyber-neon" />
                Skills Exchange
              </CardTitle>
              <CardDescription className="text-cyber-muted">
                What you can teach and what you want to learn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skills to Teach */}
              <div className="space-y-4">
                <Label className="text-cyber-text font-medium">I can teach *</Label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsToTeach.map((skill) => (
                    <Badge 
                      key={skill} 
                      className="bg-gradient-to-r from-cyber-purple/20 to-cyber-pink/20 text-cyber-purple border border-cyber-purple/30 hover:shadow-lg hover:shadow-cyber-glow-purple transition-all pr-1"
                    >
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkillToTeach(skill)}
                        className="h-auto p-1 ml-1 hover:bg-transparent text-cyber-neon/70 hover:text-cyber-neon"
                        disabled={isSubmitting}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you can teach..."
                    value={newSkillToTeach}
                    onChange={(e) => setNewSkillToTeach(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillToTeach())}
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-neon focus:border-cyber-neon text-cyber-text"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="button" 
                    onClick={addSkillToTeach}
                    variant="outline"
                    className="border-cyber-neon text-cyber-neon hover:bg-cyber-neon hover:text-cyber-dark hover:shadow-lg hover:shadow-cyber-glow-neon transition-all"
                    disabled={isSubmitting || !newSkillToTeach.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Skills to Learn */}
              <div className="space-y-4">
                <Label className="text-cyber-text font-medium">I want to learn *</Label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsToLearn.map((skill) => (
                    <Badge 
                      key={skill} 
                      className="bg-gradient-to-r from-cyber-purple/20 to-cyber-pink/20 text-cyber-purple border border-cyber-purple/30 hover:shadow-lg hover:shadow-cyber-glow-purple transition-all pr-1"
                    >
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkillToLearn(skill)}
                        className="h-auto p-1 ml-1 hover:bg-transparent text-cyber-purple/70 hover:text-cyber-purple"
                        disabled={isSubmitting}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you want to learn..."
                    value={newSkillToLearn}
                    onChange={(e) => setNewSkillToLearn(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillToLearn())}
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-purple focus:border-cyber-purple text-cyber-text"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="button" 
                    onClick={addSkillToLearn}
                    variant="outline"
                    className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white hover:shadow-lg hover:shadow-cyber-glow-purple transition-all"
                    disabled={isSubmitting || !newSkillToLearn.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Validation Messages */}
              {skillsToTeach.length === 0 && (
                <p className="text-red-400 text-sm">Please add at least one skill you can teach.</p>
              )}
              {skillsToLearn.length === 0 && (
                <p className="text-red-400 text-sm">Please add at least one skill you want to learn.</p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button 
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="flex-1 border-cyber-border text-cyber-muted hover:bg-cyber-navy hover:text-cyber-text"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyber-blue to-cyber-neon text-cyber-dark hover:shadow-xl hover:shadow-cyber-glow-blue transition-all"
              disabled={isSubmitting || skillsToTeach.length === 0 || skillsToLearn.length === 0}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyber-darker to-cyber-dark border-t border-cyber-border px-6 py-12 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-cyber-muted mb-6">
            © 2025 SkilLink. Built at CodeReCET.
          </p>
          <div className="flex justify-center gap-8">
            <Link to="/about" className="text-cyber-muted hover:text-cyber-blue transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-cyber-muted hover:text-cyber-neon transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
