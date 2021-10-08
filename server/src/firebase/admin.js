var firebase = require('firebase-admin');

var serviceAccount = require('D://Cookr-Private-Key/cookr-project-key.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

module.exports = firebase;
