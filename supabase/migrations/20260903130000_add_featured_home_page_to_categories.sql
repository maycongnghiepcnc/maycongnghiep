ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS is_featured_home BOOLEAN NOT NULL DEFAULT false;
