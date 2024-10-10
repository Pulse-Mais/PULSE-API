import { ContentArchiveValueObject } from '@/domain/entity/value-objects/content-archive-value-object';

export interface GetUrlForUploadClassArchiveOutputDTO {
    url: string,
    content: ContentArchiveValueObject
}