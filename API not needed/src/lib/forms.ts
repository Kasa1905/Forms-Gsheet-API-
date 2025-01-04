import { supabase } from './supabase';
import type { Form } from '../types/form';

export async function saveForm(form: Partial<Form>) {
  const user = await supabase.auth.getUser();
  
  if (!user.data.user) {
    throw new Error('User not authenticated');
  }

  const formData = {
    ...form,
    user_id: user.data.user.id,
    updated_at: new Date().toISOString(),
  };

  if (!form.id) {
    // Create new form
    const { data, error } = await supabase
      .from('forms')
      .insert(formData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Update existing form
    const { data, error } = await supabase
      .from('forms')
      .update(formData)
      .eq('id', form.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}