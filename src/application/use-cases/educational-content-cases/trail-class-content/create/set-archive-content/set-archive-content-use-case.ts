import {
    ITrailClassRepository,
    ITrailRepository,
    TrailClassDomainService,
    TrailClassNotSavedOnRepositoryApplicationException,
    SetArchiveClassContentOutputDTO,
    SetArchiveTrailClassContentInputDTO,
    TrailClassNotFoundOnTrailDomainException,
    TrailClass,
    TrailNotFoundApplicationException,
    TrailDomainService,
    ContentArchiveValueObject,
    InvalidTrailClassPropetyDomainException,
    Trail
} from "./index";


export class SetArchiveContentUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailClassDomainService: TrailClassDomainService
    ) { }

    async execute(input: SetArchiveTrailClassContentInputDTO): Promise<SetArchiveClassContentOutputDTO> {
        const trailClassDomainService: TrailClassDomainService = new TrailClassDomainService();

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("get-url-for-upload-archive-content.ts", "33")
        }

        const trailClass: TrailClass | null = new TrailDomainService().getTrailClass({
            trail,
            idTrailClass: input.idTrailClass
        });

        if (!trailClass) {
            throw new TrailClassNotFoundOnTrailDomainException("get-url-for-upload-archive-content.ts", "37")
        }

        const actualInUploadContentArchive = trailClass.getContent()
        if (!actualInUploadContentArchive || !(actualInUploadContentArchive instanceof ContentArchiveValueObject)) {
            throw new InvalidTrailClassPropetyDomainException("set-archive-content-use-case.ts", "37", "Content")
        }

        const filledContentArchive: ContentArchiveValueObject = trailClassDomainService.createFilledContentArchiveValueObject(
            trailClass,
            actualInUploadContentArchive.format
        );


        const trailClassUpdated = this.trailClassDomainService.updateContent(
            trailClass,
            filledContentArchive
        );

        const savedTrailClassUpdated = await this.trailClassRepository.save(trailClassUpdated);
        if (!savedTrailClassUpdated) {
            throw new TrailClassNotSavedOnRepositoryApplicationException("set-archive-content-use-case.ts", "100")
        }

        const output: SetArchiveClassContentOutputDTO = {
            content: filledContentArchive
        }

        return output
    }
}   
