import { Logger } from "@/infra/logs/logger";

export class ContentTypeEmptyDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'ContentTypeEmptyDomainException'

    constructor(filename: string, line: string) {
        super(`Não é possível publicar uma aula com o tipo de conteúdo vazio.`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({line: Number(line), message: "Não é possível publicar uma aula com o tipo de conteúdo vazio."})
    }

}