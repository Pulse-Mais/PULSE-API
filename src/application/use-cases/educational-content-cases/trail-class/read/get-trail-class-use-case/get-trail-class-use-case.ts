import { ContentValueObject } from '@/domain/entity/value-objects/content-value-object';
import { Trail } from '@/domain/entity/trail/trail-entity';
import { TrailClass } from '@/domain/entity/trail-class/trail-class-entity';
import { TrailClassDomainService } from './../../../../../../domain/domain-services/trail-class-domain-service';
import { ITrailRepository } from './../../../../../../domain/repository/ITrail-Repository';
import { GetTrailClassInputDTO } from './dto/get-trail-class-input-DTO';
import { GetTrailClassOutputDTO } from './dto/get-trail-class-output-DTO';
import { TrailNotFoundApplicationException } from '../../create';
import { IContentDeliveryNetworkingService } from '@/application/interfaces/IContent-delivery-networking-service';
import { TrailClassNotFoundOnTrailDomainException } from '@/domain/domain-exception/trail-class-not-found-on-trail-domain-exception';


export class GetTrailClassUseCase {

    constructor(private readonly trailRepository: ITrailRepository, private readonly contentDeliveryService: IContentDeliveryNetworkingService) { }

    async execute(input: GetTrailClassInputDTO): Promise<GetTrailClassOutputDTO> {

        const trail: Trail | null = await this.trailRepository.findById(input.idTrail);
        if (!trail) throw new TrailNotFoundApplicationException("get-trail-class-use-case.ts", "16")

        const trailClass: TrailClass | null = trail.getTrailClassById(input.idTrailClass);
        if (!trailClass) throw new TrailClassNotFoundOnTrailDomainException("get-trail-class-use-case.ts", "19");

        const content: ContentValueObject = trailClass.getContent()!;

        if (content.status === 'filled') {
            console.log(content, "AAAAAAAAAAAAAAA")
            return await this.returnWithSignedContentUrl(trail, input.idTrailClass, content.key);
        }

        const output: GetTrailClassOutputDTO = {
            trailClass
        }

        return output;
    }

    private async returnWithSignedContentUrl(trail: Trail, idTrailClass: string, contentKey: string) {
        
        const domainService: TrailClassDomainService = new TrailClassDomainService();

        const signedContentKeyUrl: string = await this.contentDeliveryService.generateContentSignedUrl(contentKey);
        const newContent: ContentValueObject = domainService.createdFilledArchiveContentObject(trail, idTrailClass, signedContentKeyUrl);

        const trailClassWithSignedContentUrl: TrailClass = domainService.updateTrailClassContent(trail, idTrailClass, newContent);

        const output: GetTrailClassOutputDTO = {
            trailClass: trailClassWithSignedContentUrl
        }

        return output;
    }



}