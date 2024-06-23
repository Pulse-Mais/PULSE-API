export interface PublishTrailClassOutputDTO {
    idTrail: string
    idTrailClass: string
    title: string
    status: string
    content: {
        key: string,
        contentStatus: "empty" | "in-upload" | "filled"
        type: string
    }
    release: {
        schedule: Date
        releaseStatus: "locked" | "unlocked"
    }
}
 