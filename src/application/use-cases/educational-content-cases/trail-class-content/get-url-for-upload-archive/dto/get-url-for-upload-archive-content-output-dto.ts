import { ContentValueObject } from "@/domain/entity/value-objects/content-value-object";

export interface GetUrlForUploadClassArchiveOutputDTO {
    url: string, 
    content: Partial<ContentValueObject>
}