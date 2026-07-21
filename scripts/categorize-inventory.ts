import fs from 'fs';

const data = JSON.parse(fs.readFileSync('inventory-dump.json', 'utf-8'));

console.log('--- SUMMARY ---');
console.log('Brands:', data.brands.length, data.brands.map((b: any) => b.name).join(', '));
console.log('Router Models Count:', data.routerModelsCount);
console.log('IP Addresses Count:', data.ipAddressesCount);
console.log('Problems Count:', data.problemsCount);
console.log('Static Routes Count:', data.staticRoutesCount);

console.log('\n--- STATIC ROUTES CATEGORIZATION ---');
const categories: Record<string, string[]> = {
  brands: [],
  login: [],
  passwords: [],
  recovery: [],
  troubleshooting: [],
  networking_guides: [],
  tools: [],
  hubs: [],
  utilities: [],
  dns: [],
  gaming: [],
  other: []
};

for (const route of data.staticRoutes) {
  const r = route.toLowerCase();
  if (r.includes('default-password') || r.includes('router-password') || r.includes('admin-password') || r.includes('forgot-router-password')) {
    categories.passwords.push(route);
  } else if (r.includes('login') || r.includes('routerlogin') || r.includes('tplinkwifi') || r.includes('mywifiext') || r.includes('orbilogin')) {
    categories.login.push(route);
  } else if (r.includes('recovery') || r.includes('cannot-access') || r.includes('not-opening') || r.includes('not-loading')) {
    categories.recovery.push(route);
  } else if (r.includes('tool') || r.includes('checker') || r.includes('calculator') || r.includes('lookup') || r.includes('generator') || r.includes('test')) {
    categories.tools.push(route);
  } else if (r.includes('dns')) {
    categories.dns.push(route);
  } else if (r.includes('gaming') || r.includes('ping') || r.includes('jitter') || r.includes('lag') || r.includes('bufferbloat') || r.includes('nat-type') || r.includes('minecraft') || r.includes('ps5') || r.includes('xbox') || r.includes('cat6')) {
    categories.gaming.push(route);
  } else if (['/routers', '/ips', '/dns', '/problems', '/tools', '/router-login-hostnames', '/compare'].includes(route)) {
    categories.hubs.push(route);
  } else if (['/about', '/contact', '/disclaimer', '/privacy-policy', '/terms-of-service', '/editorial-policy', '/assistant', '/search', '/latest'].includes(route)) {
    categories.utilities.push(route);
  } else {
    categories.troubleshooting.push(route);
  }
}

for (const [cat, list] of Object.entries(categories)) {
  console.log(`\n=== Category: ${cat} (${list.length}) ===`);
  console.log(list.join('\n'));
}
