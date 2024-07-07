import {
    ITrailRepository,
    UpdateTrailInfoUseCaseInputDTO,
    TrailNotFoundApplicationException,
    TrailDomainService,
    UpdateTrailInfoUseCaseOutputDTO,
    Trail,
    UpdateTrailDomainServiceInput
} from "./index";


export class UpdateTrailInfoUseCase {
    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(inputDTO: UpdateTrailInfoUseCaseInputDTO): Promise<UpdateTrailInfoUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(inputDTO.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("update-trail-info-use-case.ts", "13");
        }

        const updateTrailDomainServiceInput: UpdateTrailDomainServiceInput = {
            trail,
            title: inputDTO.newTitle,
            subtitle: inputDTO.newSubtitle,
            description: inputDTO.newDescription
        }

        const updatedTrail: Trail = new TrailDomainService().updateTrailInfo(updateTrailDomainServiceInput);

        const savedUpdatedTrail: Trail = await this.trailRepository.save(updatedTrail);

        const outputDTO: UpdateTrailInfoUseCaseOutputDTO = {
            updatedTrail: savedUpdatedTrail
        }

        return outputDTO
    }
}
