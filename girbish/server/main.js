const http = require('http');
const fs = require('fs');
const { BASE_DIR } = require('../constants');
const path = require('path');

const auth_path = path.join(BASE_DIR, 'auth.js');
const index_path = path.join(BASE_DIR, 'server', 'index.html');
const register_path = path.join(BASE_DIR, 'server', 'register.html');
const login_path = path.join(BASE_DIR, 'server', 'login.html');

const auth = require(auth_path);
const indexContent = fs.readFileSync(index_path, 'utf-8');
const registerContent = fs.readFileSync(register_path, 'utf-8');
const loginContent = fs.readFileSync(login_path, 'utf-8');




const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.end(indexContent);
    }
    else if (req.url === '/register' && req.method === 'GET') {
        res.end(registerContent);
    }
    else if (req.url === '/login' && req.method === 'GET') {
        res.end(loginContent);
    }
    else if (req.url === '/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = auth.parseBody(body);
            const result = auth.registerUser(username, password);
            if (result.status === 201){
                // Redirect to login page
                res.writeHead(302, { 'Location': '/login' });
                res.end();
            }
            else {
                res.end('Registration failed\nGo <a href="/register">back</a> and try again.');
            }
        });
    }
    else if (req.url === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = auth.parseBody(body);
            const result = auth.authenticateUser(username, password);
            if (result.status === 200) {
                res.end('Login successful\n');
            } else {
                res.end('Login failed\nGo <a href="/login">back</a> and try again.');
            }
        });
    }
    else {
        res.end('404 Not Found\n');
    }
});

server.listen(5000);