const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to duckhacvitinh.com...');
  await page.goto('https://www.duckhacvitinh.com/', { waitUntil: 'domcontentloaded' });
  
  // Extract categories from main navigation
  console.log('Extracting categories from main navigation...');
  const categories = await page.$$eval('a', as => {
    return Array.from(new Set(as
      .filter(a => a.href.includes('/search/label/') && a.href.includes('duckhacvitinh.com') && !a.closest('.post-footer'))
      .map(a => ({
        url: a.href,
        slug: decodeURIComponent(a.href.split('/search/label/')[1].split('?')[0]),
        title: a.innerText.trim()
      }))
      .filter(c => c.title && c.title === c.title.toUpperCase() && c.title.length > 2)
    ));
  });

  console.log(`Found ${categories.length} categories.`);
  
  // Collect all product links across all categories
  const productLinks = new Set();
  
  for (const cat of categories) {
    console.log(`Scraping category: ${cat.slug}`);
    let hasNext = true;
    let url = cat.url;
    
    while (hasNext) {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      
      const links = await page.$$eval('a', as => 
        as.map(a => a.href).filter(href => href.includes('.html') && !href.includes('/p/'))
      );
      
      links.forEach(l => productLinks.add(l));
      
      // Check for next page in blogger
      const nextUrl = await page.$eval('a.blog-pager-older-link', a => a.href).catch(() => null);
      if (nextUrl) {
        url = nextUrl;
      } else {
        hasNext = false;
      }
    }
  }

  const uniqueLinks = Array.from(productLinks);
  console.log(`Found ${uniqueLinks.length} unique products. Scraping details...`);
  
  const products = [];
  for (let i = 0; i < uniqueLinks.length; i++) {
    const link = uniqueLinks[i];
    console.log(`Scraping product ${i+1}/${uniqueLinks.length}: ${link}`);
    
    try {
      await page.goto(link, { waitUntil: 'domcontentloaded' });
      
      const title = await page.title();
      const images = await page.$$eval('.post-body img', imgs => imgs.map(i => i.src));
      const contentText = await page.$eval('.post-body', el => el.innerText).catch(() => '');
      const contentHtml = await page.$eval('.post-body', el => el.innerHTML).catch(() => '');
      
      // Attempt to extract categories for this product by looking at its labels
      const productCats = await page.$$eval('.post-labels a', as => as.map(a => a.innerText.trim())).catch(() => []);
      
      products.push({
        url: link,
        title: title.replace(/ - Máy Đục,Khắc,Tiện Vi Tính CNC.*/, ''),
        categories: productCats,
        images,
        contentText,
        contentHtml
      });
      
    } catch (err) {
      console.error(`Failed to scrape ${link}:`, err.message);
    }
  }

  const result = {
    categories,
    products
  };

  const outputPath = path.join(__dirname, '..', 'duckhacvitinh_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`Scraping complete! Saved to ${outputPath}`);
  
  await browser.close();
})();
