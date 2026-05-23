const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('apps/web/src/app/(platform)/student', function(file) {
  if (!file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace backgrounds and borders
  content = content.replace(/bg-black\/40/g, 'bg-card');
  content = content.replace(/bg-black\/50/g, 'bg-muted/50');
  content = content.replace(/bg-black\/60/g, 'bg-accent');
  content = content.replace(/bg-white\/5/g, 'bg-secondary/50');
  content = content.replace(/bg-white\/10/g, 'bg-secondary');
  content = content.replace(/bg-white\/20/g, 'bg-secondary/80');
  
  content = content.replace(/border-white\/5/g, 'border-border');
  content = content.replace(/border-white\/10/g, 'border-border');
  content = content.replace(/border-white\/20/g, 'border-border');
  content = content.replace(/border-white\/30/g, 'border-border/60');
  
  content = content.replace(/backdrop-blur-2xl/g, '');
  content = content.replace(/backdrop-blur-xl/g, '');
  content = content.replace(/backdrop-blur-md/g, '');
  
  // Replace shadows
  content = content.replace(/shadow-2xl/g, 'shadow-sm');
  content = content.replace(/shadow-xl/g, 'shadow-sm');
  content = content.replace(/shadow-inner/g, '');
  content = content.replace(/shadow-\[.*?\]/g, '');
  
  // Replace text colors
  content = content.replace(/text-gray-200/g, 'text-muted-foreground');
  content = content.replace(/text-gray-300/g, 'text-muted-foreground');
  content = content.replace(/text-gray-400/g, 'text-muted-foreground');
  content = content.replace(/text-gray-500/g, 'text-muted-foreground');
  content = content.replace(/text-gray-600/g, 'text-muted-foreground');
  
  // Replace rounded borders from extreme 3xl
  content = content.replace(/rounded-3xl/g, 'rounded-xl');
  content = content.replace(/rounded-2xl/g, 'rounded-xl');
  
  // Custom button styling reverts
  content = content.replace(/bg-white text-black hover:bg-gray-200/g, 'bg-primary text-primary-foreground hover:bg-primary/90');
  content = content.replace(/text-white/g, 'text-foreground');
  content = content.replace(/text-black/g, 'text-foreground');

  // Fix multiple spaces
  content = content.replace(/ +/g, ' ');
  content = content.replace(/ className=" "/g, ' ');
  content = content.replace(/ className=""/g, '');
  content = content.replace(/  +/g, ' ');
  
  fs.writeFileSync(file, content);
});
console.log('Done replacing strings.');
