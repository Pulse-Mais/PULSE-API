import { ContentValueObject } from "@/domain/entity/value-objects/content-value-object";

export interface GetUrlForUploadClassVideoContentOutputDTO {
    url: string, 
    content: Partial<ContentValueObject>
}