const fetch = require('node-fetch');
const getTeamResults = require('./get-team-results');


function getResults (tournamentId) {
    return fetch(`http://rating.chgk.info/api/tournaments/${tournamentId}/list.json`)
        .then(res => res.json())
        .then(list => {
            if (!list || list.length === 0) {
                return null;
            }

            const results = new Map(list.map(elem => ([elem.idteam, { name: elem.current_name }])));
            const getTeamsResults = [...results.keys()].map(teamId => getTeamResults(tournamentId, teamId));
            return Promise.all(getTeamsResults)
                .then(teamResults => {
                    if (teamResults.every(res => !res.results || res.results.length === 0)) {
                        return null;
                    }

                    teamResults.forEach(result => {
                        const newResult = Object.assign({}, results.get(result.teamId));
                        newResult.results = result.results;
                        results.set(result.teamId, newResult);
                    });
                    return results;
                });
        })
        .catch(error => error);
}

module.exports = getResults;
