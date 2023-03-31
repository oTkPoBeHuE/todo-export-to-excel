function showProgress(current, total) {
    const percentage = Math.floor((current / total) * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: ${current}/${total} (${percentage}%)`);
}

module.exports = { showProgress };
