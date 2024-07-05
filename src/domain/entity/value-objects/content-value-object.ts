 



export class Content implements ContentValueObject {
    upload: {
        id: string;
        status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none';
    };
    status: "empty" | "in-upload" | "filled";
    key: string;
    type: "video" | "archive" | "empty";

    constructor(key: string, type: "video" | "archive" | "empty", status: "empty" | "in-upload" | "filled", upload: { id: string; status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none'; }) {
        this.key = key;
        this.type = type;
        this.status = status;
        this.upload = upload;
    }
}
 
export interface ContentValueObject {
    status: "empty" | "in-upload" | "filled";
    key: string
    upload: {
        id: string
        status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none';
    }
    type: "video" | "archive" | "empty", 
}

