import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { ArrowLeft, Send, Search, MessageCircle, Clock } from 'lucide-react';

interface Message {
  id: number;
  sender: 'me' | 'other';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  skill: string;
  status: 'matched' | 'chatting' | 'scheduled';
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "🧑‍💻",
    lastMessage: "Hey! When would you like to start the React lessons?",
    timestamp: "2m ago",
    unread: 2,
    skill: "React ↔ Photography",
    status: "chatting"
  },
  {
    id: 2,
    name: "Marcus Johnson", 
    avatar: "👨‍🎓",
    lastMessage: "Thanks for the Python help! Let's schedule the next session.",
    timestamp: "1h ago",
    unread: 0,
    skill: "Python ↔ Public Speaking",
    status: "scheduled"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: "🎨",
    lastMessage: "I love your design portfolio! Ready to start?",
    timestamp: "3h ago", 
    unread: 1,
    skill: "Design ↔ Video Editing",
    status: "matched"
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'other',
    content: "Hi! I saw we matched for React and Photography exchange. I'm excited to learn React from you!",
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    sender: 'me',
    content: "Hey Sarah! That's great! I'm also excited to learn photography. When would be a good time for you?",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    sender: 'other',
    content: "How about we start with a React session this weekend? I can show you some photography basics afterward.",
    timestamp: "10:35 AM"
  },
  {
    id: 4,
    sender: 'other',
    content: "Hey! When would you like to start the React lessons?",
    timestamp: "2m ago"
  }
];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // TODO: Implement send message logic
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.skill.toLowerCase().includes(searchTerm.toLowerCase())
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
            Messages
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-skill-dark flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-skill-dark/50" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-skill-mint focus:ring-skill-teal"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 cursor-pointer transition-colors border-l-4 ${
                      selectedConversation === conversation.id
                        ? 'bg-skill-mint border-skill-teal'
                        : 'hover:bg-skill-mint/50 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{conversation.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-skill-dark truncate">
                            {conversation.name}
                          </h3>
                          {conversation.unread > 0 && (
                            <Badge className="bg-skill-teal text-white text-xs px-2 py-0">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-skill-dark/70 mb-1 truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className="text-xs border-skill-purple text-skill-purple"
                          >
                            {conversation.skill}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-skill-dark/50">
                            <Clock className="w-3 h-3" />
                            {conversation.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <Card className="bg-white border-0 shadow-sm h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-skill-mint">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {mockConversations.find(c => c.id === selectedConversation)?.avatar}
                    </div>
                    <div>
                      <h2 className="font-semibold text-skill-dark">
                        {mockConversations.find(c => c.id === selectedConversation)?.name}
                      </h2>
                      <p className="text-sm text-skill-dark/70">
                        {mockConversations.find(c => c.id === selectedConversation)?.skill}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'me'
                              ? 'bg-skill-teal text-white'
                              : 'bg-skill-mint text-skill-dark'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'me' ? 'text-white/70' : 'text-skill-dark/50'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-skill-mint">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border-skill-mint focus:ring-skill-teal"
                    />
                    <Button 
                      type="submit" 
                      className="bg-skill-teal hover:bg-skill-dark text-white px-4"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            ) : (
              <Card className="bg-white border-0 shadow-sm h-full flex items-center justify-center">
                <div className="text-center text-skill-dark/50">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
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
