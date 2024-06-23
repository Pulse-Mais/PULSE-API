import {
    Trail,
    ITrailRepository,
    TrailDomainService,
    GenericUseCase,
    IStorageService,
    CreateTrailInputDTO,
    TrailClassPartionNotCreatedApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    InvalidContentKeyDomainException    
} from "./index"


export class CreateTrailUseCase extends GenericUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly storageService: IStorageService
    ) {
        super("create-class-use-case.ts", "src/application/use-cases/create-class-use-case.ts");
    }

    async execute(input: CreateTrailInputDTO): Promise<Trail> {

        const trail = new TrailDomainService().createTrail(input);
        const trailStorageKey = trail.getStorageKey()

        if (!trailStorageKey) throw new InvalidContentKeyDomainException("create-trail-use-case.ts", "27");

        const partitionFolderCreated = await this.storageService.createTrailFolder(trailStorageKey)
        if (!partitionFolderCreated) throw new TrailClassPartionNotCreatedApplicationException("create-trail-use-case.ts", "25");

        const saved = await this.trailRepository.save(trail)
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException("create-trail-use-case.ts", "34")

        return saved
    }
}
