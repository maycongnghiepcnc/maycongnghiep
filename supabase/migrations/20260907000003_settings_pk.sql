-- Drop the existing primary key on system_settings
ALTER TABLE public.system_settings DROP CONSTRAINT IF EXISTS system_settings_pkey;

-- Add the new composite primary key (key, tenancy)
ALTER TABLE public.system_settings ADD PRIMARY KEY (key, tenancy);
