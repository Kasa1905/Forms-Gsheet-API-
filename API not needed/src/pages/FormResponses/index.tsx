import React from 'react';
import { useParams } from 'react-router-dom';

export const FormResponses: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Form Responses</h1>
      {/* TODO: Implement responses view */}
    </div>
  );
};