
import {
    ITrailRepository,
    ReadPublishedTrailClassesUseCaseInputDTO,
    ReadPublishedTrailClassesUseCaseOutputDTO,
    Trail,
    TrailClass,
    TrailDomainService,
    TrailNotFoundApplicationException   
} from "./index";


export class ReadPublishedTrailClassesUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadPublishedTrailClassesUseCaseInputDTO): Promise<ReadPublishedTrailClassesUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-published-trail-classes-use-case", "16");
        }

        const publishedTrailClasses: TrailClass[] = new TrailDomainService().getPublishedTrailClasses({
            trail
        });

        const output: ReadPublishedTrailClassesUseCaseOutputDTO = {
            trailClasses: publishedTrailClasses
        };

        return output;
    }
}  
 