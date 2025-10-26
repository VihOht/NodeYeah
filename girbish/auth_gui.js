const auth = require('./auth');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});




// Simple CLI for user registration and authentication
function handleAuth() {
    rl.question('Do you want to (1) Register or (2), Authenticate? (3) Delete User', (choice) => {
        if (choice === '1') {
            rl.question('Enter username: ', (username) => {
                rl.question('Enter password: ', (password) => {
                    auth.registerUser(username, password);
                    rl.close();
                })
            })
        } else if (choice === '2') {
            rl.question('Enter username: ', (username) => {
                rl.question('Enter password: ', (password) => {
                    auth.authenticateUser(username, password);
                    rl.close();
                })
            })
        } else if (choice === '3') {
            rl.question('Enter username: ', (username) => {
                rl.question('Enter password: ', (password) => {
                    auth.deleteUserAuthorized(username, password);
                    rl.close();
                })
            })
        } else {
            console.log('Invalid choice');
            rl.close();
        }
        
    });    

    rl.on('close', () => {
        console.log('Exiting...');
});    
}

module.exports = {
    handleAuth
}