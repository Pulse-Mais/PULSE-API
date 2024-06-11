import { ContentValueObject } from '../../../../../../domain/entity/value-objects/content-value-object';

export interface UpdateTrailClassVideoContentOutputDTO {
    idTrail: string
    idTrailClass: string
    status: string
    content: Partial<ContentValueObject>
}
