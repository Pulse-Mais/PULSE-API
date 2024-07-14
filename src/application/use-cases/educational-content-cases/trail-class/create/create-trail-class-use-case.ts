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
    InvalidTrailPropetyDomainException
} from "./index";


export class CreateTrailClassUseCase {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private readonly trailRepository: ITrailRepository,
    ) { }

    async execute(input: CreateTrailClassInputDTO): Promise<CreateTrailClassOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("create-trail-class-use-case", "36");
        }

        const idTrail: string | undefined = trail.getId()
        if (!idTrail) {
            throw new InvalidTrailPropetyDomainException("create-trail-class-use-case", "36", "idTrail")
        }

        const trailClass: TrailClass = new TrailClassDomainService().createTrailClass({
            idTrail,
            title: input.title,
            subtitle: input.subtitle,
            description: input.description,
            duration: input.duration
        });


        const saved = await this.trailClassRepository.save(trailClass);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException("aaaaaaaaaaaaaa", "58");

        const output: CreateTrailClassOutputDTO = {
            trailClass: saved
        };

        return output
    }
}
