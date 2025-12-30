// parser.js

const fs = require('fs');
const path = require('path');

function parseXml(filePath) {
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser();
    const data = fs.readFileSync(filePath, 'utf8');
    parser.parseString(data, (err, result) => {
        if (err) {
            throw err;
        }
        return result;
    });
}

function parseJson(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

function getLatestFile(directory) {
    const files = fs.readdirSync(directory);
    const latestFile = files.reduce((latest, file) => {
        const stats = fs.statSync(path.join(directory, file));
        if (stats.mtimeMs > latest) {
            return file;
        }
        return latest;
    }, 0);
    return path.join(directory, latestFile);
}

module.exports = {
    parseXml,
    parseJson,
    getLatestFile
};