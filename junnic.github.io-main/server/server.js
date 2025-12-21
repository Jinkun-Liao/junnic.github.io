// Simple Express server with basic auth for protected notes
const express = require('express');
const basicAuth = require('basic-auth');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, '..')));

// Protect /notes/secure/* with Basic Auth
const USER = process.env.NOTES_USER || 'user';
const PASS = process.env.NOTES_PASS || 'pass123';

function authMiddleware(req, res, next){
  if(!req.path.startsWith('/notes/secure/')) return next();
  const creds = basicAuth(req);
  if(!creds || creds.name !== USER || creds.pass !== PASS){
    res.set('WWW-Authenticate', 'Basic realm="Protected Notes"');
    return res.status(401).send('Authentication required');
  }
  next();
}

app.use(authMiddleware);

app.listen(PORT, () => {
  console.log(`Notes server running at http://localhost:${PORT}`);
  console.log('Protected path: /notes/secure/');
});
