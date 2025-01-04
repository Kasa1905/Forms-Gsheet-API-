import React from 'react';
import { Type, Hash, Mail, List, Radio, CheckSquare, FileText, Calendar } from 'lucide-react';
import type { FormField } from '../../types/form';

interface FieldTypeProps {
  onAddField: (type: FormField['type']) => void;
}

export const FieldTypes: React.FC<FieldTypeProps> = ({ onAddField }) => {
  const fieldTypes = [
    { type: 'text', icon: Type, label: 'Text' },
    { type: 'number', icon: Hash, label: 'Number' },
    { type: 'email', icon: Mail, label: 'Email' },
    { type: 'select', icon: List, label: 'Dropdown' },
    { type: 'radio', icon: Radio, label: 'Radio' },
    { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
    { type: 'file', icon: FileText, label: 'File Upload' },
    { type: 'date', icon: Calendar, label: 'Date' },
  ] as const;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-sm font-medium text-gray-300 mb-3">Field Types</h2>
      <div className="grid grid-cols-2 gap-2">
        {fieldTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onAddField(type)}
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
          >
            <Icon className="w-4 h-4 mr-2 text-amber-500" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};