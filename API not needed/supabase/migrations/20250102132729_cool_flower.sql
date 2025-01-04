/*
  # Create forms schema
  
  1. New Tables
    - `forms`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `fields` (jsonb array of form fields)
      - `user_id` (uuid, references auth.users)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on forms table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  fields jsonb NOT NULL DEFAULT '[]',
  user_id uuid REFERENCES auth.users NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own forms
CREATE POLICY "Users can read own forms"
  ON forms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own forms
CREATE POLICY "Users can insert own forms"
  ON forms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own forms
CREATE POLICY "Users can update own forms"
  ON forms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);