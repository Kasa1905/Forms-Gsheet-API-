import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { FormField } from '../../types/form';
import { FormField as FormFieldComponent } from './FormField';
import { FieldEditor } from './FieldEditor';
import { Dialog } from '../ui/Dialog';

interface FormCanvasProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

export const FormCanvas: React.FC<FormCanvasProps> = ({ fields, onChange }) => {
  const [editingField, setEditingField] = useState<FormField | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);

      onChange(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const handleDeleteField = (fieldId: string) => {
    onChange(fields.filter((field) => field.id !== fieldId));
  };

  const handleUpdateField = (updatedField: FormField) => {
    onChange(
      fields.map((field) => (field.id === updatedField.id ? updatedField : field))
    );
  };

  return (
    <>
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={fields} strategy={verticalListSortingStrategy}>
            {fields.map((field) => (
              <FormFieldComponent
                key={field.id}
                field={field}
                onDelete={() => handleDeleteField(field.id)}
                onEdit={() => setEditingField(field)}
              />
            ))}
          </SortableContext>
        </DndContext>

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400">
              Drag and drop fields here to build your form
            </p>
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(editingField)}
        onClose={() => setEditingField(null)}
        title="Edit Field"
      >
        {editingField && (
          <FieldEditor
            field={editingField}
            onUpdate={handleUpdateField}
            onClose={() => setEditingField(null)}
          />
        )}
      </Dialog>
    </>
  );
};