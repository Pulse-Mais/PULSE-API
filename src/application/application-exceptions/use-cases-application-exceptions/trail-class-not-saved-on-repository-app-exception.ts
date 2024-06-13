

 

import { Logger } from "@/infra/logs/logger";


export class TrailClassNotSavedOnRepositoryApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailClassNotSavedOnRepositoryApplicationException'

    constructor(filename: string, line: string) {
        super(`A aula não foi salva no sistema de armazenamento`);
        this.logger = new Logger("application", filename, line)
    }

}