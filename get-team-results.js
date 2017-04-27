const fetch = require('node-fetch');


function getTeamResults (tournamentId, teamId) {
    return fetch(`http://rating.chgk.info/api/tournaments/${tournamentId}/results/${teamId}.json`)
        .then(res => res.json())
        .then(tours => {
            return {
                teamId: teamId,
                results: [].concat(...tours.map(tour => tour.mask.map(result => Number.parseInt(result, 10))))
            };
        });
}

module.exports = getTeamResults;
