import { ContentManager } from "@/application/services/content-manager";
import { TrailDomainService } from "../update";
import {
    Trail,
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    CreateTrailClassInputDTO,
    CreateTrailClassOutputDTO,
    InvalidTrailPropetyDomainException,
    IStorageService
} from "./index";
import { ArchiveContentItem } from "@/domain/entity/value-objects/archive-block-content-item";
import { VideoContentItem } from "@/domain/entity/value-objects/video-block-content-item";
import { IVideoService } from "@/application/interfaces/IVideo-service";


export class CreateTrailClassUseCase {

    constructor(
        private readonly storageService: IStorageService,
        private readonly videoService: IVideoService,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository,
        private readonly trailDomainService: TrailDomainService = new TrailDomainService(),
        private readonly contentManager: ContentManager = new ContentManager(storageService, videoService),
    ) { }

    async execute(idTrail: string, parts: any): Promise<any> {
        let data = null
        let archivesToUpload = []
        let videosToUpload = []

        for await (const part of parts) {
            if (part.type === 'file' && !part.mimetype.startsWith('video')) {
                const buffer = await part.toBuffer();
                archivesToUpload.push({
                    ...part,
                    buffer
                });
                continue;
            } else if (part.type === 'field') {
                data = JSON.parse(part.value);
                continue;
            } else if (part.type === 'file' && part.mimetype.startsWith('video')) {
                const buffer = await part.toBuffer();
                videosToUpload.push({
                    ...part,
                    buffer
                });
                continue;
            } else {
                console.log('Não é um arquivo, parte:', part);
            }
        }

        if (!data) {
            throw new Error('data não encontrado')
        }

        const createdTrailClass: TrailClass = new TrailClassDomainService().createTrailClass({
            idTrail: idTrail,
            type: data.type,
            title: data.title,
            description: data.description,
            duration: data.duration,
        });

        const saved = await this.contentManager.saveFiles({
            idTrailClass: createdTrailClass.getId()!,
            archives: archivesToUpload,
            videos: videosToUpload
        })

        data.content.forEach((content: any) => {
            switch (content.type) {
                case 'file':
                    const isVideo = saved.videos.find((video) => video.filename === content.content)
                    const isArchive = saved.archives.find((archive) => archive.filename === content.content)

                    if (!isVideo && !isArchive) throw new Error('arquivo não encontrado')

                    if (isVideo) {
                        createdTrailClass.addContent(this.trailDomainService.createVideoContentItem({
                            idTrailClass: createdTrailClass.getId()!,
                            index: content.index,
                            content: {
                                title: content.content,
                                extension: 'isVideo.extension',
                                location: ' isVideo.key'
                            },
                            status: 'uploaded'
                        }))
                        break;
                    }

                    if (isArchive) {
                        createdTrailClass.addContent(this.trailDomainService.createArchiveContentItem({
                            idTrailClass: createdTrailClass.getId()!,
                            index: content.index,
                            content: {
                                title: content.content,
                                extension: isArchive.extension,
                                location: isArchive.key
                            },
                            status: 'uploaded'
                        }))
                        break;
                    }
                case 'text':
                    createdTrailClass.addContent(this.trailDomainService.createTextContentItem({
                        idTrailClass: createdTrailClass.getId()!,
                        index: content.index,
                        content: content.content,
                        status: 'uploaded'
                    }))
                    break;
                case 'alternatives':
                    createdTrailClass.addContent(this.trailDomainService.createAlternativesContentItem({
                        idTrailClass: createdTrailClass.getId()!,
                        index: content.index,
                        content: {
                            questionPrompt: content.content,
                            alternatives: content.alternatives
                        },
                        status: 'uploaded'
                    }))
                    break;
                case 'dissertative':
                    createdTrailClass.addContent(this.trailDomainService.createDissertativeContentItem({
                        idTrailClass: createdTrailClass.getId()!,
                        index: content.index,
                        content: {
                            ExpectedAnswer: content.content,
                            questionPrompt: content.content
                        },
                        status: 'uploaded'
                    }))
                    break;
            }
        })
        return {
            trailClass: createdTrailClass,
        }
    }

    // private async inMemory(idTrail: string, parts: any) {
    //     let data = {}
    //     let archivesToUpload = []
    //     let videosToUpload = []

    //     for await (const part of parts) {
    //         if (part.type === 'file' && !part.mimetype.startsWith('video')) {
    //             const buffer = await part.toBuffer();
    //             archivesToUpload.push({
    //                 ...part,
    //                 buffer
    //             });
    //             continue;
    //         } else if (part.type === 'field') {
    //             data = JSON.parse(part.value);
    //             continue;
    //         } else if (part.type === 'file' && part.mimetype.startsWith('video')) {
    //             const buffer = await part.toBuffer();
    //             videosToUpload.push({
    //                 ...part,
    //                 buffer
    //             });
    //             continue;
    //         } else {
    //             console.log('Não é um arquivo, parte:', part);
    //         }
    //     }

    //     const testes = await this.contentManager.saveFiles(archivesToUpload, videosToUpload)
    //     testes.archives.forEach(async (teste) => {
    //         console.log('testeeeeeeeee', teste)
    //     })

    // }

    private async withStreams(idTrail: string, parts: any) {
        for await (const part of parts) {
            if (part.type === 'file' && !part.mimetype.startsWith('video')) {
                await this.storageService.teste(part.file, part.filename);
            } else if (part.type === 'field') {
                // data = JSON.parse(part.value)
                continue
            } else if (part.type === 'file' && part.mimetype.startsWith('video')) {
                const buffer = await part.toBuffer();
                // videosToUpload.push({
                //     ...part,
                //     buffer
                // })
                continue;
            } else {
                console.log('Não é um arquivo, parte:', part);
            }
        }
    }
}
