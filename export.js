const getListOfTournaments = require('./helpers/get-list-of-tournaments');
const getListOfExistingTournaments = require('./helpers/get-list-of-existing-tournaments');
const getResults = require('./helpers/get-results');
const exportToCSV = require('./helpers/export-to-csv');
const logger = require('./logger');
const config = require('./config');


function exportTournament(tournamentId) {
    logger.info(`exporting #${tournamentId}`);

    return Promise.resolve(getResults(tournamentId))
        .then(results => results && exportToCSV(results, tournamentId))
        .catch(error => logger.error(`failed to get results for #${tournamentId}: ${error}`));
}


function exportTournaments() {
    const dateFrom = new Date(new Date().setDate(new Date().getDate()-config.latestDaysToUpdate));
    logger.info(`exporting tournaments since ${dateFrom}`);

    Promise.all([getListOfExistingTournaments(), getListOfTournaments()])
        .then(lists => {
            const [existing, all] = lists;
            const filtered = all.filter(tournament =>
                config.tournamentTypes.includes(tournament.type_name) &&
                new Date(tournament.date_end) >= dateFrom &&
                new Date(tournament.date_end) <= new Date() &&
                (config.isForced || !existing.includes(tournament.idtournament)));

            logger.info(`${filtered.length} tournaments to export`);

            const exports = filtered.map((tournament, i) => new Promise((resolve, reject) => {
                setTimeout(() => {
                    logger.info(`${i+1} out of ${filtered.length}`);
                    resolve();
                    Promise.resolve(exportTournament(tournament.idtournament))
                        .then(resolve)
                        .catch(error => reject(`failed to export #${tournament.idtournament}: ${error}`));
                }, i*config.timeout)
            }));

            Promise.all(exports)
                .then(() => {
                    logger.info(`success`);
                    process.exit();
                })
                .catch(error => logger.error(`failed to export tournaments: ${error}`));
        })
        .catch(error => logger.error(`failed to get list of tournaments: ${error}`));
}


if (config.tournamentId) {
    exportTournament(config.tournamentId)
} else {
    exportTournaments();
}
