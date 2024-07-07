import {
    Trail,
    ITrailRepository,
    ReadOneTrailUseCaseInputDTO,
    ReadOneTrailUseCaseOutputDTO,
    TrailNotFoundApplicationException
} from "./index"


export class ReadOneTrailUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: ReadOneTrailUseCaseInputDTO): Promise<ReadOneTrailUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail)

        if (!trail) {
            throw new TrailNotFoundApplicationException(
                "read-one-trail-use-case.ts",
                "16"
            )
        }

        const outputDTO: ReadOneTrailUseCaseOutputDTO = {
            trail: trail
        }

        return outputDTO
    }
}
