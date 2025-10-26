
const fs = require('fs');
const hash = require('crypto')
const path = require('path');
const { json } = require('stream/consumers');

const db_path = path.join(__dirname, 'users.json');


function registerUser(username, password) {
    // write in a json file
    const hashedPassword = hash.createHash('sha256').update(password).digest('hex');
    const userData = { username, password: hashedPassword };
    const data = fs.readFileSync(db_path, 'utf-8');
    const existingUsers = JSON.parse(data || '[]');
    existingUsers.push(userData);
    fs.writeFileSync(db_path, JSON.stringify(existingUsers));
    return ({ message: 'User registered successfully', status: 201 });
}


function authenticateUser(username, password) {
    const data = fs.readFileSync(db_path, 'utf-8');
    const existingUsers = JSON.parse(data || '[]');
    const hashedPassword = hash.createHash('sha256').update(password).digest('hex');
    const user = existingUsers.find(user => user.username === username);
    if (user && user.password === hashedPassword) {
        return ({ message: 'User authenticated successfully', status: 200 });
    } else {
        return ({ message: 'Authentication failed', status: 401 });
    }
}

function deleteUserAuthorized(username, password) {
    const data = fs.readFileSync(db_path, 'utf-8');
    const existingUsers = JSON.parse(data || '[]');
    const hashedPassword = hash.createHash('sha256').update(password).digest('hex');
    const userIndex = existingUsers.findIndex(user => user.username === username);
    if (userIndex !== -1 && existingUsers[userIndex].password === hashedPassword) {
        existingUsers.splice(userIndex, 1); 
        fs.writeFileSync(db_path, JSON.stringify(existingUsers));
        return ({ message: 'User deleted successfully', status: 200 });
    } else {
        return ({ message: 'User deletion failed', status: 401 });
    }
}

function parseBody(body) {
    const params = new URLSearchParams(body);
    if (!params.has('username') || !params.has('password')) {
        console.log('Missing parameters');
        return { username: "", password: "" };
    }
    
    console.log('Parsed body:', {
        username: params.get('username'),
        password: params.get('password')
    });
    return {
        
        username: params.get('username'),
        password: params.get('password')
    };
}

module.exports = {
    registerUser,
    authenticateUser,
    deleteUserAuthorized,
    parseBody
};
