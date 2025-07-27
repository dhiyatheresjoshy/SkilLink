import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Zap, LogIn } from 'lucide-react';
import api from '@/api';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('https://skillink-6mvm.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    // Save user data to localStorage or global context
    localStorage.setItem('userData', JSON.stringify(data));

    // Navigate to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    alert('Invalid email or password');
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
            <Link to="/login" className="text-cyber-blue hover:text-cyber-neon transition-colors font-medium">
              Log in
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-cyber-blue to-cyber-electric text-white hover:shadow-lg hover:shadow-cyber-glow-blue transition-all px-6 py-2 rounded-lg border border-cyber-blue/30">
                Sign Up.
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-cyber-card border border-cyber-border rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-neon rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyber-glow-blue">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-neon mb-2">
              Welcome Back!
            </h1>
            <p className="text-cyber-muted">
              Log in to continue your skill exchange journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-cyber-text font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-cyber-text font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-cyber-navy border-cyber-border focus:ring-cyber-blue focus:border-cyber-blue text-cyber-text"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-cyber-blue bg-cyber-navy border-cyber-border rounded focus:ring-cyber-blue"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-cyber-muted">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-cyber-blue hover:text-cyber-neon transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyber-blue to-cyber-neon text-cyber-dark hover:shadow-xl hover:shadow-cyber-glow-blue transition-all py-3 rounded-lg font-medium"
            >
              Log In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-cyber-muted">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-cyber-blue hover:text-cyber-neon font-medium transition-colors"
              >
                Sign up here
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
