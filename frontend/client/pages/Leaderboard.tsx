import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Trophy, Crown, Medal, Star, TrendingUp, Users, Award } from 'lucide-react';

interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  college: string;
  department: string;
  skillPoints: number;
  exchanges: number;
  rating: number;
  topSkills: string[];
  streak: number;
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar: "👑",
    college: "MIT",
    department: "Computer Science",
    skillPoints: 890,
    exchanges: 23,
    rating: 4.9,
    topSkills: ["React", "Python", "AI/ML"],
    streak: 15
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "🧠", 
    college: "Stanford",
    department: "Data Science",
    skillPoints: 845,
    exchanges: 19,
    rating: 4.8,
    topSkills: ["Data Analysis", "R", "Statistics"],
    streak: 12
  },
  {
    id: 3,
    name: "Marcus Chen",
    avatar: "🎨",
    college: "UC Berkeley", 
    department: "Design",
    skillPoints: 790,
    exchanges: 21,
    rating: 4.7,
    topSkills: ["UI/UX", "Figma", "Illustration"],
    streak: 8
  },
  {
    id: 4,
    name: "Sarah Johnson",
    avatar: "📊",
    college: "Harvard",
    department: "Business",
    skillPoints: 720,
    exchanges: 16,
    rating: 4.6,
    topSkills: ["Marketing", "Excel", "Presentations"],
    streak: 10
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "🎵",
    college: "Yale",
    department: "Music",
    skillPoints: 680,
    exchanges: 18,
    rating: 4.8,
    topSkills: ["Guitar", "Piano", "Music Theory"],
    streak: 6
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    avatar: "🎯",
    college: "Princeton",
    department: "Engineering",
    skillPoints: 650,
    exchanges: 14,
    rating: 4.5,
    topSkills: ["AutoCAD", "3D Modeling", "Math"],
    streak: 7
  },
  {
    id: 7,
    name: "You",
    avatar: "👤",
    college: "MIT",
    department: "Computer Science", 
    skillPoints: 150,
    exchanges: 8,
    rating: 4.2,
    topSkills: ["React", "Guitar", "Photography"],
    streak: 3
  }
];

const collegeStats = [
  { college: "MIT", students: 47, skillPoints: 12890 },
  { college: "Stanford", students: 42, skillPoints: 11560 },
  { college: "UC Berkeley", students: 38, skillPoints: 10230 },
  { college: "Harvard", students: 35, skillPoints: 9870 },
  { college: "Yale", students: 29, skillPoints: 8650 }
];

export default function Leaderboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("individual");

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-skill-dark">{rank}</span>;
  };

  const sortedUsers = [...mockLeaderboard].sort((a, b) => b.skillPoints - a.skillPoints);
  const userRank = sortedUsers.findIndex(user => user.name === "You") + 1;

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
            Leaderboard
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-skill-dark mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-skill-teal" />
            Leaderboard
          </h1>
          <p className="text-skill-dark/70">
            See how you rank among fellow skill exchangers
          </p>
        </div>

        {/* Your Rank Card */}
        <Card className="bg-gradient-to-r from-skill-teal to-skill-purple text-white mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">��</div>
                <div>
                  <h3 className="text-xl font-bold">Your Current Rank</h3>
                  <p className="text-white/80">Keep learning to climb higher!</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">#{userRank}</div>
                <div className="text-white/80 text-sm">150 skill points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-skill-mint">
            <TabsTrigger value="individual" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              Individual Rankings
            </TabsTrigger>
            <TabsTrigger value="college" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              College Rankings
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              This Week
            </TabsTrigger>
          </TabsList>

          {/* Individual Rankings */}
          <TabsContent value="individual" className="space-y-4">
            {sortedUsers.map((user, index) => (
              <Card 
                key={user.id} 
                className={`border-0 shadow-sm transition-all hover:shadow-md ${
                  user.name === "You" ? "bg-skill-turquoise/20 border-2 border-skill-teal" : "bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-skill-mint">
                      {getRankIcon(index + 1)}
                    </div>

                    {/* Avatar & Info */}
                    <div className="text-3xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-skill-dark">{user.name}</h3>
                        {user.name === "You" && (
                          <Badge className="bg-skill-teal text-white text-xs">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-skill-dark/70">
                        {user.college} • {user.department}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.topSkills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-skill-purple text-skill-purple">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-skill-teal">
                          {user.skillPoints}
                        </div>
                        <div className="text-xs text-skill-dark/60">skill points</div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-skill-dark/70">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {user.exchanges}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {user.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {user.streak}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* College Rankings */}
          <TabsContent value="college" className="space-y-4">
            {collegeStats.map((college, index) => (
              <Card key={college.college} className="bg-white border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-skill-mint">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-skill-dark text-lg">{college.college}</h3>
                      <p className="text-skill-dark/70">{college.students} active students</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-skill-teal">
                        {college.skillPoints.toLocaleString()}
                      </div>
                      <div className="text-sm text-skill-dark/60">total skill points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Weekly Rankings */}
          <TabsContent value="weekly" className="space-y-4">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-skill-dark flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Performers This Week
                </CardTitle>
                <CardDescription>
                  Most skill points earned in the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedUsers.slice(0, 5).map((user, index) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg bg-skill-mint/30">
                      {getRankIcon(index + 1)}
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-skill-dark">{user.name}</div>
                        <div className="text-sm text-skill-dark/70">{user.college}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-skill-teal">+{Math.floor(user.skillPoints / 10)}</div>
                        <div className="text-xs text-skill-dark/60">points this week</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
