const handleAuth = require('./auth_gui').handleAuth;
const printUsers = require('./1_test1').printUsers;

async function main() {
    await printUsers();
}

main();