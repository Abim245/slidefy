import fs from 'fs'

const html = fs.readFileSync('dist/index.html', 'utf8')

const fixed = html
  .replaceAll('src="/assets/', 'src="assets/')
  .replaceAll('href="/assets/', 'href="assets/')

fs.writeFileSync('dist/index.html', fixed)

console.log('done:', fixed.includes('/assets/'))