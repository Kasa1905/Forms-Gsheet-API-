import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { FormList } from './FormList';

export const Dashboard: React.FC = () => {
  // TODO: Fetch forms from Supabase
  const forms: Form[] = [];

  return (
    <div>
      <DashboardHeader />
      <FormList forms={forms} />
    </div>
  );
};