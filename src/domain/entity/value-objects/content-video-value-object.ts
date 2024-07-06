
export class ContentVideoValueObject {
    public readonly type: "video" = "video";
    public readonly status: "in-upload" | "filled";
    public key: string
    public uploadId: string
    public uploadStatus: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' 
 
    constructor(key: string, status: "in-upload" | "filled", uploadId: string, uploadStatus: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out') {
        this.status = status;
        this.key = key;
        this.uploadId = uploadId;
        this.uploadStatus = uploadStatus;
    }
}