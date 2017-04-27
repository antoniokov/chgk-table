const stringify = require('csv-stringify');
var fs = require('fs');


function exportToCSV (results, filename) {
    const prepared = [...results.values()].map(result => [result.name, ...result.results]);
    prepared.unshift(['Команда', ...prepared[0].map((res, i) => i + 1)]);
    stringify(prepared, (error, data) => fs.writeFile(`csv/${filename}.csv`, data, 'utf8'));
}

module.exports = exportToCSV;
