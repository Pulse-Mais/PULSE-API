import {
    Trail,
    TrailDomainService,
    InvalidTrailPropetyDomainException,
    TrailClass,
    TrailClassDomainService,
    ITrailClassRepository,
    ITrailRepository,
    TrailNotFoundApplicationException,
    TrailClassNotSavedOnRepositoryApplicationException,
    PublishTrailClassOutputDTO,
    PublishTrailClassInputDTO
} from "./index";


export class PublishTrailClassUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository,
        private readonly trailClassRepository: ITrailClassRepository
    ) { }

    async execute(input: PublishTrailClassInputDTO) {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail)
        if (!trail) {
            throw new TrailNotFoundApplicationException("publish-trail-class-use-case", "30");
        }

        const trailClass: TrailClass = new TrailDomainService().getTrailClass({
            trail,
            idTrailClass: input.idTrailClass
        })
        
        const publishedTrailClass: TrailClass = new TrailClassDomainService().publishTrailClass(trailClass)

        const savedPublishedTrailClass: TrailClass = await this.trailClassRepository.save(publishedTrailClass);
        if (!savedPublishedTrailClass) {
            throw new TrailClassNotSavedOnRepositoryApplicationException("publish-trail-class-use-case", "35");
        }

        const idTrail: string | undefined = trail.getId()
        if (!idTrail) {
            throw new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "38", "idTrail")
        }

        const idTrailClass: string | undefined = savedPublishedTrailClass.getId()
        if (!idTrailClass) {
            throw new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "43", "idTrailClass")
        }

        const title: string | undefined = savedPublishedTrailClass.getTitle()
        if (!title) {
            throw new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "48", "title")
        }
        const status: "published" | "not-published" | undefined = savedPublishedTrailClass.getStatus()
        if (!status || status !== "published") {
            throw new InvalidTrailPropetyDomainException("publish-trail-class-use-case", "52", "status")
        }

        const output: PublishTrailClassOutputDTO = {
            idTrail,
            idTrailClass,
            title,
            status
        };

        return output;
    }
}
