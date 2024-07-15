
export interface ReadTrailClassesByContentTypeUseCaseInputDTO {
    idTrail: string;
    contentType: "archive" | "empty" | "video" | "article";
}