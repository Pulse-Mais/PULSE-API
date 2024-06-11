

 

import { Logger } from "@/infra/logs/logger";


export class TrailClassPartionNotCreatedApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailClassPartionNotCreatedApplicationException'

    constructor(filename: string, line: string) {
        super(`A partição da aula não foi criada no sistema de armazenamento`);
        this.logger = new Logger("application", filename, line)
    }

}