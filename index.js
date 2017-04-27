const getResults = require('./get-results');
const exportToCSV = require('./export-to-csv');


const tournamentId = 4193;

Promise.resolve(getResults(tournamentId))
    .then(results => exportToCSV(results, tournamentId));
