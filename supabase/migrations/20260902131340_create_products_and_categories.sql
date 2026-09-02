-- Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  summary TEXT,
  image_url TEXT
);

-- Create Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT, -- Stored HTML from the Full-Text Editor
  price NUMERIC,
  video_url TEXT,
  images TEXT[] DEFAULT '{}' -- Array of Vercel Blob URLs
);

-- Create Many-to-Many Relationship Table
CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);
