-- 1. Alter Products Table
ALTER TABLE public.products 
ADD COLUMN is_featured BOOLEAN DEFAULT false;

-- 2. Create CMS Pages Table
CREATE TABLE public.cms_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  is_published BOOLEAN DEFAULT false,
  
  -- Audit fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- 3. Triggers for updated_at
CREATE TRIGGER update_cms_pages_updated_at BEFORE UPDATE ON public.cms_pages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. RLS Policies for CMS Pages
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.cms_pages FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON public.cms_pages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON public.cms_pages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable delete for authenticated users only" ON public.cms_pages FOR DELETE USING (auth.role() = 'authenticated');
