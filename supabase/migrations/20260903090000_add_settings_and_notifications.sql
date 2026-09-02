-- 1. Create System Settings Table
CREATE TABLE public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  
  -- Audit fields
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_by UUID REFERENCES auth.users(id)
);

-- 2. Create Notifications Table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  
  -- Audit fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id UUID REFERENCES auth.users(id) -- if null, broadcast to all admins
);

-- 3. Triggers for updated_at
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. RLS Policies
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- System Settings: Only authenticated users (admins) can read and write
CREATE POLICY "Enable read access for authenticated users only" ON public.system_settings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users only" ON public.system_settings FOR ALL USING (auth.role() = 'authenticated');

-- Notifications: Authenticated users can read all, update their read status, etc.
CREATE POLICY "Enable read access for authenticated users only" ON public.notifications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.notifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users only" ON public.notifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON public.notifications FOR DELETE USING (auth.role() = 'authenticated');
