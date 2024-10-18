import { AlternativesContentItem } from "@/domain/entity/value-objects/alternatives-block-content-item"
import { ArchiveContent, ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item"
import { DissertativeContentItem } from "@/domain/entity/value-objects/dissertatives-block-content-item"
import { TextContentItem } from "@/domain/entity/value-objects/text-block-content-item"
import { VideoContent, VideoContentItem } from "@/domain/entity/value-objects/video-block-content-item"
import { IStorageService } from "../interfaces/IStorage-service"
import { ContentBlock } from "@/domain/entity/value-objects/trail-content-item-value-object"

export class ContentManager {

    constructor(private readonly storageService: IStorageService) { }

    private async saveArchiveFiles(archives: ArchiveContentItem[]) {
        try {
            const promises = archives.map(async archive => {
                const s3Response = await this.storageService.getPromise(archive);

                return {
                    s3Response,   
                    archive       
                }
            })
    
            return await Promise.all(promises);
        } catch (error) {
            throw new Error('Error saving archive content');
        }
    }
    

    private async saveVideoFiles(videos: VideoContentItem[]) {
        return Promise.all([{
            teste: 'null',
            mux: {
                video: 'teste'
            }
        }])
    }


    async saveFiles(archives: ArchiveContentItem[], videos: ContentBlock<any>[]) {
        const savedFiles = await Promise.all([
            this.saveArchiveFiles(archives),
            this.saveVideoFiles(videos)
        ])

        const archivesFiles: ArchiveContentItem[] = savedFiles[0].map(f => {
            f.archive.location = f.s3Response.Key
            f.archive.upload.status = 'uploaded'
            f.archive.content.binary = 'None'
    
            return f.archive 
        })
    


        const archivesVideos = savedFiles[1].map(f => {
            f.teste = f.mux.video
        })
       
        return {
            'archives':archivesFiles as ArchiveContentItem[],
            'videos': []
       
        }
    }
}
