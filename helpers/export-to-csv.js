const stringify = require('csv-stringify');
const fs = require('mz/fs');
const dir = require('../config').directory;
const logger = require('../logger');


function exportToCSV (results, tournamentId) {
    if(!results || results.size === 0) {
        logger.warn(`no results to save for #${tournamentId}`);
        return null;
    }

    const prepared = [...results.values()].map(result => [result.name, ...result.results]);
    prepared.unshift(['Команда', ...prepared[0].slice(1).map((res, i) => i + 1)]);

    return new Promise((resolve, reject) => {
        stringify(prepared, (error, csv) => {
            if (error) {
                reject(error);
            }

            fs.writeFile(`${dir}/${tournamentId}.csv`, csv, 'utf8')
                .then(() => {
                    logger.info(`saved as ${tournamentId}.csv`);
                    resolve();
                })
                .catch(error => reject(error));
        })
    });
}

module.exports = exportToCSV;
