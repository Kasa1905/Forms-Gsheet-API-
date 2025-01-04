import { supabase } from './supabase';
import { GoogleSheetsService } from './sheets';
import type { Form, FormResponse } from '../types/form';

const sheetsService = new GoogleSheetsService();

export async function submitFormResponse(
  form: Form,
  responses: Record<string, any>
): Promise<FormResponse> {
  let sheetId = '';

  // Get or create Google Sheet
  const { data: existingResponse } = await supabase
    .from('form_responses')
    .select('sheet_id')
    .eq('form_id', form.id)
    .limit(1)
    .single();

  if (existingResponse?.sheet_id) {
    sheetId = existingResponse.sheet_id;
  } else {
    // Create new sheet for first response
    sheetId = await sheetsService.createSheet(form.title);
  }

  // Save response to database
  const { data, error } = await supabase
    .from('form_responses')
    .insert({
      form_id: form.id,
      responses,
      sheet_id: sheetId,
    })
    .select()
    .single();

  if (error) throw error;

  // Append to Google Sheet
  await sheetsService.appendRow(sheetId, form.fields, data);

  return data;
}