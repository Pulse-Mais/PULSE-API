import {
    ITrailRepository,
    ReadUnfilledTrailClassesUseCaseInputDTO,
    ReadUnfilledTrailClassesUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    Trail,
    TrailClass,
    TrailDomainService  
} from "./index";


export class ReadUnfilledTrailClassesUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadUnfilledTrailClassesUseCaseInputDTO): Promise<ReadUnfilledTrailClassesUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-unfilled-trail-classes-use-case", "16");
        }

        const unfilledTrailClasses: TrailClass[] = new TrailDomainService().getUnfilledTrailClasses({
            trail
        });

        const output: ReadUnfilledTrailClassesUseCaseOutputDTO = {
            trailClasses: unfilledTrailClasses
        };

        return output;
    }
}  
