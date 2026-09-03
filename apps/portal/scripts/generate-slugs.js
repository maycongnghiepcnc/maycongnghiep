const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function main() {
  console.log('Fetching categories...');
  const { data: categories } = await supabase.from('categories').select('id, title');
  if (categories) {
    for (const cat of categories) {
      if (!cat.title) continue;
      const baseSlug = slugify(cat.title);
      let slug = baseSlug;
      let counter = 1;
      let success = false;
      while (!success) {
        const { error } = await supabase.from('categories').update({ slug }).eq('id', cat.id);
        if (error && error.code === '23505') { // unique violation
          slug = `${baseSlug}-${counter}`;
          counter++;
        } else {
          success = true;
          console.log(`Updated category ${cat.id} slug to ${slug}`);
        }
      }
    }
  }

  console.log('Fetching products...');
  const { data: products } = await supabase.from('products').select('id, title');
  if (products) {
    for (const prod of products) {
      if (!prod.title) continue;
      const baseSlug = slugify(prod.title);
      let slug = baseSlug;
      let counter = 1;
      let success = false;
      while (!success) {
        const { error } = await supabase.from('products').update({ slug }).eq('id', prod.id);
        if (error && error.code === '23505') {
          slug = `${baseSlug}-${counter}`;
          counter++;
        } else {
          success = true;
          console.log(`Updated product ${prod.id} slug to ${slug}`);
        }
      }
    }
  }
  
  console.log('Done!');
}

main().catch(console.error);
