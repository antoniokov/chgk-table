const fs = require('mz/fs');
const dir = require('../config').directory;


function getListOfExistingFiles() {
    return fs.readdir(dir)
        .then(list => list.map(filename => filename.replace('.csv', '')));
}

module.exports = getListOfExistingFiles;
