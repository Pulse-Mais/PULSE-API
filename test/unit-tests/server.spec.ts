import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import 'dotenv/config';
import { expect, describe, it } from 'vitest';

describe("testando o S3", () => {
    
    const s3 = new S3Client({
        region: "us-east-1", 
        credentials: defaultProvider()
    });


    it('mostrar os buckets', async () => {
        
        let bucketData;
        try {
            const data = await s3.send(new ListBucketsCommand({}));
            bucketData = data.Buckets;
            console.log(bucketData)
            
        } catch (err) {
    
            console.error("AAAAAAAAAAAAAAAAAAAAAAAAAA", err);
        }

        
        expect(bucketData).toBeTruthy();
        expect(Array.isArray(bucketData)).toBe(true);

    });
});






