import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-skill-mint">
      {/* Navigation */}
      <nav className="bg-skill-turquoise px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-skill-dark">
            SkilLink
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/how-it-works" className="text-skill-dark hover:text-skill-teal transition-colors">
              How it Works
            </Link>
            <Link to="/login" className="text-skill-dark hover:text-skill-teal transition-colors">
              Log in
            </Link>
            <Button className="bg-skill-teal text-white hover:bg-skill-dark transition-colors px-6 py-2 rounded-lg">
              Sign Up.
            </Button>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-2xl p-12 shadow-sm">
          <h1 className="text-6xl font-bold text-skill-dark mb-6">404</h1>
          <h2 className="text-3xl font-bold text-skill-dark mb-6">Page Not Found</h2>
          <p className="text-xl text-skill-dark/70 mb-8 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist. Let's get you back to discovering and sharing skills.
          </p>
          <Link to="/">
            <Button className="bg-skill-teal text-white hover:bg-skill-dark transition-colors px-8 py-3 rounded-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-skill-purple px-6 py-12 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white mb-6">
            © 2025 SkilLink. Built at Hackathon.
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
