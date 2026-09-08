require('dotenv').config({ path: './apps/portal/.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in apps/portal/.env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dataPath = path.join(__dirname, '..', 'duckhacvitinh_transformed.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function run() {
  const tenancy = 'duckhacvitinh';
  
  console.log('Inserting categories...');
  const categoryMap = {}; // slug -> id
  
  for (const cat of data.categories) {
    const slug = cat.slug.toLowerCase();
    
    let { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('tenancy', tenancy)
      .eq('slug', slug)
      .maybeSingle();
      
    let catId;
    if (existing) {
      catId = existing.id;
    } else {
      const { data: newCat, error } = await supabase
        .from('categories')
        .insert({
          tenancy,
          title: cat.title,
          slug: slug
        })
        .select()
        .single();
        
      if (error) console.error(`Error inserting category ${cat.title}:`, error);
      else catId = newCat.id;
    }
    
    if (catId) categoryMap[slug] = catId;
  }
  
  console.log('Inserting products...');
  for (const p of data.products) {
    let { data: existingProd } = await supabase
      .from('products')
      .select('id')
      .eq('tenancy', tenancy)
      .eq('slug', p.slug)
      .maybeSingle();
      
    let prodId;
    if (existingProd) {
      console.log(`Product ${p.slug} already exists, updating...`);
      const { error } = await supabase
        .from('products')
        .update({
          title: p.title,
          code: p.model,
          price: p.price || null,
          content: p.contentHtml,
          images: p.images || []
        })
        .eq('id', existingProd.id);
        
      if (error) console.error(`Error updating product ${p.slug}:`, error);
      prodId = existingProd.id;
    } else {
      console.log(`Inserting product ${p.slug}...`);
      const { data: newProd, error } = await supabase
        .from('products')
        .insert({
          tenancy,
          title: p.title,
          slug: p.slug,
          code: p.model,
          price: p.price || null,
          content: p.contentHtml,
          images: p.images || []
        })
        .select()
        .single();
        
      if (error) {
        console.error(`Error inserting product ${p.title}:`, error);
      } else {
        prodId = newProd.id;
      }
    }
    
    // Insert categories relation
    if (prodId && p.categories && p.categories.length > 0) {
      for (const catLabel of p.categories) {
        const matchSlug = encodeURIComponent(catLabel.trim().replace(/\s+/g, '-')).toLowerCase();
        let catId = null;
        
        for (const [s, id] of Object.entries(categoryMap)) {
          if (matchSlug.includes(s) || s.includes(matchSlug)) {
            catId = id;
            break;
          }
        }
        
        if (!catId) {
            let { data: ex } = await supabase.from('categories').select('id').eq('tenancy', tenancy).eq('slug', matchSlug).maybeSingle();
            if (ex) {
                catId = ex.id;
            } else {
                const { data: newCat, error } = await supabase.from('categories').insert({
                    tenancy, title: catLabel, slug: matchSlug
                }).select().single();
                if (!error) {
                    catId = newCat.id;
                    categoryMap[matchSlug] = catId;
                }
            }
        }

        if (catId) {
          let { data: existingRel } = await supabase
            .from('product_categories')
            .select('*')
            .eq('product_id', prodId)
            .eq('category_id', catId)
            .maybeSingle();

          if (!existingRel) {
            const { error: relError } = await supabase
              .from('product_categories')
              .insert({
                product_id: prodId,
                category_id: catId
              });
          }
        }
      }
    }
  }
  
  console.log('Import completed.');
}

run().catch(console.error);
