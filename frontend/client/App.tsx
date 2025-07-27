import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SwipeMatch from "./pages/SwipeMatch";
import Messages from "./pages/Messages";
import MyExchanges from "./pages/MyExchanges";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/how-it-works" 
          element={
            <PlaceholderPage 
              title="How SkilLink Works" 
              description="Learn more about how our peer-to-peer skill exchange platform connects students for meaningful learning experiences."
            />
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/swipe-match" element={<SwipeMatch />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-exchanges" element={<MyExchanges />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/test" element={<TestPage />} />
        <Route 
          path="/about" 
          element={
            <PlaceholderPage 
              title="About SkilLink" 
              description="Discover our mission to create a peer-led platform where students can exchange skills for real impact without money."
            />
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PlaceholderPage 
              title="Contact Us" 
              description="Get in touch with the SkilLink team. We'd love to hear from you!"
            />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
