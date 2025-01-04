export interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    pattern?: string;
    message?: string;
    min?: number;
    max?: number;
  };
  theme?: {
    labelColor?: string;
    backgroundColor?: string;
    borderColor?: string;
  };
}

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  theme?: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
  };
  created_at: string;
  updated_at: string;
  user_id: string;
  published: boolean;
  settings?: {
    submitButtonText: string;
    successMessage: string;
    notifyOnSubmission: boolean;
    redirectUrl?: string;
  };
}

export interface FormResponse {
  id: string;
  form_id: string;
  responses: Record<string, any>;
  submitted_at: string;
  user_id?: string;
}