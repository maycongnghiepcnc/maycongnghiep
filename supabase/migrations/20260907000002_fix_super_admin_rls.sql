-- Fix RLS recursion issue and update is_admin function to support super_admin

-- 1. Update the security definer function to bypass RLS and check for both roles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role::text IN ('admin', 'super_admin')
  );
$$;

-- 2. Drop the recursive policies created in the previous migration
DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- 3. Recreate them using the safe function
CREATE POLICY "Admins can read all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin());
