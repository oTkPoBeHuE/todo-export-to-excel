# TODO & FIXME Image Generator

This script generates images with code snippets for each TODO and FIXME comment in a given project and creates an Excel file with the generated images.

## How it works

The script scans the project files for TODO and FIXME comments, generates images with code snippets using the Carbon.now.sh website and Playwright, and creates an Excel file containing the images.

## Configuration

To use the script, you need to configure the following settings in the `config.js` file:

1. `projectPath`: The path to the root of your project.
2. `patterns`: An array of file patterns to search for TODO and FIXME comments.
3. `ignore`: An array of file patterns to ignore.
4. `outputFileExcel`: The name of the Excel file to be generated.
5. `imagesFolder`: The folder where the generated images will be stored. (Check .gitignore)
6. `linesAround`: The number of lines to include around the TODO or FIXME comment in the generated image.
7. `linesTop`: The number of lines to include above the found TODO or FIXME comment in the generated image.
8. `linesBottom`: The number of lines to include below the found TODO or FIXME comment in the generated image.

---

# TODO & FIXME Генератор Изображений

Данный скрипт генерирует изображения с фрагментами кода для каждого комментария TODO и FIXME в заданном проекте и создает файл Excel с сгенерированными изображениями.

## Как это работает

Скрипт сканирует файлы проекта на наличие комментариев TODO и FIXME, генерирует изображения с фрагментами кода с использованием сайта Carbon.now.sh и Playwright, и создает файл Excel с изображениями.

## Настройка

Чтобы использовать скрипт, вам нужно настроить следующие параметры в файле `config.js`:

1. `projectPath`: Путь к корню вашего проекта.
2. `patterns`: Массив шаблонов файлов для поиска комментариев TODO и FIXME.
3. `ignore`: Массив шаблонов файлов для игнорирования.
4. `outputFileExcel`: Имя генерируемого файла Excel.
5. `imagesFolder`: Папка, где сохраняются изображения. (Не забудь поправить .gitignore)
6. `linesTop`: Количество строк, которые будут включены сверху от найденного комментария TODO или FIXME в сгенерированном изображении.
7. `linesBottom`: Количество строк, которые будут включены снизу от найденного комментария TODO или FIXME в сгенерированном изображении.
