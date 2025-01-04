import { google } from 'googleapis';
import type { FormField, FormResponse } from '../types/form';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export class GoogleSheetsService {
  private auth;
  private sheets;

  constructor() {
    this.auth = new google.auth.JWT({
      email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
      key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: SCOPES,
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async createSheet(formTitle: string): Promise<string> {
    const response = await this.sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `${formTitle} Responses`,
        },
        sheets: [
          {
            properties: {
              title: 'Responses',
            },
          },
        ],
      },
    });

    return response.data.spreadsheetId!;
  }

  async appendRow(sheetId: string, fields: FormField[], response: FormResponse) {
    const headers = fields.map(field => field.label);
    const values = fields.map(field => response.responses[field.id] || '');

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Responses!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers, values],
      },
    });
  }
}