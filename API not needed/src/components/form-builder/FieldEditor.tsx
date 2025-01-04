import React from 'react';
import type { FormField } from '../../types/form';
import { Button } from '../ui/Button';

interface FieldEditorProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onClose: () => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate, onClose }) => {
  const handleUpdate = (updates: Partial<FormField>) => {
    onUpdate({ ...field, ...updates });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Label
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
          placeholder="Enter field label"
        />
      </div>

      {(field.type === 'text' || field.type === 'email') && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Placeholder
          </label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => handleUpdate({ placeholder: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            placeholder="Enter placeholder text"
          />
        </div>
      )}

      {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Options (one per line)
          </label>
          <textarea
            value={field.options?.join('\n') || ''}
            onChange={(e) => handleUpdate({ options: e.target.value.split('\n').filter(Boolean) })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            rows={4}
            placeholder="Enter options"
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleUpdate({ required: e.target.checked })}
            className="rounded border-gray-600 bg-gray-700 text-amber-500"
          />
          <span className="text-sm text-gray-300">Required field</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};