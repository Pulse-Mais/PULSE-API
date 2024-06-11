import { ITrailRepository } from './../../../../../../domain/repository/ITrail-Repository';
import { TrailClassNotFoundOnTrailDomainException } from '../../../trail-class-content/get-url-for-upload-archive';
import { GetTrailClassInputDTO } from './dto/get-trail-class-input-DTO';
import { GetTrailClassOutputDTO } from './dto/get-trail-class-output-DTO';
import { TrailNotFoundApplicationException } from '../../create';


export class GetTrailClassUseCase {

    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: GetTrailClassInputDTO): Promise<GetTrailClassOutputDTO> {

        const trail = await this.trailRepository.findById(input.idTrail);
        if (!trail) throw new TrailNotFoundApplicationException("get-trail-class-use-case.ts", "16")

        const trailClass = trail.getTrailClassById(input.idTrailClass);
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("get-trail-class-use-case.ts", "19");

        const output: GetTrailClassOutputDTO = {
            trailClass
        }

        return output;
    }
}   