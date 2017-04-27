const fetch = require('node-fetch');



const url = `http://rating.chgk.info/api/tournaments.json`;

function getListOfTournaments () {
    const list = [];

    return fetch(url)
        .then(res => res.json())
        .then(firstPage => {
            list.push(...firstPage.items);
            const pages = Math.floor(firstPage.total_items/1000) + 1;
            const fetches = [...new Array(pages).keys()].map(i => fetch(`${url}?page=${i+1}`));

            return Promise.all(fetches)
                .then(responses => Promise.all(responses.map(res => res.json())))
                .then(pages => {
                    pages.forEach(page => list.push(...page.items));
                    return list;
                });
        });
}

module.exports = getListOfTournaments;
