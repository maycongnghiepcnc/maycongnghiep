import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(req: NextRequest) {
  try {
    // Secure the webhook with a custom header
    // Supabase can be configured to send this header
    const secret = req.headers.get('x-webhook-secret');
    const expectedSecret = process.env.REVALIDATE_SECRET;
    
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const payload = await req.json();
    const { table, type, record, old_record } = payload;

    if (!table) {
      return NextResponse.json({ message: 'Missing table in payload' }, { status: 400 });
    }

    console.log(`[Webhook] Granular Revalidating cache for table: ${table}, action: ${type}`);

    // Always revalidate global lists (Home and All Products)
    revalidatePath('/');
    revalidatePath('/san-pham');

    if (table === 'categories') {
      // For categories, revalidate the specific category layout
      // This will clear cache for the category page and ALL its nested product pages
      if (record?.slug) {
        revalidatePath(`/san-pham/${record.slug}`, 'layout');
      }
      if (old_record?.slug && old_record.slug !== record?.slug) {
        revalidatePath(`/san-pham/${old_record.slug}`, 'layout');
      }
    } 
    else if (table === 'products') {
      const productId = record?.id || old_record?.id;
      
      // Fetch categories this product belongs to
      if (productId) {
        const { data: productCats } = await supabase
          .from('product_categories')
          .select('categories(slug)')
          .eq('product_id', productId);
          
        const categorySlugs = productCats?.map((pc: any) => pc.categories?.slug).filter(Boolean) || [];
        
        for (const catSlug of categorySlugs) {
          // Revalidate the category listing page
          revalidatePath(`/san-pham/${catSlug}`);
          
          // Revalidate the specific product detail pages
          if (record?.slug) {
            revalidatePath(`/san-pham/${catSlug}/${record.slug}`);
          }
          if (old_record?.slug && old_record.slug !== record?.slug) {
            revalidatePath(`/san-pham/${catSlug}/${old_record.slug}`);
          }
        }
      }
    }
    else if (table === 'product_categories') {
      // Fetch slugs for category and product
      const processLink = async (linkRecord: any) => {
        if (!linkRecord) return;
        
        const { category_id, product_id } = linkRecord;
        if (category_id && product_id) {
          const { data: catData } = await supabase.from('categories').select('slug').eq('id', category_id).single();
          const { data: prodData } = await supabase.from('products').select('slug').eq('id', product_id).single();
          
          if (catData?.slug) {
            revalidatePath(`/san-pham/${catData.slug}`);
            if (prodData?.slug) {
              revalidatePath(`/san-pham/${catData.slug}/${prodData.slug}`);
            }
          }
        }
      };

      await processLink(record);
      if (type === 'UPDATE' || type === 'DELETE') {
        await processLink(old_record);
      }
    }
    else if (table === 'system_settings') {
      if (record?.key === 'home_hero_banner' || old_record?.key === 'home_hero_banner') {
        revalidatePath('/');
      }
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      table,
      action: type
    });

  } catch (err) {
    console.error('[Webhook] Error handling revalidation:', err);
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
