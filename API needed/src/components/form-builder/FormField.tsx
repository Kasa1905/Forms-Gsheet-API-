import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Settings } from 'lucide-react';
import type { FormField as IFormField } from '../../types/form';
import { Button } from '../ui/Button';

interface FormFieldProps {
  field: IFormField;
  onDelete: () => void;
  onEdit: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({ field, onDelete, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="bg-gray-800 rounded-lg p-4 flex gap-4 group hover:ring-2 hover:ring-amber-500/50"
    >
      <div 
        className="flex items-center cursor-move touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-200">{field.label || 'Untitled Field'}</h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete}>
              <Trash2 className="w-4 h-4 text-red-400" />
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          {field.type.charAt(0).toUpperCase() + field.type.slice(1)} field
          {field.required && ' • Required'}
        </div>
      </div>
    </div>
  );
};