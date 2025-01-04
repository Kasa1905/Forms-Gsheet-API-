import { supabase } from './supabase';
import type { Form, FormResponse } from '../types/form';

export async function submitFormResponse(
  form: Form,
  responses: Record<string, any>
): Promise<FormResponse> {
  // Save response to database
  const { data, error } = await supabase
    .from('form_responses')
    .insert({
      form_id: form.id,
      responses,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}