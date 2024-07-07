
import { Logger } from "@/infra/logs/logger";

export class TrailInvalidUpdateDomainException extends Error {
    private readonly logger: Logger
    public readonly name = 'TrailInvalidUpdateDomainException'

    constructor(filename: string, line: string) {
        super(`Não é possível atualizar uma trilha sem enviar as informações das propriedades que serão atualizadas.`);
        this.logger = new Logger("domain", filename, line)
        this.logger.error({
            line: Number(line),
            message: `Não é possível atualizar uma trilha sem enviar as informações das propriedades que serão atualizadas.`
        })
    }
}