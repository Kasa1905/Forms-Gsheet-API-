import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Bird as FalconIcon, LogOut } from 'lucide-react';
import { Button } from './ui/Button';
import { signOut } from '../lib/auth';

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center gap-2 mb-8">
          <FalconIcon className="h-8 w-8 text-amber-500" />
          <span className="text-xl font-bold text-amber-500">FalconForms</span>
        </div>
        
        <nav className="space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/forms/new"
            className="block px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Create Form
          </Link>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <h1 className="text-xl font-semibold">ACES Form Management System</h1>
        </header>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};