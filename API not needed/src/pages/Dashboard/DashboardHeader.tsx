import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">My Forms</h1>
        <p className="text-gray-400">Manage and track your forms</p>
      </div>
      <Link to="/forms/new">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Form
        </Button>
      </Link>
    </div>
  );
};