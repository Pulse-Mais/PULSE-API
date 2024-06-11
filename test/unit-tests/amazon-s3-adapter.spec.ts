import { AmazonS3Adapter } from "../../src/infra/adapters/amazon-s3-adapter"


describe("Amazon S3 Adapter test client", () => {
    
    const client = new AmazonS3Adapter()
   
    it("should be throw with invalid key", async () => {
      
        expect(await client.verifyFolderAvailability("invalid-key")).toBe(false)

    })

    it("should be return true with valid key", async () => {

        expect(await client.verifyFolderAvailability("trilhas/track-0c348e5c-68ab-4475-91d1-bc921a46be07/course-39f317f9-5d96-4962-b8df-7bd5c1a4ff77/")).toBe(true)
    })
})