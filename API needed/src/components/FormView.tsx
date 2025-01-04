import React, { useState } from 'react';
import { Button } from './ui/Button';
import { submitFormResponse } from '../lib/responses';
import type { Form } from '../types/form';

interface FormViewProps {
  form: Form;
  onSubmit?: () => void;
}

export const FormView: React.FC<FormViewProps> = ({ form, onSubmit }) => {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(undefined);
      
      await submitFormResponse(form, responses);
      onSubmit?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {form.fields.map(field => (
        <div key={field.id} className="space-y-2">
          <label className="block font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === 'text' && (
            <input
              type="text"
              required={field.required}
              onChange={e => handleFieldChange(field.id, e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          )}
          {/* Add other field types here */}
        </div>
      ))}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};