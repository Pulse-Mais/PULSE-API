
import {
    IVideoService,
    ITrailClassRepository,
    TrailClassDomainService,
    ITrailRepository,
    TrailNotFoundApplicationException,
    Trail,
    GetUrlForUploadClassVideoContentOutputDTO,
    GetUrlForUploadTrailClassVideoContentInputDTO,
    TrailClass,
    ContentVideoValueObject,
    TrailClassNotSavedOnRepositoryApplicationException,
    TrailClassNotFoundOnTrailDomainException
} from "./index";


export class GetUrlForUploadVideoContent {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly videoService: IVideoService
    ) { }

    async execute(input: GetUrlForUploadTrailClassVideoContentInputDTO): Promise<GetUrlForUploadClassVideoContentOutputDTO> {
        const trailClassDomainService: TrailClassDomainService = new TrailClassDomainService();

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail)
        if (!trail) {
            throw new TrailNotFoundApplicationException("get-url-for-upload-video-content.ts", "31")
        }

        const trailClass: TrailClass | null = await this.trailClassRepository.findById(input.idTrailClass);
        if (!trailClass) {
            throw new TrailClassNotFoundOnTrailDomainException("get-url-for-upload-video-content.ts", "37")
        }

        const upload = await this.videoService.getUrlForUploadVideoContent()
        if (!upload.url) {
            throw new Error("Error getting upload url");
        }

        if (!upload.idUpload) {
            throw new Error("Error getting upload url");
        }

        const inUploadContentVideo: ContentVideoValueObject = trailClassDomainService.createdInUploadContentVideoValueObject(
            upload.url,
            upload.idUpload
        )
        const trailClassWithInUploadContentVideo: TrailClass = trailClassDomainService.updateContent(
            trailClass,
            inUploadContentVideo
        )

        const savedTrailClassUpdated = await this.trailClassRepository.save(trailClassWithInUploadContentVideo);
        if (!savedTrailClassUpdated) {
            throw new TrailClassNotSavedOnRepositoryApplicationException("get-url-for-upload-video-content.ts", "100")
        }

        const output: GetUrlForUploadClassVideoContentOutputDTO = {
            url: upload.url,
            content: inUploadContentVideo
        }

        return output
    }

}

