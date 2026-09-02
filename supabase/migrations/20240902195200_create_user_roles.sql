-- Create Enum for Role
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id) -- One role per user
);

-- Turn on RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read their own role
CREATE POLICY "Users can read own role" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Admins can read all roles
CREATE POLICY "Admins can read all roles" 
ON public.user_roles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Admins can manage roles
CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to fire after insert on auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
