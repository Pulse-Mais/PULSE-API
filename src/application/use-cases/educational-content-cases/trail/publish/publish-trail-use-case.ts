import {
    ITrailRepository,
    TrailDomainService,
    TrailNotFoundApplicationException,
    PublishTrailUseCaseInputDTO,
    PublishTrailUseCaseOutputDTO,
    Trail
} from "./index";

export class PublishTrailUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: PublishTrailUseCaseInputDTO): Promise<PublishTrailUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);

        if (!trail) {
            throw new TrailNotFoundApplicationException("publish-trail-use-case.ts", "13");
        }

        const publishedTrail: Trail = new TrailDomainService().publishTrail(trail);

        const savedPublishedTrail: Trail = await this.trailRepository.save(publishedTrail);

        const outputDTO: PublishTrailUseCaseOutputDTO = {
            publishedTrail: savedPublishedTrail
        }

        return outputDTO
    }
} 
