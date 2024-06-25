import {
    TrailClassNotSavedOnRepositoryApplicationException,
    UpdateTrailClassArchiveContentOutputDTO,
    GenericUseCase,
    ITrailRepository,
    ITrailClassRepository,
    TrailClassDomainService,
    TrailNotFoundApplicationException,
    UpdateTrailClassArchiveContentInputDTO,
    InvalidTrailClassPropetyDomainException
} from './index';

export class UpdateTrailClassArchiveContentUseCase extends GenericUseCase {

    constructor(private readonly trailRepository: ITrailRepository, private readonly trailClassRepository: ITrailClassRepository, private readonly trailClassDomainService: TrailClassDomainService) {
        super("update-course-archive-content-use-case.ts");
    }

    async execute(input: UpdateTrailClassArchiveContentInputDTO): Promise<UpdateTrailClassArchiveContentOutputDTO> {

        const trail = await this.trailRepository.findById(input.idTrail);
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "20")

        const newContent = this.trailClassDomainService.createdFilledArchiveContentObject(trail, input.idTrailClass)

        const trailClassUpdated = this.trailClassDomainService.updateTrailClassContent(trail, input.idTrailClass, newContent);

        const saved = await this.trailClassRepository.save(trailClassUpdated);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException(this.filename, "23")

        const idTrail = saved.getIdTrail()
        if (!idTrail) throw new InvalidTrailClassPropetyDomainException(this.filename, "27", "idTrail")

        const idTrailClass = saved.getId()
        if (!idTrailClass) throw new InvalidTrailClassPropetyDomainException(this.filename, "30", "idTrailClass")

        const status = saved.getStatus()
        if (!status) throw new InvalidTrailClassPropetyDomainException(this.filename, "33", "status")

        const updatedContent = saved.getContent()
        if (!updatedContent) throw new InvalidTrailClassPropetyDomainException(this.filename, "33", "content")

        const output: UpdateTrailClassArchiveContentOutputDTO = {
            idTrail,
            idTrailClass,
            status,
            content: {
                key: updatedContent.key,
                type: updatedContent.type,
                // format: updatedContent.format, AQUI
                status: updatedContent.status
            }
        }

        return output
    }

}




