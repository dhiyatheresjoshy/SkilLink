import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { User, MessageCircle, RotateCcw, Trophy, Zap, Globe, Users } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-cyber-dark">
      {/* Navigation */}
      <nav className="bg-cyber-darker border-b border-cyber-border px-6 py-4 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-cyber-blue flex items-center gap-2">
            <Zap className="w-8 h-8 text-cyber-neon" />
            SkilLink
            <div className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/how-it-works" className="text-cyber-text hover:text-cyber-blue transition-colors">
              How it Works
            </Link>
            <Link to="/login" className="text-cyber-text hover:text-cyber-blue transition-colors">
              Log in
            </Link>
            <Button className="bg-gradient-to-r from-cyber-blue to-cyber-electric text-white hover:shadow-lg hover:shadow-cyber-glow-blue transition-all px-6 py-2 rounded-lg border border-cyber-blue/30">
              Sign Up.
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyber-dark via-cyber-navy to-cyber-dark px-6 py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyber-neon rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyber-purple rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue via-cyber-neon to-cyber-blue mb-6 leading-tight animate-pulse">
                Skill bartering<br />made social!
              </h1>
              <p className="text-lg text-cyber-text mb-8 max-w-md">
                SkilLink is a peer-to-peer skill exchange platform where students connect, teach, and learn from each other — all without money.
              </p>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-cyber-neon to-cyber-blue text-cyber-dark hover:shadow-xl hover:shadow-cyber-glow-neon transition-all px-8 py-3 text-lg rounded-lg font-bold border border-cyber-neon/50 hover:scale-105">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
            
            {/* Futuristic Geometric Design */}
            <div className="relative lg:h-96 h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Glowing holographic elements */}
                <div className="absolute w-32 h-24 bg-gradient-to-r from-cyber-blue to-cyber-electric rounded-2xl transform -rotate-12 top-8 left-8 shadow-lg shadow-cyber-glow-blue border border-cyber-blue/30"></div>
                
                <div className="absolute w-16 h-16 bg-gradient-to-r from-cyber-neon to-cyber-blue transform rotate-45 top-16 right-20 shadow-lg shadow-cyber-glow-neon border border-cyber-neon/30"></div>
                
                <div className="absolute w-32 h-24 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-2xl transform rotate-12 top-8 right-8 shadow-lg shadow-cyber-glow-purple border border-cyber-purple/30"></div>
                
                <div className="absolute w-20 h-20 bg-gradient-to-r from-cyber-electric to-cyber-blue rounded-xl bottom-20 left-12 shadow-lg shadow-cyber-glow-blue border border-cyber-blue/30"></div>
                
                {/* Central glowing orb */}
                <div className="absolute w-16 h-16 bg-gradient-to-r from-cyber-neon to-cyber-blue rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-xl shadow-cyber-glow-neon animate-pulse border-2 border-cyber-neon/50"></div>
                
                {/* Holographic triangle */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-cyber-pink shadow-lg"></div>
                </div>
                
                <div className="absolute w-32 h-24 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-2xl transform -rotate-6 bottom-8 right-12 shadow-lg shadow-cyber-glow-purple border border-cyber-purple/30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-cyber-navy px-6 py-16 relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(cyber-border 1px, transparent 1px), linear-gradient(90deg, cyber-border 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-neon mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Create a profile */}
            <div className="bg-cyber-card rounded-2xl p-8 text-center shadow-xl border border-cyber-border hover:border-cyber-blue/50 transition-all group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-electric rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyber-glow-blue border border-cyber-blue/30 group-hover:shadow-xl group-hover:shadow-cyber-glow-blue">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-cyber-text mb-4">
                Create a<br />profile
              </h3>
              <p className="text-cyber-muted text-sm leading-relaxed">
                Add what you can teach and what you want to learn.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-cyber-blue to-cyber-electric rounded-full"></div>
              </div>
            </div>

            {/* Step 2: Match & chat */}
            <div className="bg-cyber-card rounded-2xl p-8 text-center shadow-xl border border-cyber-border hover:border-cyber-neon/50 transition-all group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-neon to-cyber-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyber-glow-neon border border-cyber-neon/30 group-hover:shadow-xl group-hover:shadow-cyber-glow-neon">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-cyber-text mb-4">
                Match &<br />chat
              </h3>
              <p className="text-cyber-muted text-sm leading-relaxed">
                Swipe to find skill matches and connect with peers.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-cyber-neon to-cyber-blue rounded-full"></div>
              </div>
            </div>

            {/* Step 3: Exchange skills */}
            <div className="bg-cyber-card rounded-2xl p-8 text-center shadow-xl border border-cyber-border hover:border-cyber-purple/50 transition-all group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyber-glow-purple border border-cyber-purple/30 group-hover:shadow-xl group-hover:shadow-cyber-glow-purple">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-cyber-text mb-4">
                Exchange<br />skills
              </h3>
              <p className="text-cyber-muted text-sm leading-relaxed">
                Teach and learn through skill-sharing sessions.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full"></div>
              </div>
            </div>

            {/* Step 4: Earn points & build portfolio */}
            <div className="bg-cyber-card rounded-2xl p-8 text-center shadow-xl border border-cyber-border hover:border-cyber-pink/50 transition-all group hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-cyber-pink/30 group-hover:shadow-xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-cyber-text mb-4">
                Earn points<br />& build<br />portfolio
              </h3>
              <p className="text-cyber-muted text-sm leading-relaxed">
                Get recognized and build a verified record of your skills.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyber-darker to-cyber-dark border-t border-cyber-border px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-cyber-neon" />
            <p className="text-cyber-text">
              © 2025 SkilLink. Built at CodeReCET.
            </p>
            <Users className="w-5 h-5 text-cyber-blue" />
          </div>
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
