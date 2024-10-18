import { ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IStorageService } from "../interfaces/IStorage-service";

 

export class S3storageService implements IStorageService {
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
    
    constructor() { }

    public getPromise(archive: ArchiveContentItem) {
        const params = {
            Bucket: this.bucketKey,
            Key: `${archive.idClassOrActivity}/${archive.content.title}.${archive.content.extension}`,  
            Body: archive.content.binary 
          }

        return this.client.send(new PutObjectCommand(params))
    }
}   