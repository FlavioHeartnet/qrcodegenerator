"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QRCodeGenerator = exports.imageTypes = void 0;
const axios_1 = require("axios");
const qr = require("qrcode");
const fs = require("fs");
const BlobUtil = require("blob-util");
const config_1 = require("./config");
exports.imageTypes = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
};
class QRCodeGenerator {
    constructor(urlToEncode, outputPath) {
        this.urlToEncode = urlToEncode;
        this.outputPath = outputPath;
        this.qrCodeOptions = {
            type: 'png',
            color: {
                dark: '#000000',
                light: '#ffffff'
            },
            width: 600,
            height: 600
        };
        this.apiKey = config_1.config.apiKey;
    }
    async createQRCode() {
        try {
            await qr.toFile(this.outputPath, this.urlToEncode, this.qrCodeOptions);
        }
        catch (err) {
            throw err;
        }
    }
    async createBuffer() {
        return fs.readFileSync(this.outputPath);
    }
    async uploadImage() {
        try {
            const blob = BlobUtil.arrayBufferToBlob(await this.createBuffer(), 'image/png');
            const form = new FormData();
            form.append('image', blob, 'qrcode.png');
            const response = await axios_1.default.post('https://api.imgbb.com/1/upload?key=' + this.apiKey, form);
            this.publicImageURL = response.data.data.url;
        }
        catch (err) {
            throw err;
        }
    }
    getPublicUrl() {
        return this.publicImageURL;
    }
    getOutputPath() {
        return this.outputPath;
    }
}
exports.QRCodeGenerator = QRCodeGenerator;
//# sourceMappingURL=qrcodegenerator.js.map