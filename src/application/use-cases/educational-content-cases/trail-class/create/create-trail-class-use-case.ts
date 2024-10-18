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


export class CreateTrailClassUseCase {

    constructor(
        private readonly storageService: IStorageService,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository,
        private readonly trailDomainService: TrailDomainService = new TrailDomainService(),
        private readonly contentManager: ContentManager = new ContentManager(storageService),
    ) { }

    async execute(input: CreateTrailClassInputDTO): Promise<CreateTrailClassOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("create-trail-class-use-case", "28");
        }

        const idTrail: string | undefined = trail.getId()
        if (!idTrail) {
            throw new InvalidTrailPropetyDomainException("create-trail-class-use-case", "33", "idTrail")
        }

        const createdTrailClass: TrailClass = new TrailClassDomainService().createTrailClass({
            idTrail: input.idTrail,
            type: input.type,
            title: input.title,
            description: input.description,
            duration: input.duration,
        });

        const createdContents = this.trailDomainService.createTrailClassContents(
            createdTrailClass.getId()!, input.content, input.files
        )

        const savedFiles = await this.contentManager.saveFiles(
            createdContents.archives,
            createdContents.videos
        )
        createdTrailClass.addContents(createdContents.texts)
        createdTrailClass.addContents(createdContents.alternatives)
        createdTrailClass.addContents(createdContents.dissertatives)
        createdTrailClass.addContents(savedFiles.archives)
        createdTrailClass.addContents(savedFiles.videos)
        
        await this.trailClassRepository.save(createdTrailClass)


        return {
            trailClass: createdTrailClass,
        }
    }
}
