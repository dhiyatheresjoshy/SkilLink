import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Calendar, Clock, CheckCircle, Users, Star, MessageCircle } from 'lucide-react';

interface Exchange {
  id: number;
  partner: {
    name: string;
    avatar: string;
    college: string;
  };
  mySkill: string;
  partnerSkill: string;
  status: 'ongoing' | 'completed' | 'scheduled';
  startDate: string;
  sessions: number;
  totalSessions: number;
  rating?: number;
  review?: string;
  nextSession?: string;
}

const mockExchanges: Exchange[] = [
  {
    id: 1,
    partner: {
      name: "Sarah Chen",
      avatar: "🧑‍💻",
      college: "Stanford University"
    },
    mySkill: "React Development",
    partnerSkill: "Photography",
    status: "ongoing",
    startDate: "2025-01-15",
    sessions: 3,
    totalSessions: 6,
    nextSession: "2025-01-28 2:00 PM"
  },
  {
    id: 2,
    partner: {
      name: "Marcus Johnson",
      avatar: "👨‍🎓", 
      college: "Harvard University"
    },
    mySkill: "Python Programming",
    partnerSkill: "Public Speaking",
    status: "completed",
    startDate: "2024-12-01",
    sessions: 8,
    totalSessions: 8,
    rating: 5,
    review: "Amazing teacher! Marcus helped me become confident in presentations."
  },
  {
    id: 3,
    partner: {
      name: "Elena Rodriguez",
      avatar: "🎨",
      college: "UC Berkeley"
    },
    mySkill: "Web Development",
    partnerSkill: "Graphic Design",
    status: "scheduled",
    startDate: "2025-02-01",
    sessions: 0,
    totalSessions: 4,
    nextSession: "2025-02-01 3:00 PM"
  }
];

export default function MyExchanges() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ongoing");

  const getStatusBadge = (status: Exchange['status']) => {
    const variants = {
      ongoing: "bg-skill-teal text-white",
      completed: "bg-green-500 text-white", 
      scheduled: "bg-skill-purple text-white"
    };
    
    const labels = {
      ongoing: "In Progress",
      completed: "Completed",
      scheduled: "Scheduled"
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const filteredExchanges = mockExchanges.filter(exchange => 
    activeTab === "all" || exchange.status === activeTab
  );

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
            My Exchanges
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-skill-dark mb-2">My Skill Exchanges</h1>
          <p className="text-skill-dark/70">
            Track your learning journey and teaching experiences
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-skill-teal/10 rounded-full">
                  <Users className="w-6 h-6 text-skill-teal" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-skill-dark">
                    {mockExchanges.length}
                  </p>
                  <p className="text-sm text-skill-dark/60">Total Exchanges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-skill-dark">
                    {mockExchanges.filter(e => e.status === 'completed').length}
                  </p>
                  <p className="text-sm text-skill-dark/60">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-skill-dark">
                    {mockExchanges.filter(e => e.status === 'ongoing').length}
                  </p>
                  <p className="text-sm text-skill-dark/60">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-skill-mint">
            <TabsTrigger value="ongoing" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              Completed  
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-skill-teal data-[state=active]:text-white">
              All
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredExchanges.length === 0 ? (
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-skill-dark/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-skill-dark mb-2">
                    No {activeTab} exchanges
                  </h3>
                  <p className="text-skill-dark/60 mb-4">
                    {activeTab === 'ongoing' && "Start swiping to find new skill matches!"}
                    {activeTab === 'completed' && "Complete some exchanges to see them here."}
                    {activeTab === 'scheduled' && "Schedule some exchanges to see them here."}
                    {activeTab === 'all' && "Start your first skill exchange!"}
                  </p>
                  <Button 
                    onClick={() => navigate('/swipe-match')}
                    className="bg-skill-teal hover:bg-skill-dark text-white"
                  >
                    Find Matches
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredExchanges.map((exchange) => (
                <Card key={exchange.id} className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{exchange.partner.avatar}</div>
                        <div>
                          <CardTitle className="text-skill-dark">
                            {exchange.partner.name}
                          </CardTitle>
                          <CardDescription>
                            {exchange.partner.college}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(exchange.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Exchange Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-skill-dark mb-2">Skill Exchange</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-skill-teal/10 text-skill-teal">
                                You teach: {exchange.mySkill}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-skill-purple/10 text-skill-purple">
                                You learn: {exchange.partnerSkill}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-skill-dark mb-2">Progress</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-skill-dark/70">Sessions completed</span>
                              <span className="font-medium">{exchange.sessions}/{exchange.totalSessions}</span>
                            </div>
                            <div className="w-full bg-skill-mint rounded-full h-2">
                              <div 
                                className="bg-skill-teal h-2 rounded-full transition-all"
                                style={{ width: `${(exchange.sessions / exchange.totalSessions) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions & Info */}
                      <div className="space-y-4">
                        {exchange.nextSession && (
                          <div>
                            <h4 className="font-semibold text-skill-dark mb-2">Next Session</h4>
                            <div className="flex items-center gap-2 text-sm text-skill-dark/70">
                              <Calendar className="w-4 h-4" />
                              {exchange.nextSession}
                            </div>
                          </div>
                        )}

                        {exchange.rating && (
                          <div>
                            <h4 className="font-semibold text-skill-dark mb-2">Your Review</h4>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < exchange.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                            </div>
                            {exchange.review && (
                              <p className="text-sm text-skill-dark/70 italic">
                                "{exchange.review}"
                              </p>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="border-skill-teal text-skill-teal hover:bg-skill-teal hover:text-white"
                            onClick={() => navigate('/messages')}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          
                          {exchange.status === 'completed' && !exchange.rating && (
                            <Button className="bg-skill-purple hover:bg-skill-purple/80 text-white">
                              <Star className="w-4 h-4 mr-2" />
                              Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
