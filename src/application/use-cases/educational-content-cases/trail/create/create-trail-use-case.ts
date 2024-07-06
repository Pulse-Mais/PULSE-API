import {
    Trail,
    ITrailRepository,
    TrailDomainService,
    CreateTrailInputDTO,
    CreateTrailOutputDTO,
    TrailClassNotSavedOnRepositoryApplicationException,
} from "./index"


export class CreateTrailUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: CreateTrailInputDTO): Promise<CreateTrailOutputDTO> {
        const trail: Trail = new TrailDomainService().createTrail(input);

        const saved: Trail = await this.trailRepository.save(trail)
        if (!saved) {
            throw new TrailClassNotSavedOnRepositoryApplicationException("create-trail-use-case.ts", "34")
        }

        const outputDTO: CreateTrailOutputDTO = {
            trail: saved,
        }

        return outputDTO
    }
}
