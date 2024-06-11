
// trail-folder-not-avaibility-application-exception.ts

import { Logger } from "@/infra/logs/logger";


export class TrailFolderNotAvaibilityApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailFolderNotAvaibilityApplicationException'

    constructor(filename: string, line: string) {
        super(`A partição da trilha não foi encontrada no sistema de armazenamento de conteúdo`);
        this.logger = new Logger("application", filename, line)
    }

}