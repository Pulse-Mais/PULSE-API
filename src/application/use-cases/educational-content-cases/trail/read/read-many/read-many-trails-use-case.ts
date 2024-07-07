import {
    Trail,
    ReadManyTrailsUseCaseOutputDTO,
    ITrailRepository
} from "./index"

export class ReadManyTrailsUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(): Promise<ReadManyTrailsUseCaseOutputDTO> {
        const trails: Trail[] = await this.trailRepository.list()

        const outputDTO: ReadManyTrailsUseCaseOutputDTO = {
            trails: trails
        }

        return outputDTO
    }
}
