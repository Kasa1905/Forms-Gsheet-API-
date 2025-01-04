import React from 'react';
import { Save, Eye } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface FormBuilderHeaderProps {
  title: string;
  onSave: () => void;
  onPreview: () => void;
  saving?: boolean;
}

export const FormBuilderHeader: React.FC<FormBuilderHeaderProps> = ({
  title,
  onSave,
  onPreview,
  saving = false,
}) => {
  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
      <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onPreview}>
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button onClick={onSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Form'}
        </Button>
      </div>
    </div>
  );
};