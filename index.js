const { google } = require('googleapis');
const fs = require('fs');

const credentials = require('./credentials.json');

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
];

const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: 'v3', auth });


(async function () {

  let res = await new Promise((resolve, reject) => {
    drive.files.list({
      pageSize: 500,
      fields: 'files(name, webViewLink)',
      orderBy: 'createdTime desc'
    }, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  let data = 'Name,URL\n';

  res.data.files.map(entry => {
    const { name, webViewLink } = entry;
    data += `${name},${webViewLink}\n`;
  });

  fs.writeFile('data.html', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

})()