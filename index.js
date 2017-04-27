const getListOfTournaments = require('./get-list-of-tournaments');
const getListOfExistingTournaments = require('./get-list-of-existing-tournaments');
const getResults = require('./get-results');
const exportToCSV = require('./export-to-csv');


function exportTournament(tournamentId) {
    console.log(`Exporting #${tournamentId}`);

    return Promise.resolve(getResults(tournamentId))
        .then(results => results && exportToCSV(results, tournamentId))
        .catch(error => console.log(tournamentId, error));
}


function exportTournaments(isForced) {
    Promise.all([getListOfExistingTournaments(), getListOfTournaments()])
        .then(lists => {
            const [existing, all] = lists;
            const filtered = all.filter(tournament => tournament.type_name === 'Обычный' &&
                                                      new Date(tournament.date_end) <= new Date() &&
                                                      (isForced || !existing.includes(tournament.idtournament)));
            filtered.forEach((tournament, i) => setTimeout(() => exportTournament(tournament.idtournament), i*1000));
        });
}

exportTournaments(true);
//exportTournament(3807);
