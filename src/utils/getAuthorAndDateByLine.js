const git = require('simple-git');
const path = require('path');
const config = require('../config');

async function getAuthorAndDateByLine(filePath, lineNumber) {
    try {
        const gitRepo = git(config.projectPath); // Инициализируйте simple-git с путем к другому репозиторию
        const fullPath = path.join(config.projectPath, filePath);

        const blame = await gitRepo.raw(['blame', fullPath]);
        const blameLines = blame.split('\n');
        const lineBlame = blameLines[lineNumber - 1];

        if (lineBlame) {
            const authorMatch = lineBlame.match(/\((.+?)\s\d{4}-\d{2}-\d{2}/);
            const dateMatch = lineBlame.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/);

            return {
                author: authorMatch ? authorMatch[1] : null,
                date: dateMatch[0]?.split(' ')?.[0]
            };
        }
    } catch (error) {
        console.error(`Failed to get author and date for ${filePath}:${lineNumber}`);
        console.error(error);
    }
}

module.exports = getAuthorAndDateByLine;
