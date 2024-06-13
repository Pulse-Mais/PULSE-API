

// trail-storage-key-empty-or-null-app-exception.ts

import { Logger } from "@/infra/logs/logger";


export class TrailStorageKeyEmptyApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailStorageKeyEmptyApplicationException'

    constructor(filename: string, line: string) {
        super(`A chave de armazenamento de aulas e conteúdos da trilha está vazia!`);
        this.logger = new Logger("application", filename, line)
    }

}