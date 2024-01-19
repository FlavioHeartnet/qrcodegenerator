import axios from 'axios'
import * as qr from 'qrcode';
import * as fs from 'fs'
import * as BlobUtil from 'blob-util';

import { config } from './config';
export const imageTypes = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
}
export class QRCodeGenerator {
    private qrCodeOptions: qr.QRCodeToFileOptions = {
        type: 'png',
        color: {
          dark: '#000000',
          light: '#ffffff'
        },
        width: 600, // Set the width of the QR code
        height: 600 // Set the height of the QR code
      };
      private apiKey:string;
      private publicImageURL:string;

      constructor(private urlToEncode:string, private outputPath:string ){
        this.apiKey = config.apiKey;
      }
      async createQRCode(): Promise<void>{
        try{
            await qr.toFile(this.outputPath, this.urlToEncode, this.qrCodeOptions);
        }catch(err){
            throw err;
        }
      }

      private async createBuffer(){
        return fs.readFileSync(this.outputPath);
      }

       async uploadImage(): Promise<void>{
        try{
            const blob = BlobUtil.arrayBufferToBlob(await this.createBuffer(), 'image/png');
            const form = new FormData();
            form.append('image', blob, 'qrcode.png');
            const response = await axios.post('https://api.imgbb.com/1/upload?key='+this.apiKey,form);
            this.publicImageURL = response.data.data.url;
        }catch(err){
            throw err;
        }
        
      }

      getPublicUrl(){
        return this.publicImageURL;
      }

      getOutputPath(){
        return this.outputPath;
      }


}