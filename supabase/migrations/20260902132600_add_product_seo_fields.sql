-- Add SEO and tracking fields to products table
ALTER TABLE products
ADD COLUMN code TEXT UNIQUE,
ADD COLUMN serial_number TEXT,
ADD COLUMN tags TEXT[] DEFAULT '{}',
ADD COLUMN meta_title TEXT,
ADD COLUMN meta_description TEXT;
