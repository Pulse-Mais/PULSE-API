import { Content, ContentValueObject } from "../value-objects/content-value-object"
import { ReleaseValueObject } from "../value-objects/release-value-object"


export interface CreateTrailClassInput {
    idTrail: string
    trailStorageKey: string,
    title: string
    description: string
    subtitle: string
}

export interface RestoreTrailClassInput {

    id: string
    idTrail: string

    title: string
    description: string
    subtitle: string

    trailClassStorageKey: string
    content: ContentValueObject
    status: "published" | "not-published"
    release: ReleaseValueObject
    createAt: string;
    updateAt: string;
}

export interface SetTrailClassContentInput {
    readonly key: string,
    readonly type: "empty" | "video" | "archive" 
    readonly format: "planilha" | "pdf" | "slides" | "video"| "empty"
    readonly status: "empty" | "filled"
}