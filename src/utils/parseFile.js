const config = require('../config');
const getLinesAround = require('./getLinesAround');
const { getFileLanguage } = require('./fileExtension');
const createImage = require('./createImage');
const path = require('path');
const getAuthorAndDateByLine = require('./getAuthorAndDateByLine');



// Функция для парсинга файлов и извлечения информации о комментариях с TODO, FIXME
// Function for parsing files and extracting information about TODO, FIXME comments
async function parseFile(filePath, content) {
    const lines = content.split('\n');
    const todoFixmeLines = [];
    const fileLanguage = getFileLanguage(filePath);
    // Регулярное выражение для поиска TODO и FIXME
    // Regular expression for finding TODO and FIXME
    const regex = /\b(TODO|FIXME|HACK|NOTE|todo|fixme)\b/;

    for (const [index, line] of lines.entries()) {
        const match = line.match(regex);

        if (match) {
            const lineNumber = index + 1;
            const commentIndex = match.index;
            const commentText = line.substring(commentIndex).trim().replace(/"/g, '""');
            const linesAround = getLinesAround(lines, index, config.linesTop, config.linesBottom);
            const codeBlock = linesAround.join('\n');

            const imageName = `${filePath.replace(/[^\w\d]/g, '_')}_${lineNumber}.png`;
            try {
                await createImage(codeBlock, fileLanguage, imageName);
                const absoluteImagePath = path.resolve(config.imagesFolder, imageName);

                const authorAndDate = await getAuthorAndDateByLine(filePath, lineNumber);
                todoFixmeLines.push({
                    filename: filePath,
                    lineNumber: lineNumber,
                    text: commentText,
                    image: absoluteImagePath,
                    author: authorAndDate?.author,
                    date: authorAndDate?.date
                });
            } catch (error) {
                // Ошибка при создании изображения
                // Error while creating image
                console.error(`Failed to create image for ${filePath}:${lineNumber}`);
                console.error(error);
            }
        }
    }

    return todoFixmeLines;
}

module.exports = parseFile;
