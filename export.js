const getListOfTournaments = require('./helpers/get-list-of-tournaments');
const getListOfExistingTournaments = require('./helpers/get-list-of-existing-tournaments');
const getResults = require('./helpers/get-results');
const exportToCSV = require('./helpers/export-to-csv');
const logger = require('./logger');

const latestDaysToUpdate = require('./config').latestDaysToUpdate || 30;


function exportTournament(tournamentId) {
    logger.info(`exporting #${tournamentId}`);

    return Promise.resolve(getResults(tournamentId))
        .then(results => results && exportToCSV(results, tournamentId))
        .catch(error => logger.error(`failed to get results for #${tournamentId}: ${error}`));
}


function exportTournaments(isForced = false) {
    const dateFrom = new Date(new Date().setDate(new Date().getDate()-latestDaysToUpdate));
    logger.info(`exporting tournaments since ${dateFrom}`);

    Promise.all([getListOfExistingTournaments(), getListOfTournaments()])
        .then(lists => {
            const [existing, all] = lists;
            const filtered = all.filter(tournament => tournament.type_name === 'Обычный' &&
                                                      new Date(tournament.date_end) <= new Date() &&
                                                      new Date(tournament.date_end) >= dateFrom &&
                                                      (isForced || !existing.includes(tournament.idtournament)));
            logger.info(`${filtered.length} tournaments to export`);

            filtered.forEach((tournament, i) => setTimeout(() => exportTournament(tournament.idtournament), i*1000));
        })
        .catch(error => logger.error(`failed to get list of tournaments: ${error}`));
}

exportTournaments();
//exportTournament(1908);
