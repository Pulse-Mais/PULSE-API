import {
    ITrailRepository,
    ReadFilledTrailClassesUseCaseInputDTO,
    ReadFilledTrailClassesUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    Trail,
    TrailClass,
    TrailDomainService
} from "./index";


export class ReadFilledTrailClassesUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadFilledTrailClassesUseCaseInputDTO): Promise<ReadFilledTrailClassesUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-filled-trail-classes-use-case", "16");
        }

        const filledTrailClasses: TrailClass[] = new TrailDomainService().getFilledTrailClasses({
            trail
        });

        const output: ReadFilledTrailClassesUseCaseOutputDTO = {
            trailClasses: filledTrailClasses
        };

        return output;
    }
}       
