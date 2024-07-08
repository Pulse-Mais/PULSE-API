import { ITrailRepository } from '@/domain/repository/ITrail-Repository';
import { DeleteTrailUseCaseInputDTO } from './dto/delete-trail-use-case-input-dto';
import { TrailNotFoundApplicationException } from '../publish';
import { DeleteTrailUseCaseOutputDTO } from './dto/delete-trail-use-case-output-dto';
import { Trail } from '@/domain/entity/trail/trail-entity';
import { TrailNotDeletedOnRepositoryApplicationException } from '@/application/application-exceptions/use-cases-application-exceptions/trail-not-deleted-on-repository-app-exception';


export class DeleteTrailUseCase {

    constructor(private readonly trailRepository: ITrailRepository) { }

    async execute(input: DeleteTrailUseCaseInputDTO): Promise<DeleteTrailUseCaseOutputDTO> {
        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) {
            throw new TrailNotFoundApplicationException("delete-trail-use-case", "13");
        }

        const isDeleted: boolean = await this.trailRepository.delete(input.idTrail);
        if (!isDeleted) {
            throw new TrailNotDeletedOnRepositoryApplicationException("delete-trail-use-case", "14");
        }

        const output: DeleteTrailUseCaseOutputDTO = {
            isDeleted
        };

        return output;
    }
}   
