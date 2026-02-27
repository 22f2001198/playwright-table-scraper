const { test, expect } = require('@playwright/test');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=22',
  'https://sanand0.github.io/tdsdata/js_table/?seed=23',
  'https://sanand0.github.io/tdsdata/js_table/?seed=24',
  'https://sanand0.github.io/tdsdata/js_table/?seed=25',
  'https://sanand0.github.io/tdsdata/js_table/?seed=26',
  'https://sanand0.github.io/tdsdata/js_table/?seed=27',
  'https://sanand0.github.io/tdsdata/js_table/?seed=28',
  'https://sanand0.github.io/tdsdata/js_table/?seed=29',
  'https://sanand0.github.io/tdsdata/js_table/?seed=30',
  'https://sanand0.github.io/tdsdata/js_table/?seed=31'
];

test('Scrape and sum all table numbers', async ({ page }) => {
  let totalSum = 0;

  for (const url of urls) {
    console.log(`Visiting: ${url}`);
    await page.goto(url);
    
    // Wait for tables to load (dynamic content)
    await page.waitForSelector('table');
    
    // Find all table cells and extract numbers
    const numbers = await page.$$eval('table td, table th', cells =>
      cells.flatMap(cell => {
        const text = cell.textContent.trim();
        const num = parseFloat(text);
        return isNaN(num) ? [] : [num];
      })
    );
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Page sum: ${pageSum}`);
    totalSum += pageSum;
  }
  
  console.log(`GRAND TOTAL SUM: ${totalSum}`);
});
