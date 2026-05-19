const fs = require('fs');
const path = require('path');
const dir = './src/server/services';

fs.readdirSync(dir).forEach(file => {
  const p = path.join(dir, file);
  if(p.endsWith('.ts')) {
    let content = fs.readFileSync(p, 'utf8');
    if(content.includes('\\`') || content.includes('\\${')) {
      content = content.replace(/\\`/g, '`');
      content = content.replace(/\\\${/g, '${');
      fs.writeFileSync(p, content);
      console.log('Fixed', p);
    }
  }
});
