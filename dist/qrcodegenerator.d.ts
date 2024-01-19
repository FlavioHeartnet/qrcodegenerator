export declare const imageTypes: {
    PNG: string;
    JPEG: string;
};
export declare class QRCodeGenerator {
    private urlToEncode;
    private outputPath;
    private qrCodeOptions;
    private apiKey;
    private publicImageURL;
    constructor(urlToEncode: string, outputPath: string);
    createQRCode(): Promise<void>;
    private createBuffer;
    uploadImage(): Promise<void>;
    getPublicUrl(): string;
    getOutputPath(): string;
}
