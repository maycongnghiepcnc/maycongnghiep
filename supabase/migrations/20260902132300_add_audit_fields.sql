-- Add audit fields to categories table
ALTER TABLE categories
ADD COLUMN created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add audit fields to products table
ALTER TABLE products
ADD COLUMN created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create a trigger function to automatically update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for categories table
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add trigger for products table
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
