const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'duckhacvitinh_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Regex patterns
const modelRegex = /Model:\s*([^\n\r]+)/i;
const priceRegex = /(?:Giá:|Giá bán:)?\s*([\d,.]+[\s]*(?:VNĐ|VND|vnđ|vnd))/i;

const transformedProducts = data.products.map(p => {
  let model = null;
  let price = null;
  let numericPrice = 0;
  
  if (p.contentText) {
    const modelMatch = p.contentText.match(modelRegex);
    if (modelMatch) {
      model = modelMatch[1].trim();
    }
    
    // Sometimes price is just on the first line or labeled with "Giá:"
    const priceMatch = p.contentText.match(priceRegex);
    if (priceMatch) {
      price = priceMatch[1].trim();
    } else {
      // Fallback: look for VNĐ anywhere
      const fallbackMatch = p.contentText.match(/([\d,.]+[\s]*(?:VNĐ|VND|vnđ|vnd))/i);
      if (fallbackMatch) price = fallbackMatch[1].trim();
    }
    
    if (price) {
      // Extract numeric value
      const numStr = price.replace(/[^\d]/g, '');
      if (numStr) {
        numericPrice = parseInt(numStr, 10);
      }
    }
  }
  
  return {
    ...p,
    model,
    priceStr: price,
    price: numericPrice,
    slug: p.url.split('/').pop().replace('.html', '')
  };
});

const result = {
  categories: data.categories,
  products: transformedProducts
};

const outPath = path.join(__dirname, '..', 'duckhacvitinh_transformed.json');
fs.writeFileSync(outPath, JSON.stringify(result, null, 2));

console.log(`Transformed ${transformedProducts.length} products.`);
console.log('\n--- Sample extracted data ---');
transformedProducts.slice(0, 5).forEach(p => {
  console.log(`Title: ${p.title}`);
  console.log(`Model: ${p.model}`);
  console.log(`Price Str: ${p.priceStr}`);
  console.log(`Price Num: ${p.price}`);
  console.log(`Slug: ${p.slug}`);
  console.log('-----------------------------');
});
