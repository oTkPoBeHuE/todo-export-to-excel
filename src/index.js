const fs = require('fs');
const path = require('path');
const glob = require('glob');
const config = require('./config');
const parseFile = require('./utils/parseFile');
const findTodoFixme = require('./findTodoFixme');
const { showProgress } = require('./utils/progress');

async function main() {
    await findTodoFixme();
}

main().catch((error) => {
    console.error(`\nUnexpected error: ${error.message}`);
});

