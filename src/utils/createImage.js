// Connecting necessary libraries
// Подключение необходимых библиотек
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { chromium } = require('playwright');

/**
 * Create an image with syntax highlighting
 * Создание изображения с подсветкой синтаксиса
 */
async function createImage(code, fileLanguage, imageName, forceCreate = false) {
    const imagePath = path.join(config.imagesFolder, imageName);

    if (fs.existsSync(imagePath) && !forceCreate) {
        return imagePath;
    }

    const tempFilePath = `temp.${fileLanguage}`;

    try {
        // Saving code to a temporary file with an extension corresponding to the language
        // Сохранение кода во временный файл с расширением, соответствующим языку
        await fs.promises.writeFile(tempFilePath, code);

        // Creating an image using Playwright and Carbon.now.sh
        // Создание изображения с помощью Playwright и Carbon.now.sh
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1024, height: 768 });

        await page.goto('https://carbon.now.sh', { waitUntil: 'networkidle' });

        // Loading code into Carbon
        // Загрузка кода в Carbon
        await page.$('.CodeMirror-code');
        await page.evaluate((code) => {
            const cm = document.querySelector('.CodeMirror').CodeMirror;
            cm.setValue(code);
        }, code);

        // Setting the programming language
        // Установка языка программирования
        await page.click('input[aria-labelledby="language-dropdown"]');
        await page.type('input[aria-labelledby="language-dropdown"]', fileLanguage);
        await page.keyboard.press('Enter');

        // Screenshot of the Carbon area
        // Скриншот области Carbon
        const carbonElement = await page.$('.CodeMirror-code');
        await carbonElement.screenshot({ path: imagePath, omitBackground: true });

        await browser.close();
    } catch (error) {
        console.error(`An error occurred while creating the image: ${error.message}`);
        console.error(`Произошла ошибка при создании изображения: ${error.message}`);
    } finally {
        // Deleting the temporary file
        // Удаление временного файла
        await fs.promises.unlink(tempFilePath).catch((error) => {
            console.error(`An error occurred while deleting the temporary file: ${error.message}`);
            console.error(`Произошла ошибка при удалении временного файла: ${error.message}`);
        });
    }

    return imagePath;
}

module.exports = createImage;
