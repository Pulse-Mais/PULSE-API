import { ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IStorageService } from "../interfaces/IStorage-service";
import { Upload } from "@aws-sdk/lib-storage";


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

  public getPromise(archive: any, idTrailClass: string) {
    console.log('archivesss', archive)
    const params = {
      Bucket: this.bucketKey,
      Key: `${idTrailClass}/${archive.filename}`,
      Body: archive.buffer
    }

    return this.client.send(new PutObjectCommand(params))
  }

  public async teste(fileStream: any, filename: string) {


    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: this.bucketKey,
        Key: 'without-parallel-uploads/' + filename,
        Body: fileStream
      }
    });

    upload.on('httpUploadProgress', (progress) => {
      console.log(`Progress: ${progress.loaded}/${progress.total}`);
    });

    try {
      const result = await upload.done();
      console.log('Upload success', result);
      return result;
    } catch (error) {
      console.error('Upload failed', error);
    }
  }
}   