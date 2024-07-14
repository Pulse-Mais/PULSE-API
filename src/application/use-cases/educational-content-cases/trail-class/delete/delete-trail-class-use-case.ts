import { TrailDomainService } from "@/domain/domain-services/trail/trail-domain-service";
import {
    TrailClassNotFoundApplicationException,
    TrailNotFoundApplicationException,
    TrailClass,
    ITrailClassRepository,
    ITrailRepository,
    DeleteTrailClassInputDTO,
    DeleteTrailClassOutputDTO
} from "./index";

export class DeleteTrailClassUseCase  {

    constructor(
        private readonly trailClassRepository: ITrailClassRepository,
        private trailRepository: ITrailRepository
    ) {}

    async execute(input: DeleteTrailClassInputDTO): Promise<DeleteTrailClassOutputDTO> {

        const trail = await this.trailRepository.findById(input.idTrail)

        if (!trail) {
            throw new TrailNotFoundApplicationException("delete-trail-class-use-case", "26");
        }

        const trailClass: TrailClass = new TrailDomainService().getTrailClass({
            trail,
            idTrailClass: input.idTrailClass
        })
        
        const deletedTrailClass = await this.trailClassRepository.delete(trailClass)
        if (!deletedTrailClass) {
            throw new Error("Criar exception. TrailClass not deleted on repository.")
        }

        const output: DeleteTrailClassOutputDTO = {
            isDeleted: deletedTrailClass
        }

        return output
    }
}


