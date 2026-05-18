const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('apps/web/src/app', function(file) {
  if (!file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace backgrounds
  content = content.replace(/bg-black\/90/g, 'bg-card');
  content = content.replace(/bg-black\/20/g, 'bg-secondary/80');
  content = content.replace(/bg-black\/10/g, 'bg-secondary');
  content = content.replace(/bg-black text-foreground/g, 'bg-primary text-primary-foreground');
  content = content.replace(/bg-black/g, 'bg-primary');
  
  fs.writeFileSync(file, content);
});

walkDir('apps/web/src/components', function(file) {
  if (!file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/bg-black\/90/g, 'bg-card');
  content = content.replace(/bg-black\/20/g, 'bg-secondary/80');
  content = content.replace(/bg-black\/10/g, 'bg-secondary');
  content = content.replace(/bg-black text-foreground/g, 'bg-primary text-primary-foreground');
  content = content.replace(/bg-black/g, 'bg-primary');
  fs.writeFileSync(file, content);
});
console.log('Done replacing strings.');
