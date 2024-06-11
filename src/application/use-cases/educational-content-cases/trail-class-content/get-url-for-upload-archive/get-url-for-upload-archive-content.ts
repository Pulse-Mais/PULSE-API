import { Trail, TrailClass, TrailNotFoundApplicationException } from "../../trail-class/create";
import {
    ITrailClassRepository,
    ITrailRepository,
    TrailClassDomainService,
    IStorageService,
    GenericUseCase,
    TrailClassNotSavedOnRepositoryApplicationException,
    GetUrlForUploadClassArchiveInputDTO,
    GetUrlForUploadClassArchiveOutputDTO,
    ContentValueObject
} from "./index";


export class GetUrlForUploadArchiveContent extends GenericUseCase {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository,
        private readonly storageService: IStorageService,
        private readonly trailClassService: TrailClassDomainService
    ) {
        super("get-url-for-upload-archive-content", "use-cases/educational-content-cases/trail/trail-class/trail-class-content/get-url-for-upload-archive-content.ts");
    }

    async execute(input: GetUrlForUploadClassArchiveInputDTO): Promise<GetUrlForUploadClassArchiveOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "33")
 
        const newContent: ContentValueObject = this.trailClassService.createNewArchiveContentObject(trail, input.idTrailClass, {
            archiveExtension: input.archiveExtension,
            format: input.format,
            type: input.type
        })

        const trailClassUpdated: TrailClass = this.trailClassService.updateTrailClassContent(trail, input.idTrailClass, newContent);

        const saved: TrailClass = await this.trailClassRepository.save(trailClassUpdated);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException(this.filename, "57")

        const updatedContent: ContentValueObject | undefined = saved.getContent()
        if (!updatedContent) throw new Error("Criar exception");

        const url = await this.storageService.getUrlForUploadArchiveContent(updatedContent.key)
        if (!url) throw new Error("Endpoint de upload não gerado pelo Storage Service")

        const output: GetUrlForUploadClassArchiveOutputDTO = {
            url,
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