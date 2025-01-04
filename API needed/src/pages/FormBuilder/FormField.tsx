import React from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import type { FormField as IFormField } from '../../types/form';
import { Button } from '../../components/ui/Button';

interface FormFieldProps {
  field: IFormField;
  onDelete: () => void;
  onUpdate: (field: IFormField) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, onDelete, onUpdate }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex gap-4">
      <div className="flex items-center">
        <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
      </div>
      
      <div className="flex-1">
        <div className="mb-3">
          <input
            type="text"
            value={field.label}
            onChange={(e) => onUpdate({ ...field, label: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500"
            placeholder="Field Label"
          />
        </div>

        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <div className="mb-3">
            <textarea
              value={field.options?.join('\n')}
              onChange={(e) => onUpdate({ ...field, options: e.target.value.split('\n') })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500"
              placeholder="Enter options (one per line)"
              rows={3}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
              className="mr-2"
            />
            Required
          </label>
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};