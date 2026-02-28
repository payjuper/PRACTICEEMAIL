import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-20 pr-8">
        <Outlet />
      </main>
    </div>
  );
}