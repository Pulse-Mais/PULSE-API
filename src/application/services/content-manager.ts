import { AlternativesContentItem } from "@/domain/entity/value-objects/alternatives-block-content-item"
import { ArchiveContent, ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item"
import { DissertativeContentItem } from "@/domain/entity/value-objects/dissertatives-block-content-item"
import { TextContentItem } from "@/domain/entity/value-objects/text-block-content-item"
import { VideoContent, VideoContentItem } from "@/domain/entity/value-objects/video-block-content-item"
import { IStorageService } from "../interfaces/IStorage-service"
import { ContentBlock } from "@/domain/entity/value-objects/trail-content-item-value-object"
import { IVideoService } from "../interfaces/IVideo-service"

interface saveFilesInput {
    idTrailClass: string
    archives: any
    videos: any
}
export class ContentManager {

    constructor(
        private readonly storageService: IStorageService,
        private readonly videosService: IVideoService
    ) { }

    private async saveArchiveFiles(idTrailClass: string, archives: any) {
        try {
            const promises = []
            for await (const part of archives) {
                const filename = part.filename;
                const key = `${idTrailClass}/${filename}`
                const extension = part.mimetype
                const promiseWithFilename = this.storageService.getPromise(
                    part,
                    idTrailClass
                ).then((result) => ({ result, filename, key, extension }))

                promises.push(promiseWithFilename);
            }

            return await Promise.all(promises)
        } catch (error) {
            throw new Error(`Error saving archive content ${error}`);
        }
    }

    private async saveVideoFiles(idTrailClass: string, videos: any) {

        const promises = []
        for await (const part of videos) {
            const filename = part.filename;
            const extension = part.mimetype

           promises.push(await this.videosService.uploadWithDirectEndpoint(part))
        }

        return Promise.all(promises)
    }


    async saveFiles(input: saveFilesInput) {
        const savedFiles = await Promise.all([
            this.saveArchiveFiles(input.idTrailClass, input.archives),
            this.saveVideoFiles(input.idTrailClass, input.videos)
        ])

        const archivesFiles = savedFiles[0]
        const videoFiles = savedFiles[1]
 
        return {
            'archives': archivesFiles,
            'videos': videoFiles

        }
    }
}
