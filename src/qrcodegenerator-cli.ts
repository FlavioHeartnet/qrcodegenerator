import * as readlineSync from 'readline-sync';
import axios from 'axios'
import * as qr from 'qrcode';
import * as fs from 'fs'
import * as BlobUtil from 'blob-util';

// Get URL and output file path from parsed arguments
const urlToEncode = readlineSync.question('Digite a URL que deseja tornar em QRCode: ')
const outputPath = "qrcode.png";

async function generateQRCode(url: string, outputPath: string): Promise<string> {
  try {
    const qrCodeOptions: qr.QRCodeToFileOptions = {
      type: 'png',
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      width: 600, // Set the width of the QR code
      height: 600 // Set the height of the QR code
    };

    await qr.toFile(outputPath, url, qrCodeOptions);

    const imageData = fs.readFileSync(outputPath);

    // Upload the image to imgBB using API
    const imgBBAPIKey = '11eb9f6063ddd64a9d0c84b9e80ce125';
    const blob = BlobUtil.arrayBufferToBlob(imageData, 'image/png');
    const form = new FormData();
    form.append('image', blob, 'qrcode.png');
    const response = await axios.post('https://api.imgbb.com/1/upload?key='+imgBBAPIKey,form);
    console.log(`QR code generated and saved to ${outputPath}`);
    const imageUrl = response.data.data.url;
    return imageUrl;

   

  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}

(async () => {
  // Call the function with provided URL and output path
  const imageUrl = await generateQRCode(urlToEncode, outputPath);

  if (imageUrl) {
    console.log(`Uploaded QR code image URL: ${imageUrl}`);
  }
})();
