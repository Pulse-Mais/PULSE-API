export interface GetUrlForUploadClassArchiveInputDTO {
    idTrail: string
    idTrailClass: string
    archiveExtension:
    | "pptx"
    | "xlsx"
    | "pdf"
    | "empty"
    | "jpg"
    | "jpeg"
    | "png"
    | "svg"
    | "doc"
    | "docx"
    | "xls"
    | "txt";
    type: "video" | "archive"
}

