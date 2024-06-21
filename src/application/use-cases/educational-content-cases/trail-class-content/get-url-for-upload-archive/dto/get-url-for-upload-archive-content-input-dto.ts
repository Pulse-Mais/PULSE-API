export interface GetUrlForUploadClassArchiveInputDTO {
    idTrail: string
    idTrailClass: string
    archiveExtension:
    | "pptx"
    | "xlsx"
    | "pdf"
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

