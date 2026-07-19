const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = ['index.html', 'app.js', 'styles.css', 'sql_propuestas_ciudadanas.sql'];

const replacements = {
  '{{SUPABASE_URL}}': process.env.SUPABASE_URL || '',
  '{{SUPABASE_ANON_KEY}}': process.env.SUPABASE_ANON_KEY || ''
};

for (const file of files) {
  const src = path.join(__dirname, file);
  if (!fs.existsSync(src)) continue;
  let content = fs.readFileSync(src, 'utf8');
  for (const [placeholder, value] of Object.entries(replacements)) {
    content = content.split(placeholder).join(value);
  }
  fs.writeFileSync(path.join(outDir, file), content, 'utf8');
  console.log(`Built: ${file}`);
}

console.log('Build complete.');
