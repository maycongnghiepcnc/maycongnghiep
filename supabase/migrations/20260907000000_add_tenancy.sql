-- Migration: Add Tenancy to support Multi-Tenancy

-- 1. Add `tenancies` array to `profiles`
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS tenancies TEXT[] NOT NULL DEFAULT '{maycongnghiep}';

-- 2. Add `tenancy` column to data tables
-- All these tables will default to 'maycongnghiep' for existing rows

ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_contacts 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_opportunities 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_activities 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_customers 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_sales 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.cms_pages 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.system_settings 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.notifications 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_quotations 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

ALTER TABLE public.crm_quotation_items 
ADD COLUMN IF NOT EXISTS tenancy TEXT NOT NULL DEFAULT 'maycongnghiep';

-- 3. Update existing RLS policies (if any) or add indices on tenancy
CREATE INDEX IF NOT EXISTS idx_categories_tenancy ON public.categories (tenancy);
CREATE INDEX IF NOT EXISTS idx_products_tenancy ON public.products (tenancy);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_tenancy ON public.crm_contacts (tenancy);
CREATE INDEX IF NOT EXISTS idx_crm_customers_tenancy ON public.crm_customers (tenancy);
CREATE INDEX IF NOT EXISTS idx_crm_sales_tenancy ON public.crm_sales (tenancy);
CREATE INDEX IF NOT EXISTS idx_cms_pages_tenancy ON public.cms_pages (tenancy);
CREATE INDEX IF NOT EXISTS idx_crm_quotations_tenancy ON public.crm_quotations (tenancy);
