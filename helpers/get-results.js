const fetch = require('node-fetch');
const getTeamResults = require('./get-team-results');
const logger = require('../logger');
//const fs = require('mz/fs');
//const dir = require('./config').directory;


function getResults (tournamentId) {
    return fetch(`http://rating.chgk.info/api/tournaments/${tournamentId}/list.json`)
        .then(res => res.json())
        .then(list => {
            if (!list || list.length === 0) {
                //fs.closeSync(fs.openSync(`${dir}/${tournamentId}.csv`, 'w'));
                logger.info(`no list of teams available for #${tournamentId}`);
                return null;
            }
            logger.info(`got ${list.length} teams for #${tournamentId}`);

            const results = new Map(list.map(elem => ([elem.idteam, { name: elem.current_name }])));
            const getTeamsResults = [...results.keys()].map(teamId => getTeamResults(tournamentId, teamId));
            return Promise.all(getTeamsResults)
                .then(teamResults => {
                    if (teamResults.every(res => !res.results || res.results.length === 0)) {
                        //fs.closeSync(fs.openSync(`${dir}/${tournamentId}.csv`, 'w'));
                        logger.info(`no team results available for #${tournamentId}`);
                        return null;
                    }
                    logger.info(`fetched all team results for #${tournamentId}`);

                    teamResults.forEach(result => {
                        const newResult = Object.assign({}, results.get(result.teamId));
                        newResult.results = result.results;
                        results.set(result.teamId, newResult);
                    });
                    return results;
                })
                .catch(error => logger.error(`failed to get team results for ${tournamentId}: ${error}`));
        })
        .catch(error => logger.error(`failed to get list of teams for #${tournamentId}: ${error}`));
}

module.exports = getResults;
