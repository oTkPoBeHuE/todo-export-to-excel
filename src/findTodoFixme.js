const fs = require('fs');
const path = require('path');
const glob = require('glob');
const config = require('./config');
const parseFile = require('./utils/parseFile');
const { showProgress } = require('./utils/progress');
const ExcelJS = require('exceljs');

async function findTodoFixme() {
    const cwd = config.projectPath;
    const files = glob.sync(`{${config.patterns.join(',')}}`, { ignore: config.ignore, cwd });

    const todoFixmeExcel = [];

    // Check if the images folder exists, create it if not
    // Проверка наличия папки "images", создание её, если отсутствует
    if (!fs.existsSync(config.imagesFolder)) {
        fs.mkdirSync(config.imagesFolder);
    }

    for (const [index, file] of files.entries()) {
        const absoluteFilePath = path.join(cwd, file);
        const content = fs.readFileSync(absoluteFilePath, 'utf-8');
        const result = await parseFile(file, content);
        if (result) {
            todoFixmeExcel.push(...result);
        }

        showProgress(index + 1, files.length);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('TODO_FIXME');
    worksheet.columns = [
        { header: 'Image', key: 'image', width: 90 },
        { header: 'File Name', key: 'filename', width: 100 },
        { header: 'Line Number', key: 'lineNumber', width: 10 },
        { header: 'Text', key: 'text', width: 30 },
    ];

    // Set word wrap for the 4th column
    // Установка переноса слов для 4-й колонки
    worksheet.getColumn(4).alignment = { wrapText: true };

    for (const item of todoFixmeExcel) {
        const row = worksheet.addRow({
            filename: item.filename,
            lineNumber: item.lineNumber,
            text: item.text,
        });
        // Set row height
        // Устанавливаем высоту строки
        row.height = 230;
        // Align cell content to the center
        // Выравнивание содержимого ячеек по центру
        row.eachCell((cell) => {
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        // Blue border for all cells in the first column
        // Голубая обводка для всех ячеек первой колонки
        worksheet.eachRow({ includeEmpty: true }, (row, rowNum) => {
            const firstCell = row.getCell(1);
            firstCell.border = {
                top: { style: 'thin', color: { argb: '0070C0' } },
                left: { style: 'thin', color: { argb: '0070C0' } },
                bottom: { style: 'thin', color: { argb: '0070C0' } },
                right: { style: 'thin', color: { argb: '0070C0' } },
            };
        });

        const imageId = workbook.addImage({
            filename: item.image,
            extension: 'png',
        });
        worksheet.addImage(imageId, {
            tl: { col: 0, row: row.number - 1 },
            br: { col: 1, row: row.number },
            editAs: 'oneCell',
        });
    }

    await workbook.xlsx
        .writeFile(config.outputFileExcel)
        .then(() => {
            console.log(`\nExcel file with TODO and FIXME created: ${config.outputFileExcel}`);
        })
        .catch((error) => {
            console.error(`\nError creating Excel file: ${error.message}`);
        });
}

module.exports = findTodoFixme;


