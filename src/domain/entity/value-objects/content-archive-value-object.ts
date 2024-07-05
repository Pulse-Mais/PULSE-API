


export class ContentArchiveValueObject {
    status: "in-upload" | "filled";
    key: string
    type = "archive"
    format: "pptx" | "xlsx" | "pdf" | "jpg" | "jpeg" | "png" | "svg" | "doc" | "docx" | "xls" | "txt"

    constructor(key: string, status: "in-upload" | "filled", format: "pptx" | "xlsx" | "pdf" | "jpg" | "jpeg" | "png" | "svg" | "doc" | "docx" | "xls" | "txt") {
        this.key = key;
        this.status = status;
        this.format = format;
    }
}

