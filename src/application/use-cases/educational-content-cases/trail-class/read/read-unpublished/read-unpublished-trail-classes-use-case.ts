import {
    ITrailRepository,
    ReadUnpublishedTrailClassesUseCaseInputDTO,
    ReadUnpublishedTrailClassesUseCaseOutputDTO,
    TrailNotFoundApplicationException,
    Trail,
    TrailClass,
    TrailDomainService  
} from "./index";


export class ReadUnpublishedTrailClassesUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadUnpublishedTrailClassesUseCaseInputDTO): Promise<ReadUnpublishedTrailClassesUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-unpublished-trail-classes-use-case", "16");
        }

        const unpublishedTrailClasses: TrailClass[] = new TrailDomainService().getUnpublishedTrailClasses({
            trail
        });

        const output: ReadUnpublishedTrailClassesUseCaseOutputDTO = {
            trailClasses: unpublishedTrailClasses
        };

        return output;
    }
}   