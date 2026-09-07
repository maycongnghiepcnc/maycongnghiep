-- Add super_admin role to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';

-- Drop existing policies that might be checking for strictly 'admin'
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Create new policies allowing both admin and super_admin
CREATE POLICY "Admins can read all roles" 
ON public.user_roles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text IN ('admin', 'super_admin')
  )
);

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text IN ('admin', 'super_admin')
  )
);

-- Update handle_new_user to also read tenancies from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  assigned_role public.app_role;
  assigned_tenancies TEXT[];
BEGIN
  -- Determine role from metadata (set during invite)
  IF NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
    assigned_role := (NEW.raw_user_meta_data->>'role')::public.app_role;
  ELSE
    assigned_role := 'pending'::public.app_role;
  END IF;

  -- Determine tenancies from metadata
  IF NEW.raw_user_meta_data->>'tenancies' IS NOT NULL THEN
    assigned_tenancies := ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'tenancies'));
  ELSE
    assigned_tenancies := '{maycongnghiep}';
  END IF;

  -- Insert role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, assigned_role)
  ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role;

  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name, avatar_url, tenancies)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    assigned_tenancies
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
