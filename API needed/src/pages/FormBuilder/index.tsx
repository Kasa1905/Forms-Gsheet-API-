import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Form, FormField } from '../../types/form';
import { FormBuilderHeader } from './FormBuilderHeader';
import { FormSettings } from './FormSettings';
import { FieldTypes } from './FieldTypes';
import { FormCanvas } from '../../components/form-builder/FormCanvas';
import { FormView } from '../../components/FormView';
import { Dialog } from '../../components/ui/Dialog';
import { saveForm } from '../../lib/forms';

export const FormBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState<Partial<Form>>({
    title: '',
    description: '',
    fields: [],
  });

  const handleAddField = (type: FormField['type']) => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type,
      label: '',
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? [] : undefined,
    };

    setForm((prev) => ({
      ...prev,
      fields: [...(prev.fields || []), newField],
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(undefined);
      
      if (!form.title) {
        throw new Error('Please enter a form title');
      }

      if (!form.fields?.length) {
        throw new Error('Please add at least one field to your form');
      }

      const savedForm = await saveForm(form);
      navigate(`/forms/${savedForm.id}/edit`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save form');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <FormBuilderHeader
        title={isEditing ? 'Edit Form' : 'Create New Form'}
        onSave={handleSave}
        onPreview={() => setShowPreview(true)}
        saving={saving}
      />

      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <FormSettings
            title={form.title || ''}
            description={form.description || ''}
            onTitleChange={(title) => setForm((prev) => ({ ...prev, title }))}
            onDescriptionChange={(description) => setForm((prev) => ({ ...prev, description }))}
          />

          <FormCanvas
            fields={form.fields || []}
            onChange={(fields) => setForm((prev) => ({ ...prev, fields }))}
          />
        </div>

        <div className="sticky top-4">
          <FieldTypes onAddField={handleAddField} />
        </div>
      </div>

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title="Form Preview"
      >
        <div className="bg-gray-900 p-6 rounded-lg">
          <FormView
            form={form as Form}
            onSubmit={() => setShowPreview(false)}
          />
        </div>
      </Dialog>
    </div>
  );
};