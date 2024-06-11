import {
    IVideoService,
    ITrailClassRepository,
    TrailClassDomainService,
    ITrailRepository,
    TrailNotFoundApplicationException,
    GenericUseCase,
    Trail,
    GetUrlForUploadClassVideoContentOutputDTO,
    GetUrlForUploadTrailClassVideoContentInputDTO
} from "./index";

export class GetUrlForUploadVideoContent extends GenericUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly videoService: IVideoService,
        private readonly trailClassService: TrailClassDomainService
    ) {
        super(
            "get-url-for-upload-video-content.ts",
            "use-cases/educational-content-cases/trail/trail-class/trail-class-content/get-url-for-upload-video-content.ts"
        );
    }

    async execute(input: GetUrlForUploadTrailClassVideoContentInputDTO): Promise<GetUrlForUploadClassVideoContentOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail)
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "31")

        const upload = await this.videoService.getUrlForUploadVideoContent()
        if (!upload) throw new Error("Error getting upload url");

        if (!upload.url) throw new Error("Error getting upload url");
        if (!upload.idUpload) throw new Error("Error getting upload url");

        const newContent = this.trailClassService.createNewVideoContentObject(trail, input.idTrailClass, upload.idUpload)

        const trailClassUpdated = this.trailClassService.updateTrailClassContent(trail, input.idTrailClass, newContent);

        const saved = await this.trailClassRepository.save(trailClassUpdated);
        if (!saved) throw new Error("")

        const updatedContent = saved.getContent()
        if (!updatedContent) throw new Error("")

        const output: GetUrlForUploadClassVideoContentOutputDTO = {
            url: upload.url,
            content: {
                key: updatedContent.key,
                type: updatedContent.type,
                format: updatedContent.format,
                status: updatedContent.status
            }
        }

        return output
    }

}

