import {
    ITrailRepository,
    ReadPublishedTrailsUseCaseOutputDTO,
    Trail
} from "./index";


export class ReadPublishedTrailsUseCase {
    constructor(private trailRepository: ITrailRepository) { }

    async execute(): Promise<ReadPublishedTrailsUseCaseOutputDTO> {
        const publishedTrails: Trail[] = await this.trailRepository.listPublished();

        const outputDTO: ReadPublishedTrailsUseCaseOutputDTO = {
            trails: publishedTrails
        }

        return outputDTO;
    }
}       
