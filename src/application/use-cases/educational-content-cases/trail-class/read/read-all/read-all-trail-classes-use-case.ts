import {
    ITrailRepository,
    ReadAllTrailClassesUseCaseInputDTO,
    ReadAllTrailClassesUseCaseOutputDTO,
    Trail,
    TrailClass,
    TrailDomainService,
    TrailNotFoundApplicationException
} from "./index";


export class ReadAllTrailClassesUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadAllTrailClassesUseCaseInputDTO): Promise<ReadAllTrailClassesUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-all-trail-classes-use-case", "16");
        }

        const trailClasses: TrailClass[] = new TrailDomainService().getTrailClasses({
            trail
        });

        const output: ReadAllTrailClassesUseCaseOutputDTO = {
            idTrail: input.idTrail,
            trailClasses
        };

        return output;
    }
}
