import fs from 'fs';

const data = JSON.parse(fs.readFileSync('detailed-records.json', 'utf-8'));

console.log('--- BRANDS AND MODEL COUNTS ---');
const brandCounts: Record<string, number> = {};
for (const m of data.models) {
  const b = m.brand.name;
  brandCounts[b] = (brandCounts[b] || 0) + 1;
}
console.log(brandCounts);

console.log('\n--- MODELS LIST BY BRAND ---');
const modelsByBrand: Record<string, string[]> = {};
for (const m of data.models) {
  const b = m.brand.name;
  if (!modelsByBrand[b]) modelsByBrand[b] = [];
  modelsByBrand[b].push(m.name + ` (${m.slug})`);
}
for (const [b, list] of Object.entries(modelsByBrand)) {
  console.log(`Brand ${b} (${list.length}):`, list.join(', '));
}

console.log('\n--- IP ADDRESSES LIST ---');
console.log(data.ips.map((i: any) => `${i.address} (/ips/${i.slug})`).join(', '));

console.log('\n--- PROBLEMS BY CATEGORY ---');
const problemsByCat: Record<string, string[]> = {};
for (const p of data.problems) {
  const c = p.category;
  if (!problemsByCat[c]) problemsByCat[c] = [];
  problemsByCat[c].push(p.title + ` (/problems/${p.slug})`);
}
for (const [c, list] of Object.entries(problemsByCat)) {
  console.log(`Category ${c} (${list.length}):`);
  console.log('  ' + list.join('\n  '));
}
