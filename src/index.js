const fs = require('fs');
const path = require('path');
const glob = require('glob');
const config = require('./config');
const parseFile = require('./utils/parseFile');
const findTodoFixme = require('./findTodoFixme');
const { showProgress } = require('./utils/progress');

async function main() {
    console.log('Scanning project directory...');

    const cwd = config.projectPath;
    const files = glob.sync(`{${config.patterns.join(',')}}`, { ignore: config.ignore, cwd });
    const todoFixmeList = [];

    console.log(`Found ${files.length} target files.`);

    for (const [index, file] of files.entries()) {
        const absoluteFilePath = path.join(cwd, file);
        const content = fs.readFileSync(absoluteFilePath, 'utf-8');
        const todoFixmeLines = await parseFile(file, content);
        todoFixmeList.push(...todoFixmeLines);

        showProgress(index + 1, files.length);
    }

    console.log(`\nFound ${todoFixmeList.length} TODO/FIXME items.`);

    if (todoFixmeList.length > 0) {
        await findTodoFixme(todoFixmeList);
    }
}

main().catch((error) => {
    console.error(`\nUnexpected error: ${error.message}`);
});

