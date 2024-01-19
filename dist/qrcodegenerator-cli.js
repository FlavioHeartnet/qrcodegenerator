"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
const axios_1 = require("axios");
const qr = require("qrcode");
const fs = require("fs");
const BlobUtil = require("blob-util");
const urlToEncode = readlineSync.question('Digite a URL que deseja tornar em QRCode: ');
const outputPath = "qrcode.png";
async function generateQRCode(url, outputPath) {
    try {
        const qrCodeOptions = {
            type: 'png',
            color: {
                dark: '#000000',
                light: '#ffffff'
            },
            width: 600,
            height: 600
        };
        await qr.toFile(outputPath, url, qrCodeOptions);
        const imageData = fs.readFileSync(outputPath);
        const imgBBAPIKey = '11eb9f6063ddd64a9d0c84b9e80ce125';
        const blob = BlobUtil.arrayBufferToBlob(imageData, 'image/png');
        const form = new FormData();
        form.append('image', blob, 'qrcode.png');
        const response = await axios_1.default.post('https://api.imgbb.com/1/upload?key=' + imgBBAPIKey, form);
        console.log(`QR code generated and saved to ${outputPath}`);
        const imageUrl = response.data.data.url;
        return imageUrl;
    }
    catch (error) {
        console.error('Error generating QR code:', error);
    }
}
(async () => {
    const imageUrl = await generateQRCode(urlToEncode, outputPath);
    if (imageUrl) {
        console.log(`Uploaded QR code image URL: ${imageUrl}`);
    }
})();
//# sourceMappingURL=qrcodegenerator-cli.js.map