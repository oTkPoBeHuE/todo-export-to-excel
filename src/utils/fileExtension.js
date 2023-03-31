function getFileLanguage(filePath) {
    const extension = filePath.split('.').pop();

    switch (extension) {
        case 'js':
            return 'javascript';
        case 'ts':
            return 'typescript';
        case 'jsx':
            return 'jsx';
        case 'tsx':
            return 'tsx';
        case 'css':
            return 'css';
        default:
            return '';
    }
}

module.exports = { getFileLanguage };
