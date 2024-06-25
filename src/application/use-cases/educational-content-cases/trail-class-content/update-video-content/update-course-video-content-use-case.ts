 
import {
    TrailNotFoundApplicationException,
    ITrailRepository,
    ITrailClassRepository,
    TrailClassDomainService,
    GenericUseCase,
    TrailClassNotSavedOnRepositoryApplicationException,
    InvalidTrailClassPropetyDomainException,
    UpdateTrailClassVideoContentOutputDTO,
    UpdateTrailClassVideoContentInputDTO
} from './index';

export class UpdateTrailClassVideoContentUseCase extends GenericUseCase {

    constructor(private readonly trailRepository: ITrailRepository, private readonly trailClassRepository: ITrailClassRepository, private readonly trailClassDomainService: TrailClassDomainService) {
        super("update-course-video-content-use-case.ts");
    }

    async execute(input: UpdateTrailClassVideoContentInputDTO) {
        // TODO: Adicionar o mailService pra notificar por e-mail.

        const trailClass = await this.trailClassRepository.findByTrailClassUploadId(input.idTrailClassContentUpload);
        if (!trailClass) throw new Error("TrailClass not found");

        const idTrail = trailClass.getIdTrail()
        if (!idTrail) throw new TrailNotFoundApplicationException(this.filename, "27")

        const idTrailClass = trailClass.getId()
        if (!idTrailClass) throw new Error("aaaa");

        const trail = await this.trailRepository.findById(idTrail)
        if (!trail) throw new TrailNotFoundApplicationException(this.filename, "37")

        const newContent = this.trailClassDomainService.createdFilledVideoContentObject(trail, idTrailClass, input.newKey)
        const trailClassUpdated = this.trailClassDomainService.updateTrailClassContent(trail, idTrailClass, newContent);

        const trailClassUpdatedSaved = await this.trailClassRepository.save(trailClassUpdated);
        if (!trailClassUpdatedSaved) throw new Error("Error saving trailClass");

        const saved = await this.trailClassRepository.save(trailClassUpdated);
        if (!saved) throw new TrailClassNotSavedOnRepositoryApplicationException(this.filename, "46")

        const status = saved.getStatus()
        if (!status) throw new InvalidTrailClassPropetyDomainException(this.filename, "49", "status")

        const updatedContent = saved.getContent()
        if (!updatedContent) throw new InvalidTrailClassPropetyDomainException(this.filename, "52", "content")

        const output: UpdateTrailClassVideoContentOutputDTO = {
            idTrail,
            idTrailClass,
            status,
            content: {
                key: updatedContent.key,
                type: updatedContent.type,
                // format: updatedContent.format,AQUI
                status: updatedContent.status
            }
        }

        return output;

    }

}

