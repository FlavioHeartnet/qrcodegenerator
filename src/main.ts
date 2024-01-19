import { QRCodeGenerator } from "./qrcodegenerator";
import * as readlineSync from 'readline-sync';
export async function main(){
    const urlToEncode = readlineSync.question('Digite a URL que deseja tornar em QRCode: ');
    const outputPath = "qrcode.png";
    const qrcodegenerator = new QRCodeGenerator(urlToEncode, outputPath);
    qrcodegenerator.createQRCode();
    console.log('QRCode created successfully!');
    console.log('File path:', outputPath);

    const isUpload:string = readlineSync.question('Do you want to upload the QRCode to a server? (y/n): ');
    if(isUpload.toLowerCase() === 'y'){
        console.log('Uploading QRCode to server...');
        await qrcodegenerator.uploadImage();
        console.log('QRCode uploaded successfully!');
        console.log('Link to QRCode:', qrcodegenerator.getPublicUrl());
    }
}

main();