"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const qrcodegenerator_1 = require("./qrcodegenerator");
const readlineSync = require("readline-sync");
function main() {
    const urlToEncode = readlineSync.question('Digite a URL que deseja tornar em QRCode: ');
    const outputPath = "qrcode.png";
    const qrcodegenerator = new qrcodegenerator_1.QRCodeGenerator(urlToEncode, outputPath);
    qrcodegenerator.createQRCode();
    console.log('QRCode created successfully!');
    console.log('File path:', outputPath);
    const isUpload = readlineSync.question('Do you want to upload the QRCode to a server? (y/n): ');
    if (isUpload.toLowerCase() === 'y') {
        console.log('Uploading QRCode to server...');
        qrcodegenerator.uploadImage();
        console.log('QRCode uploaded successfully!');
        console.log('Link to QRCode:', qrcodegenerator.getPublicUrl());
    }
}
exports.main = main;
main();
//# sourceMappingURL=main.js.map