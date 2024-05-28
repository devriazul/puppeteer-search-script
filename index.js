const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com');

    // Type a search query
    await page.type('input[name="q"]', 'Puppeteer');
    await page.keyboard.press('Enter');
    
    // Wait for the results page to load and display the results
    await page.waitForSelector('h3');

    // Extract the results from the page
    const results = await page.evaluate(() => {
        const anchors = Array.from(document.querySelectorAll('h3'));
        return anchors.map(anchor => anchor.textContent);
    });

    console.log(results);

    await browser.close();
})();
