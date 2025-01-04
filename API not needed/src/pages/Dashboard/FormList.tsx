import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart2, Edit2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { Form } from '../../types/form';

interface FormListProps {
  forms: Form[];
}

export const FormList: React.FC<FormListProps> = ({ forms }) => {
  if (forms.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-300">No forms yet</h3>
        <p className="text-gray-400 mt-2">Create your first form to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forms.map((form) => (
        <div key={form.id} className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2">{form.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{form.description}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" as={Link} to={`/forms/${form.id}/edit`}>
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" as={Link} to={`/forms/${form.id}/responses`}>
              <BarChart2 className="w-4 h-4 mr-1" />
              Responses
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};