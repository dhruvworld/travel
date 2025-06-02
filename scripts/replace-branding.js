// scripts/replace-branding.js
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

console.log('🚀 Running Branding + Layout Fix Script...\n');

const patterns = [
  'app/**/Footer.{tsx,js}',
  'app/**/HeroSection.{tsx,js}',
];

const replacements = [
  {
    pattern: /Your trusted partner for memorable travel experiences across India\./gi,
    replacement: 'Your trusted partner for unforgettable journeys across India.',
  },
  {
    pattern: /Explore the World with(.|\n)*?Shubham Tours<\/span>/gi,
    replacement: 'Explore the World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Shubham Tours</span>',
  },
  {
    pattern: /className="([^"]*?)text-gray-300([^"]*?)"/gi,
    replacement: 'className="$1text-white$2"',
  },
];

let updatedCount = 0;

const run = async () => {
  const files = await glob(patterns, { nodir: true });

  if (files.length === 0) {
    console.log('❌ No matching component files found.');
    return;
  }

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    let updated = original;

    replacements.forEach(({ pattern, replacement }) => {
      updated = updated.replace(pattern, replacement);
    });

    if (updated !== original) {
      fs.writeFileSync(file, updated);
      console.log(`✅ Updated: ${file}`);
      updatedCount++;
    } else {
      console.log(`⏭️ Skipped (no change): ${file}`);
    }
  }

  console.log(`\n✅ All operations completed.`);
  console.log(`Files updated: ${updatedCount} of ${files.length}`);
};

run();
