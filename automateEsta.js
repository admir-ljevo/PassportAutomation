const { chromium } = require('playwright');
const path = require('path');

(async () => {
  try {
    const browser = await chromium.launch({ headless: false });

    const page = await browser.newPage();

    await page.goto('https://esta.cbp.dhs.gov/');

    await page.click('text=Create New Application');
    await page.waitForSelector('.create-app-dropdown-menu');
    await page.click('.create-app-dropdown-menu li:nth-child(1) a');
    await page.click('#confirmBtn');
    await page.waitForNavigation();
    await page.locator('#border > div > div:nth-child(7) > label > span.mdl-radio__label.semibold').click();
    await page.waitForTimeout(1000);
    await page.locator('//*[@id="2collpaseTwoText"]/div[1]/label').click();
    await page.waitForTimeout(1000);
    await page.locator('body > app-root > div > app-disclaimer > div > app-form-nav > div > div.col-xs-6.col-sm-3.rtl-sm-pull-9 > button').click();
    await page.waitForTimeout(500);
    await page.locator('#uploadPassportModal > div > div > div.modal-footer > button').click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.waitForTimeout(2000);
    await page.locator('div > div > div.nCT2vQ397FZv7bp7nRFY > button:nth-child(2)').click();
    const fileChooser = await fileChooserPromise;
    const filePath = path.join(__dirname, 'assets', 'sample-passport.jpg');
    await fileChooser.setFiles(filePath);
    await page.waitForTimeout(5000);

    await page.click('#ocrSuccessModal > div > div > div.modal-footer > button.btn.btn-primary');

    await page.waitForSelector('#day_issueDate', { visible: true });
    await page.selectOption('#day_issueDate', '5');

    await page.waitForSelector('#month_issueDate', { visible: true });
    await page.selectOption('#month_issueDate', { value: '5' });

    await page.waitForSelector('#year_issueDate', { visible: true });
    await page.selectOption('#year_issueDate', { value: '2015' });

    await page.waitForSelector('#natIdNum', { visible: true });
    await page.fill('#natIdNum', '5050415');

    await page.waitForSelector('#birthCity', { visible: true });
    await page.fill('#birthCity', 'SEOUL');

    await page.waitForSelector('#birthCountry', { visible: true });
    await page.selectOption('#birthCountry', { value: 'KR' });

    await page.locator('#applicantForm > form > app-other-citizenship-section > div:nth-child(2) > div.col-xs-12 > div:nth-child(2) > label > span.mdl-radio__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click();

    await page.locator('#applicantForm > form > app-other-citizenship-section > div:nth-child(4) > div.col-xs-12 > div:nth-child(2) > label > span.mdl-radio__ripple-container.mdl-js-ripple-effect.mdl-ripple--center').click();

    const defaultEmail = 'your_default_email@example.com';
    await page.fill('#contactEmail', defaultEmail);
    await page.fill('#contactEmailConfirm', defaultEmail);

    const nextButtonSelector = '#applicantForm > form > app-form-nav > div > div.col-xs-6.col-sm-3.rtl-sm-pull-9 > button';
    await page.waitForSelector(nextButtonSelector, { state: 'visible' });
    await page.click(nextButtonSelector);

    console.log('Closing the browser...');
    // await browser.close();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
