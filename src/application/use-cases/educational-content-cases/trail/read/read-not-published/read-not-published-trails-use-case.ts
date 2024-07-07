import {
    ITrailRepository,
    Trail,
    ReadNotPublishedTrailsUseCaseOutputDTO
} from "./index";


export class ReadNotPublishedTrailsUseCase {
    constructor(private trailRepository: ITrailRepository) { }

    async execute(): Promise<ReadNotPublishedTrailsUseCaseOutputDTO> {
        const notPublishedTrails: Trail[] = await this.trailRepository.listNotPublished();

        const outputDTO: ReadNotPublishedTrailsUseCaseOutputDTO = {
            trails: notPublishedTrails
        }

        return outputDTO;
    }
}
