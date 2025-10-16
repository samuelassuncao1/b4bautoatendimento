/*
  # B4B Autoatendimento - Database Schema

  ## Overview
  Creates the database structure for the B4B self-service claims portal

  ## New Tables
  
  ### `claims`
  - `id` (uuid, primary key) - Unique identifier for each claim
  - `protocol_number` (text, unique) - Protocol number in format B4B-YYYY-XXXXXX
  - `insurance_company` (text) - Insurance company name (Allseg)
  - `claim_type` (text) - Type of claim (Vida, RCO, Patrimonial)
  - `contact_cpf_cnpj` (text, optional) - CPF/CNPJ of contact
  - `contact_is_client` (boolean) - Whether contact is the client
  - `contact_name` (text, optional) - Contact name
  - `contact_emails` (jsonb) - Array of contact emails
  - `claim_data` (jsonb) - Claim-specific data (varies by type)
  - `created_at` (timestamptz) - When the claim was created
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `claim_documents`
  - `id` (uuid, primary key) - Unique identifier for each document
  - `claim_id` (uuid, foreign key) - Reference to the claim
  - `document_type` (text) - Type of document
  - `file_name` (text) - Original file name
  - `file_path` (text) - Path to the uploaded file
  - `file_size` (integer) - File size in bytes
  - `created_at` (timestamptz) - When the document was uploaded
  
  ## Security
  - Enable RLS on all tables
  - Public insert access for claims submission
  - No public read access (admin-only in future)
*/

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_number text UNIQUE NOT NULL,
  insurance_company text NOT NULL,
  claim_type text NOT NULL,
  contact_cpf_cnpj text,
  contact_is_client boolean DEFAULT false,
  contact_name text,
  contact_emails jsonb DEFAULT '[]'::jsonb,
  claim_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create claim_documents table
CREATE TABLE IF NOT EXISTS claim_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster protocol lookups
CREATE INDEX IF NOT EXISTS idx_claims_protocol_number ON claims(protocol_number);
CREATE INDEX IF NOT EXISTS idx_claim_documents_claim_id ON claim_documents(claim_id);

-- Enable Row Level Security
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_documents ENABLE ROW LEVEL SECURITY;

-- Allow public to insert claims (self-service portal)
CREATE POLICY "Allow public to insert claims"
  ON claims
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow public to insert documents for their claims
CREATE POLICY "Allow public to insert claim documents"
  ON claim_documents
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a function to generate protocol numbers
CREATE OR REPLACE FUNCTION generate_protocol_number()
RETURNS text AS $$
DECLARE
  year_part text;
  sequence_part text;
  next_number integer;
BEGIN
  year_part := to_char(CURRENT_DATE, 'YYYY');
  
  -- Get the next sequence number for this year
  SELECT COALESCE(MAX(CAST(SUBSTRING(protocol_number FROM 10) AS integer)), 0) + 1
  INTO next_number
  FROM claims
  WHERE protocol_number LIKE 'B4B-' || year_part || '-%';
  
  -- Format as 6-digit number
  sequence_part := LPAD(next_number::text, 6, '0');
  
  RETURN 'B4B-' || year_part || '-' || sequence_part;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to auto-generate protocol numbers
CREATE OR REPLACE FUNCTION set_protocol_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.protocol_number IS NULL OR NEW.protocol_number = '' THEN
    NEW.protocol_number := generate_protocol_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_protocol_number
  BEFORE INSERT ON claims
  FOR EACH ROW
  EXECUTE FUNCTION set_protocol_number();

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_claims_updated_at
  BEFORE UPDATE ON claims
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();