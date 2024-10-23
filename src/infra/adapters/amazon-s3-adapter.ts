import { IStorageService } from "../../application/interfaces/IStorage-service";
import { HeadObjectCommand, PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import 'dotenv/config';

export class AmazonS3Adapter   {

    private readonly acesssKeyId: string = process.env.AWS_ACCESS_KEY_ID!;
    private readonly secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY!;
    private readonly region: string = process.env.AWS_REGION!;
    private readonly bucketKey: string = process.env.S3_BUCKET_KEY!;

    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

    private readonly client: S3Client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId: this.acesssKeyId,
          secretAccessKey: this.secretAccessKey
        }
    })

    async createTrailFolder(key: string): Promise<boolean> {
        try {
            await this.client.send(new PutObjectCommand({ Bucket: this.bucketKey, Key: key }))
            return true
        } catch (error) {
            console.log(error, "ERROR CRIANDO FOLDER");
            return false
        }
            
    }

    async createClassFolder(key: string): Promise<boolean> {
        try {
            await this.client.send(new PutObjectCommand({ Bucket: this.bucketKey, Key: key }))
            return true
        } catch (error) {
            return false
        }
    }

    async createContentFolder(key: string): Promise<boolean> {
        try {
            await this.client.send(new PutObjectCommand({ Bucket: this.bucketKey, Key: key }))
            return true
        } catch (error) {
            return false
        }
    }

    async verifyFolderAvailability(key: string): Promise<boolean> {
        try {
            await this.client.send(new HeadObjectCommand({ Bucket: this.bucketKey, Key: key }))
            return true
        } catch (error) {
            return false
        }
    }


    async getUrlForUploadArchiveContent(key: string): Promise<string> {
        
        const putObjectInput: PutObjectCommandInput = {
            Bucket: this.bucketKey,
            Key: key 
        }

        const command = new PutObjectCommand(putObjectInput);
        
        const url =' await getSignedUrl(this.client, command, { expiresIn: 3600 })';

        if (!url) throw new Error("Error ao criar url!");
        console.log(url, "URL NO STORAGE SERVICE");
        return url

    } 

    async deleteObject(): Promise<boolean> {
        return false
    }

    async listObjects(): Promise<boolean> {
        return false
    }



}