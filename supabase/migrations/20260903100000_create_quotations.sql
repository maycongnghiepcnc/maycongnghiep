-- 1. Create CRM Quotations Table
CREATE TABLE public.crm_quotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- e.g. BG-20260903-0001
  contact_id UUID REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.crm_opportunities(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, accepted, rejected, expired
  
  subtotal NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  tax NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  
  notes TEXT,
  valid_until TIMESTAMP WITH TIME ZONE,
  pdf_url TEXT,
  
  -- Audit fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- 2. Create CRM Quotation Items Table
CREATE TABLE public.crm_quotation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id UUID REFERENCES public.crm_quotations(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  total_price NUMERIC DEFAULT 0,
  
  -- Audit fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Triggers for updated_at
CREATE TRIGGER update_crm_quotations_updated_at BEFORE UPDATE ON public.crm_quotations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_quotation_items_updated_at BEFORE UPDATE ON public.crm_quotation_items 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. RLS Policies
ALTER TABLE public.crm_quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_quotation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for authenticated users only" ON public.crm_quotations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users only" ON public.crm_quotation_items FOR ALL USING (auth.role() = 'authenticated');

-- 5. Storage Bucket for Quotations
-- (Since migrations can't always create buckets safely if they already exist, we'll do it securely)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('quotations', 'quotations', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Quotation PDFs are publicly accessible." 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'quotations' );

CREATE POLICY "Authenticated users can upload quotation PDFs." 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'quotations' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update quotation PDFs." 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'quotations' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete quotation PDFs." 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'quotations' AND auth.role() = 'authenticated' );
