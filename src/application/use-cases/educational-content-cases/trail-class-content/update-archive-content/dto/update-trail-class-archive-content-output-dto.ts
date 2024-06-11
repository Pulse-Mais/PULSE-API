import { ContentValueObject } from "../../get-url-for-upload-archive"

export interface UpdateTrailClassArchiveContentOutputDTO {
    idTrail: string
    idTrailClass: string
    status: string
    content: Partial<ContentValueObject>
}
