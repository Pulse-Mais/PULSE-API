

// trail-storage-key-empty-or-null-app-exception.ts

import { Logger } from "@/infra/logs/logger";


export class TrailClassStorageKeyEmptyApplicationException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'TrailClassStorageKeyEmptyApplicationException'

    constructor(filename: string, line: string) {
        super(`A chave de armazenamento de conteúdo da aula está vazia!`);
        this.logger = new Logger("application", filename, line)
    }

}