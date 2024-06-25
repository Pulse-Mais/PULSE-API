



export class Content implements ContentValueObject {
    upload: {
        id: string;
        status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none';
    };
    status: "empty" | "in-upload" | "filled";
    key: string;
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
    type: "video" | "archive" | "empty";

    constructor(key: string, type: "video" | "archive" | "empty", status: "empty" | "in-upload" | "filled", upload: { id: string; status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none'; }, archiveExtension:
        | "pptx"
        | "xlsx"
        | "pdf"
        | "jpg"
        | "jpeg"
        | "empty"
        | "png"
        | "svg"
        | "doc"
        | "docx"
        | "xls"
        | "txt") {
        this.key = key;
        this.type = type;
        this.status = status;
        this.upload = upload;
        this.archiveExtension = archiveExtension;
    }
}

export interface ContentValueObject {
    status: "empty" | "in-upload" | "filled";
    key: string
    upload: {
        id: string
        status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none';
    },
    type: "video" | "archive" | "empty",
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
}

// passo 01: veriofico se a aulaa existe.

// passo 02: chamo o método : videoService.getUrlForUploadVideoContent()

// verifico se o retorno é válido:

// url: uploadUrl,
// idUpload: response.id

// passo 04, recrio o value object content com as infos retornadas

// interface ContentPosReq {
//     status: "in-upload",
//     key: "empty"
//     upload: {
//         id: response.id
//         status: 'waiting'
//     }
//     type: "video"
//     format: "video"
// }

// chamo o método uploadContent do domain service, enviando o novo content.

// depois só salvo a entidade aula atualizada no banco.

// por fim, apenas retorno a url de upload pro usuário.


// agora fazendo uma requisição pra obter uma aula.

// controller chama o query-service. ou um DAO, tanto faz.

// dao chama o repository courseRepository.findById(idCourse)

// query:

// select * from course where id = $idCourse

// tabela course:

    interface CourseTable {
    id: string;
    idTrail: string
    title: string
    description?: string
    subtitle: string
    status: "published" | "not-published"
    course_storage_key?: string;
    content_status: "empty" | "in-upload" | "filled";
    content_key: string

    content_upload_id: string
    content_upload_status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out' | 'none';

    content_type: "video" | "archive" | "empty",
    content_format: "planilha" | "pdf" | "slides" | "video"| "empty"
    createAt: Date;
    updateAt: Date;

    }

// // select a.*,
//         b.status as content_status,
//         b.key as content_key,
//         b.type as content_type,
//         b.format as content_format,
//         c.upload_id as content_upload_id,
//         c.upload_status as content_upload_status
//     from course a
//     inner join content b on a.id = b.id_course
//     inner join content_upload c on b.id = c.id
//     where a.id = $idCourse
















// status: 'waiting',
// id: 'PJtqR02wmmEXkxE5jI46EJTKJMh02QgGKWnkBOhwsSO7Y',

// export interface Upload {
//     /**
//      * Unique identifier for the Direct Upload.
//      */
//     id: string;

//     /**
//      * If the upload URL will be used in a browser, you must specify the origin in
//      * order for the signed URL to have the correct CORS headers.
//      */
//     cors_origin: string;

//     status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out';

//     /**
//      * Max time in seconds for the signed upload URL to be valid. If a successful
//      * upload has not occurred before the timeout limit, the direct upload is marked
//      * `timed_out`
//      */
//     timeout: number;

//     /**
//      * The URL to upload the associated source media to.
//      */
//     url: string;

//     /**
//      * Only set once the upload is in the `asset_created` state.
//      */
//     asset_id?: string;

//     /**
//      * Only set if an error occurred during asset creation.
//      */
//     error?: Upload.Error;

//     new_asset_settings?: AssetsAPI.Asset;

//     /**
//      * Indicates if this is a test Direct Upload, in which case the Asset that gets
//      * created will be a `test` Asset.
//      */
//     test?: boolean;
//   }