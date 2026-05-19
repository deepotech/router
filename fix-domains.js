const fs = require('fs');
const path = require('path');
const srcDir = path.join(process.cwd(), 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  content = content.replace(/NetDoctor AI/g, 'RouterVia');
  content = content.replace(/NetDoctor/g, 'RouterVia');
  content = content.replace(/netdoctor\.ai/g, 'routervia.com');
  content = content.replace(/www\.netdoctorai\.com/g, 'routervia.com');
  content = content.replace(/netdoctorai\.com/g, 'routervia.com');
  content = content.replace(/netdoctorai/g, 'routervia');
  
  // Specific localhost replacements
  if (f.includes('audit-crawl.ts') || f.includes('audit-extraction.ts')) {
    content = content.replace(/http:\/\/localhost:3000/g, 'https://routervia.com');
  }
  if (f.includes('observability\\\\page.tsx') || f.includes('observability/page.tsx')) {
    content = content.replace(/'http:\/\/localhost:3000\/api\/observability'/g, '`${process.env.NEXT_PUBLIC_APP_URL || "https://routervia.com"}/api/observability`');
  }

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Updated: ' + f);
  }
});
