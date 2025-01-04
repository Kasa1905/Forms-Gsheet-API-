/*
  # Create form responses schema
  
  1. New Tables
    - `form_responses`
      - `id` (uuid, primary key)
      - `form_id` (uuid, references forms)
      - `responses` (jsonb, stores form answers)
      - `sheet_id` (text, Google Sheet ID)
      - `created_at` (timestamp)
    
  2. Security
    - Enable RLS on form_responses table
    - Add policies for form owners
*/

CREATE TABLE IF NOT EXISTS form_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid REFERENCES forms NOT NULL,
  responses jsonb NOT NULL,
  sheet_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Allow form owners to read responses
CREATE POLICY "Form owners can read responses"
  ON form_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM forms
      WHERE forms.id = form_responses.form_id
      AND forms.user_id = auth.uid()
    )
  );