-- Add note column to crm_contacts
ALTER TABLE crm_contacts
ADD COLUMN note TEXT;

-- Add note column to crm_opportunities
ALTER TABLE crm_opportunities
ADD COLUMN note TEXT;
