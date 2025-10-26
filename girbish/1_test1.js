const { readFile, writeFile } = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, 'users.json');

async function printUsers() {
    readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading users file:', err);
            return;
        }
        try {
            const users = JSON.parse(data || '[]');
            console.log('Registered Users:', users);
        } catch (parseErr) {
            console.error('Error parsing users data:', parseErr);
        }
    });
}

module.exports = {
    printUsers
};