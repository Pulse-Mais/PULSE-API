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
    createAt: Date | string;
    updateAt: Date | string;
}

export interface SetTrailClassContentInput {
    readonly key: string,
    readonly type: "empty" | "video" | "archive" 
    readonly format: "pptx"
    | "xlsx"
    | "empty"
    | "pdf"
    | "jpg"
    | "jpeg"
    | "png"
    | "svg"
    | "doc"
    | "docx"
    | "xls"
    | "txt";
    readonly archiveExtension:
    "pptx"
    | "xlsx"
    | "empty"
    | "pdf"
    | "jpg"
    | "jpeg"
    | "png"
    | "svg"
    | "doc"
    | "docx"
    | "xls"
    | "txt";
    readonly status: "empty" | "filled"
}