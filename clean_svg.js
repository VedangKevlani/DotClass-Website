import fs from 'fs';

try {
  let svg = fs.readFileSync('public/dotclasslogo.svg', 'utf8');
  
  const badColors = ['FEFEFE', 'FDFDFD', 'FAFCFB', 'F8FBFA', 'FCFDFD', 'EEF7F2', 'EAF5EE', 'D9ECE1', 'ECEFED', 'F3F8F5'];
  
  const lines = svg.split('\n');
  let filtered = [];
  let skipMode = false;
  
  for (let line of lines) {
    if (line.includes('<path fill="#') && badColors.some(c => line.includes(c))) {
       skipMode = true;
       continue;
    }
    if (skipMode && line.includes('z"/>')) {
       skipMode = false;
       continue;
    }
    if (skipMode) continue;
    filtered.push(line);
  }
  
  fs.writeFileSync('public/dotclasslogo.svg', filtered.join('\n'));
  console.log('SVG Cleaned successfully');
} catch (e) {
  console.error(e);
}
