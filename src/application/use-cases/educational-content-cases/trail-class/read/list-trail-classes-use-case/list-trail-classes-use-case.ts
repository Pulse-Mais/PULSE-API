import { ITrailClassRepository, ITrailRepository, TrailNotFoundApplicationException } from "../../create"
import { ListTrailClassesInputDTO } from "./dto/list-trail-classes-input-DTO"
import { ListTrailClassesOutputDTO } from "./dto/list-trail-classes-output-DTO"


export class ListTrailClassesUseCase {

    constructor(
        private readonly trailRepository: ITrailRepository
    ) { }

    async execute(input: ListTrailClassesInputDTO): Promise<ListTrailClassesOutputDTO> {

        const trail = await this.trailRepository.findById(input.idTrail)
        if (!trail) throw new TrailNotFoundApplicationException("list-trail-classes-use-case", "1")
        
        const trailClasses = trail.getTrailClasss(); 

        const output: ListTrailClassesOutputDTO = {
            trailClasses
        }

        return output

    }
}