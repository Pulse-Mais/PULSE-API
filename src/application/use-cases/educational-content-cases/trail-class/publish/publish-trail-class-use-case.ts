import {
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    GenericUseCase,
    PublishTrailClassOutputDTO,
    PublishTrailClassInputDTO
} from "./index"; 

export class PublishTrailClassUseCase extends GenericUseCase {

    constructor(private readonly trailRepository: ITrailRepository, private readonly trailClassRepository: ITrailClassRepository) {
        super(
            "create-class-use-case.ts",
            "src/application/use-cases/create-class-use-case.ts"
        );
    }

    async execute(input: PublishTrailClassInputDTO) {

        const trail = await this.trailRepository.findById(input.idTrail)
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "30");

        const publishedTrailClass: TrailClass = new TrailClassDomainService().publishTrailClass(trail, input.idTrailClass)

        const saved: TrailClass = await this.trailClassRepository.save(publishedTrailClass);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException(this.filename, "35");

        const idTrailClass = saved.getId();
        if (!idTrailClass) throw new Error("ID is undefined");

        const idTrail = saved.getIdTrail();
        if (idTrail === undefined) throw new Error("Trail ID is undefined");

        const title = saved.getTitle();
        if (title === undefined) throw new Error("Title is undefined");

        const storageKey = saved.getTrailClassStorageKey();
        if (storageKey === undefined) throw new Error("Storage Key is undefined");

        const status = saved.getStatus();
        if (status === undefined) throw new Error("Status is undefined");

        const content = saved.getContent();
        if (content === undefined) throw new Error("Content Key is undefined");

        const release = saved.getRelease();
        if (release === undefined) throw new Error("Release Schedule is undefined");

        if (!(release.schedule instanceof Date)) {
            throw new Error("The schedule is not a valid Date object.");
        }

        const output: PublishTrailClassOutputDTO = {
            idTrailClass,
            idTrail,
            title,
            status,
            content: {
                key: content.key,
                contentStatus: content.status,
                type: content.type,
                // format: content.format AQUI
            },
            release: {
                schedule: release.schedule,
                releaseStatus: release.status
            }
        };

        return output;
    }
}