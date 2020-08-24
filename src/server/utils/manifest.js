const fs = require('fs');

let manifest = null;
const manifestFilePath = `${__dirname}/../../../build/manifest.json`;

module.exports = function getManifest() {
  if (manifest === null) {
    manifest = JSON.parse(fs.readFileSync(manifestFilePath).toString());
  }
  return { ...manifest };
};
