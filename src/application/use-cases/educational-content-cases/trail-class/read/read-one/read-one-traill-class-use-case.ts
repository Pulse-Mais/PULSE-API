import {
    ITrailRepository,
    ReadOneTraillClassUseCaseInputDTO,
    ReadOneTraillClassUseCaseOutputDTO,
    Trail,
    TrailClass,
    TrailDomainService,
    TrailNotFoundApplicationException
} from "./index";


export class ReadOneTraillClassUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadOneTraillClassUseCaseInputDTO): Promise<ReadOneTraillClassUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("read-one-traill-class-use-case", "36");
        };

        const trailClass: TrailClass | null = new TrailDomainService().getTrailClass({
            trail,
            idTrailClass: input.idTrailClass
        });

        const output: ReadOneTraillClassUseCaseOutputDTO = {
            trailClass
        };

        return output;
    }
}
