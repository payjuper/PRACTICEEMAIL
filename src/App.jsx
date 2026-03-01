import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      {/* Routes with Navbar and Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/submit" element={<CreatePostPage />} />
        <Route path="/c/:communityName" element={<CommunityPage />} />

        {/* ✅ id-based profile routes (both supported to avoid 404) */}
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/user/:id" element={<ProfilePage />} />

        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Routes without Navbar and Sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 404 Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;