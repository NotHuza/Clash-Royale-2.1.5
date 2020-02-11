const fs = require('fs');

try{
    let contentPatchHash = fs.readFileSync('./Patchs/VERSION').toString().split("\r\n")[1];
    module.exports.contentPatchHash = contentPatchHash;
    let contentPatchVersion =fs.readFileSync('./Patchs/VERSION').toString().split("\r\n")[0];
    module.exports.contentPatchVersion = contentPatchVersion;
    let fingerprintData = fs.readFileSync(`./Patchs/${contentPatchHash}/fingerprint.json`).toString();
    module.exports.fingerprintData = fingerprintData;
    console.log(`We found a custom patch [${contentPatchHash} | ${contentPatchVersion}]`);
    require('./contentServer');
}
catch(err) {
    console.log('We didn\'t find a patch. Clients will not be patched', err);
}
