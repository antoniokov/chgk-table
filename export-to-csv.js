const stringify = require('csv-stringify');
const fs = require('mz/fs');
const dir = require('./config').directory;


function exportToCSV (results, tournamentId) {
    const prepared = [...results.values()].map(result => [result.name, ...result.results]);
    prepared.unshift(['Команда', ...prepared[0].slice(1).map((res, i) => i + 1)]);
    stringify(prepared, (error, data) => fs.writeFile(`${dir}/${tournamentId}.csv`, data, 'utf8'));
}

module.exports = exportToCSV;
