import {
    Trail,
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailFolderNotAvaibilityApplicationException,
    TrailClassStorageKeyEmptyApplicationException,
    TrailClassPartionNotCreatedApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    CreateTrailClassInputDTO,
    CreateTrailClassOutputDTO
} from "./index";


export class CreateTrailClassUseCase {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository,
    ) { }

    async execute(input: CreateTrailClassInputDTO): Promise<CreateTrailClassOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "36");


        const folderIsAvaibility: boolean = await this.storageService.verifyFolderAvailability(trailStorageKey)
        if (!folderIsAvaibility) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            throw new TrailFolderNotAvaibilityApplicationException(this.filename, "42");
        }

        const trailClass: TrailClass = new TrailClassDomainService().createTrailClass({
            trail,
            title: input.title,
            subtitle: input.subtitle,
            description: input.description
        });


        const trailClassStorageKey = trailClass.getTrailClassStorageKey();
        if (!trailClassStorageKey) throw new TrailClassStorageKeyEmptyApplicationException(this.filename, "52");

        const trailClassFolderWasCreated = await this.storageService.createClassFolder(trailClassStorageKey);
        if (!trailClassFolderWasCreated) throw new TrailClassPartionNotCreatedApplicationException(this.filename, "55");

        const saved = await this.trailClassRepository.save(trailClass);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException(this.filename, "58");

        const outputId = saved.getId();
        if (!outputId) throw new Error("ID is undefined");

        const storageKey = saved.getTrailClassStorageKey();
        if (storageKey === undefined) throw new Error("Storage Key is undefined");

        const status = saved.getStatus();
        if (status === undefined) throw new Error("Status is undefined");

        const title = saved.getTitle();
        if (title === undefined) throw new Error("Title is undefined");

        const subtitle = saved.getSubtitle();
        if (subtitle === undefined) throw new Error("Subtitle is undefined");

        const description = saved.getDescription();
        if (description === undefined) throw new Error("Description is undefined");

        const output: CreateTrailClassOutputDTO = {
            idTrail: outputId,
            storageKey: storageKey,
            status: status,
            title: title,
            subtitle: subtitle,
            description: description,
        };

        return output
    }

}



