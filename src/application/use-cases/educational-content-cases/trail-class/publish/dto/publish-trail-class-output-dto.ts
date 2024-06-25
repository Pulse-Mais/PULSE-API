export interface PublishTrailClassOutputDTO {
    idTrail: string
    idTrailClass: string
    title: string
    status: string
    content: {
        key: string,
        contentStatus: "empty" | "in-upload" | "filled"
        type: string
        // format: string AQUI
    }
    release: {
        schedule: Date
        releaseStatus: "locked" | "unlocked"
    }
}
 