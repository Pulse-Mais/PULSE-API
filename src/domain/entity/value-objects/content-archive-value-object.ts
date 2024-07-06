
export class ContentArchiveValueObject {
    public readonly type: "archive" = "archive";
    public readonly status: "in-upload" | "filled";
    public key: string
    public format: "pptx" | "xlsx" | "pdf" | "jpg" | "jpeg" | "png" | "svg" | "doc" | "docx" | "xls" | "txt"

    constructor(
        key: string, 
        status: "in-upload" | "filled", 
        format: "pptx" | "xlsx" | "pdf" | "jpg" | "jpeg" | "png" | "svg" | "doc" | "docx" | "xls" | "txt"
    ) {
        this.status = status;
        this.format = format;

        this.key = key;
    }

}

