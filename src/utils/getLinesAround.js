function getLinesAround(lines, index, linesTop, linesBottom) {
    const start = Math.max(index - linesTop, 0);
    const end = Math.min(index + linesBottom + 1, lines.length);

    const result = [];
    for (let i = start; i < end; i++) {
        if (i === index) {
            result.push(`> ${lines[i]}`);
        } else {
            result.push(lines[i]);
        }
    }

    return result;
}

module.exports = getLinesAround;
