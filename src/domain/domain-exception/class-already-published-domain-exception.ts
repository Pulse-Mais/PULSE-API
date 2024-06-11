import { Logger } from "@/infra/logs/logger";

export class ClassAlreadyPublishedDomainException extends Error {
    
    private readonly logger: Logger
    public readonly name = 'ClassAlreadyPublishedDomainException'

    constructor(filename: string, line: string) {
        super(`Não é possível publicar uma aula já publicada!`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({line: Number(line), message: "Não é possível publicar uma aula já publicada!"})
    }

}