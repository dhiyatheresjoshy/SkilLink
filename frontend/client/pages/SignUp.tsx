import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Zap, User, Brain, Target } from 'lucide-react';
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    year: '',
    department: '',
    skillsToTeach: '',
    skillsToLearn: '',
    availability: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("✅ Signup result:", result);

    if (response.ok && result.uid) {
      localStorage.setItem("uid", result.uid);
      navigate("/dashboard"); // ✅ safe to navigate immediately
    } else {
      alert(result.message || 'Signup failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server error. Please try again later.');
  }
};

  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="bg-cyber-darker border-b border-cyber-border px-6 py-4 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-cyber-blue flex items-center gap-2">
            <Zap className="w-8 h-8 text-cyber-neon" />
            SkilLink
            <div className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse"></div>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/how-it-works" className="text-cyber-text hover:text-cyber-blue transition-colors">
              How it Works
            </Link>
            <Link to="/login" className="text-cyber-text hover:text-cyber-blue transition-colors">
              Log in
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-cyber-blue to-cyber-electric text-white hover:shadow-lg hover:shadow-cyber-glow-blue transition-all px-6 py-2 rounded-lg border border-cyber-blue/30 font-medium">
                Sign Up.
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sign Up Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-cyber-card border border-cyber-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-neon mb-2">
              Join SkilLink
            </h1>
            <p className="text-cyber-muted">
              Create your profile and start exchanging skills with fellow students
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-cyber-text flex items-center gap-2">
                <User className="w-5 h-5 text-cyber-blue" />
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-cyber-text font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-cyber-text font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
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
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cyber-text font-medium">
                    Password *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-cyber-text font-medium">
                    Confirm Password *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-cyber-text flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyber-purple" />
                Academic Information
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="college" className="text-cyber-text font-medium">
                  College/University *
                </Label>
                <Input
                  id="college"
                  type="text"
                  placeholder="Enter your college name"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  required
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-cyber-text font-medium">
                    Year of Study *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue text-cyber-text">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent className="bg-cyber-card border-cyber-border">
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="text-cyber-text font-medium">
                    Department *
                  </Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    required
                    className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
                  />
                </div>
              </div>
            </div>

            {/* Skills Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-cyber-text flex items-center gap-2">
                <Target className="w-5 h-5 text-cyber-neon" />
                Skills Exchange
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="skillsToTeach" className="text-cyber-text font-medium">
                  I can teach *
                </Label>
                <Textarea
                  id="skillsToTeach"
                  placeholder="e.g., Python programming, Guitar, Graphic design, Resume writing..."
                  value={formData.skillsToTeach}
                  onChange={(e) => handleInputChange('skillsToTeach', e.target.value)}
                  required
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-neon focus:border-cyber-neon text-cyber-text min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillsToLearn" className="text-cyber-text font-medium">
                  I want to learn *
                </Label>
                <Textarea
                  id="skillsToLearn"
                  placeholder="e.g., Photography, Web development, Dancing, Public speaking..."
                  value={formData.skillsToLearn}
                  onChange={(e) => handleInputChange('skillsToLearn', e.target.value)}
                  required
                  className="bg-cyber-navy border-cyber-border focus:ring-cyber-purple focus:border-cyber-purple text-cyber-text min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-cyber-text font-medium">
                  Availability
                </Label>
                <Select onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue text-cyber-text">
                    <SelectValue placeholder="When are you available?" />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-card border-cyber-border">
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="mornings">Mornings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-4 h-4 text-cyber-blue bg-cyber-navy border-cyber-border rounded focus:ring-cyber-blue"
              />
              <label htmlFor="terms" className="text-sm text-cyber-muted">
                I agree to the{' '}
                <Link to="/terms" className="text-cyber-blue hover:text-cyber-neon transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-cyber-blue hover:text-cyber-neon transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyber-blue to-cyber-neon text-cyber-dark hover:shadow-xl hover:shadow-cyber-glow-blue transition-all py-3 rounded-lg font-medium"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-cyber-muted">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-cyber-blue hover:text-cyber-neon font-medium transition-colors"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
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
