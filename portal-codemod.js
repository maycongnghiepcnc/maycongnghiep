const fs = require('fs');
const path = require('path');

const dir = 'apps/portal/src/app/actions';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip files without createClient
  if (!content.includes('createClient()')) continue;

  if (!content.includes("from 'next/headers'")) {
    content = content.replace("import { createClient }", "import { cookies } from 'next/headers'\nimport { createClient }");
  }

  // Inject active_tenancy
  content = content.replace(/const supabase = await createClient\(\)/g, "const supabase = await createClient()\n  const active_tenancy = (await cookies()).get('active_tenancy')?.value");

  // Insert: .insert([{ ... }])
  content = content.replace(/\.insert\(\[\{\s*/g, ".insert([{ tenancy: active_tenancy, ");
  
  // Insert: .insert({ ... })
  content = content.replace(/\.insert\(\{\s*/g, ".insert({ tenancy: active_tenancy, ");
  
  // Update: .update({ ... })
  content = content.replace(/\.update\(\{\s*/g, ".update({ tenancy: active_tenancy, ");

  // Select: match string literals perfectly to avoid nested parens bug
  content = content.replace(/\.select\(\s*(['"`])([\s\S]*?)\1\s*\)/g, ".select($1$2$1)\n    .eq('tenancy', active_tenancy)");

  // Delete: .delete()
  content = content.replace(/\.delete\(\)/g, ".delete().eq('tenancy', active_tenancy)");

  fs.writeFileSync(filePath, content);
}
console.log('Done rewriting portal actions safely');
