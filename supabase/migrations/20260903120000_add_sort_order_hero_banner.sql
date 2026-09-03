-- Add sort_order and hero_banner to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS hero_banner text;

-- Add sort_order to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;
