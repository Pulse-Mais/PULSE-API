import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception"
import { TrailClassBaseEntity } from "./trail-class-base-entity"
 


describe("(UnityTest) - TrailClassBaseEntity \n\n", () => {

    const trailClassBaseEntity = new TrailClassBaseEntity()

    it("(id) - Não deve alterar a aula se o id não for válido", () => {
        expect(() => trailClassBaseEntity.setId("aaaa")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id"))
        expect(() => trailClassBaseEntity.setId("")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id"))
        expect(() => trailClassBaseEntity.setId("12342542")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id"))
    })

    it("(idTrail) - Não deve alterar a aula se idTrail não for válida", () => {
        expect(() => trailClassBaseEntity.setIdTrail("aaaa")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail"))
        expect(() => trailClassBaseEntity.setIdTrail("")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail"))
        expect(() => trailClassBaseEntity.setIdTrail("12342542")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail"))
    })

    it('(title) - Não deve alterar o título caso o título não seja válido', () => {
        expect(() => trailClassBaseEntity.setTitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "74",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
        expect(() => trailClassBaseEntity.setTitle("12342542")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        )
        expect(() => trailClassBaseEntity.setTitle("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        )
    })

    it("(title) - O título não deve conter caracteres inválidos.", () => {
        expect(() => trailClassBaseEntity.setTitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "74",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
    })

    it("(title) - O título não pode conter sequências numéricas.", () => {
        expect(() => trailClassBaseEntity.setTitle("12342542")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        )
    })

    it("(title) - O título não pode ser vazio.", () => {
        expect(() => trailClassBaseEntity.setTitle("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        )
    })

    it('(title) - Deve alterar o título se ele for válido', () => {
        trailClassBaseEntity.setTitle("Como ter mais inteligência emocional?")
        expect(trailClassBaseEntity.getTitle()).toEqual("Como ter mais inteligência emocional?")

        trailClassBaseEntity.setTitle("Inteligência Financeira, e teste. Teste!")
        expect(trailClassBaseEntity.getTitle()).toEqual("Inteligência Financeira, e teste. Teste!")

        trailClassBaseEntity.setTitle("Teste? Teste! Teste. têste ção são")
        expect(trailClassBaseEntity.getTitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailClassBaseEntity.setTitle("canção, são paulo. ácento cràse.")
        expect(trailClassBaseEntity.getTitle()).toEqual("canção, são paulo. ácento cràse.")
    })

    it("(subtitle) - Não deve alterar o subtítulo caso não seja válido", () => {
        expect(() => trailClassBaseEntity.setSubtitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
        expect(() => trailClassBaseEntity.setSubtitle("12342542")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        )

        expect(() => trailClassBaseEntity.setSubtitle("abcd")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )

        expect(() => trailClassBaseEntity.setSubtitle("Você quer um quebrado ou um cara ocupado? Hum Chama o Igor Guilherme de seu namorado, hum Gatinha bronzeada, da cor do pecado Resort em Fortaleza, vários baseado Acordei charrado, comprei três ap na planta Tá mó paz na quebra que nós tá na liderança Pega a vibe Que dentro do cofre tá nosso Rolex Mama, Barbie Enriquecendo, ando sem estresse Domingão no Luciano Hulk Será que a coroa se orgulhou de mim? Hum, o maior inimigo do fim Rock in Rio, depois Vitrinni Meu filho tá boyzin de streaming e eu nesse ritmin DJ Glenner, é o Murillo e LT, vem, vem.")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )

        expect(() => trailClassBaseEntity.setSubtitle("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        )
    })

    it("(subtitle) - O subtítulo não pode conter caracteres inválidos.", () => {
        expect(() => trailClassBaseEntity.setSubtitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
    })

    it("(subtitle) - O subtítulo não pode conter sequências numéricas.", () => {
        expect(() => trailClassBaseEntity.setSubtitle("12342542")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        )
    })

    it("(subtitle) - O subtítulo deve ter entre 5 e 70 caracteres.", () => {
        expect(() => trailClassBaseEntity.setSubtitle("abcd")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )
    })

    it("(subtitle) - O subtítulo não pode ser vazio!", () => {
        expect(() => trailClassBaseEntity.setSubtitle("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        )
    })


    it("(subtitle) - Deve alterar o subtítulo caso seja válido", () => {
        trailClassBaseEntity.setSubtitle("Como ter mais inteligência emocional?")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("Como ter mais inteligência emocional?")

        trailClassBaseEntity.setSubtitle("Inteligência Financeira, e teste. Teste!")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("Inteligência Financeira, e teste. Teste!")

        trailClassBaseEntity.setSubtitle("Teste? Teste! Teste. têste ção são")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailClassBaseEntity.setSubtitle("canção, são paulo. ácento cràse.")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("canção, são paulo. ácento cràse.")
    })


    it("(description) - Não deve alterar a descrição caso não seja válida", () => {
        expect(() => trailClassBaseEntity.setDescription("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )

        expect(() => trailClassBaseEntity.setDescription("1234254210414014010401")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "189",
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        )

        expect(() => trailClassBaseEntity.setDescription("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "166",
                "description",
                `A descrição não pode ser vazia!`
            )
        )
    })

    it("(description) - A descrição não deve ter caracteres inválidos", () => {
        expect(() => trailClassBaseEntity.setDescription("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
    })

    it("(description) - A descrição não pode conter sequências numéricas muito longas.", () => {
        expect(() => trailClassBaseEntity.setDescription("1234254210414014010401")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "189",
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        )
    })

    it("(description) - A descrição não pode ser vazia!", () => {
        expect(() => trailClassBaseEntity.setDescription("")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "166",
                "description",
                `A descrição não pode ser vazia!`
            )
        )
    })


    it("(description) - Deve alterar a descrição caso não seja válida", () => {

        trailClassBaseEntity.setDescription("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

        expect(trailClassBaseEntity.getDescription()).toEqual("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

        trailClassBaseEntity.setDescription("Entre no mundo do desenvolvimento de software com nosso curso de Programação para Iniciantes. A partir de conceitos básicos e linguagens fundamentais, como Python e JavaScript, você aprenderá a construir seus próprios programas e websites do zero. Este curso é projetado para proporcionar uma base sólida em lógica de programação, estruturas de dados e algoritmos, preparando você para sua jornada no campo da tecnologia.")

        expect(trailClassBaseEntity.getDescription()).toEqual("Entre no mundo do desenvolvimento de software com nosso curso de Programação para Iniciantes. A partir de conceitos básicos e linguagens fundamentais, como Python e JavaScript, você aprenderá a construir seus próprios programas e websites do zero. Este curso é projetado para proporcionar uma base sólida em lógica de programação, estruturas de dados e algoritmos, preparando você para sua jornada no campo da tecnologia.")

        trailClassBaseEntity.setDescription("Capture o mundo através de sua lente com nosso curso de Fotografia Digital. Aprenda as técnicas essenciais da fotografia, desde o manuseio da câmera até a composição e edição de imagens. Explore diferentes estilos e gêneros fotográficos e desenvolva seu olhar único como fotógrafo. Este curso é ideal para entusiastas da fotografia de todos os níveis que desejam aprimorar suas habilidades e transformar sua paixão em arte")

        expect(trailClassBaseEntity.getDescription()).toEqual("Capture o mundo através de sua lente com nosso curso de Fotografia Digital. Aprenda as técnicas essenciais da fotografia, desde o manuseio da câmera até a composição e edição de imagens. Explore diferentes estilos e gêneros fotográficos e desenvolva seu olhar único como fotógrafo. Este curso é ideal para entusiastas da fotografia de todos os níveis que desejam aprimorar suas habilidades e transformar sua paixão em arte")
    })

    it("(duration) - Deve converter a duração para um número inteiro de forma automática.", () => {
        trailClassBaseEntity.setDuration(25.522)
        expect(trailClassBaseEntity.getDuration()).toEqual(25)
    })

    it("(duration) - Não deve alterar a duração caso não seja válida", () => {
        expect(() => trailClassBaseEntity.setDuration(0)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "duration",
                `O tempo de duração de uma aula precisa ser igual ou maior a 1 minuto.`
            )
        )

        expect(() => trailClassBaseEntity.setDuration(30.1)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula deve ser igual ou menor que 30 minutos."
            )
        )
    })

    it("(duration) - Não deve alterar a duração caso ela seja igual a zero", () => {
        expect(() => trailClassBaseEntity.setDuration(0)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "140",
                "duration",
                "O tempo de duração de uma aula precisa ser igual ou maior a 1 minuto."
            )
        )
    })

    it("(content) - Uma aula publicada não pode receber um conteúdo vazio", () => {
        trailClassBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClassBaseEntity.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const testingValidContentFirst = new ContentArchiveValueObject(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "filled",
            "pptx"
        )

        trailClassBaseEntity.setContent(testingValidContentFirst)
        trailClassBaseEntity.setStatus("published")

        const invalidContentForPublishedTrailClass = new ContentEmptyValueObject()

        expect(() => trailClassBaseEntity.setContent(invalidContentForPublishedTrailClass)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o tipo do conteúdo vazio.`
            )
        )
    })


    it("(content) - Uma aula publicada não pode receber um conteúdo com o upload ainda em andamento", () => {
        trailClassBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClassBaseEntity.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const testingValidContentFirst = new ContentArchiveValueObject(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "filled",
            "pptx"
        )

        trailClassBaseEntity.setContent(testingValidContentFirst)
        trailClassBaseEntity.setStatus("published")

        const invalidContentForPublishedTrailClass = new ContentArchiveValueObject(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "in-upload",
            "pptx"
        )

        expect(() => trailClassBaseEntity.setContent(invalidContentForPublishedTrailClass)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "content",
                `Não é possível definir o conteúdo de uma aula publicada, com o status do conteúdo como 'in-upload'.`
            )
        )
    })



    it("(status) - Uma aula não pode ter o status 'publicada' com o conteúdo inválido", () => {

        const trailClass = new TrailClassBaseEntity()
        trailClass.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClass.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        trailClass.setStatus("not-published")
        const contentEmpty = new ContentEmptyValueObject()

        trailClass.setContent(contentEmpty)

        expect(() => trailClass.setStatus("published")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "status",
                `status inválido. O status não pode ser "published" se o conteúdo for vazio`
            )
        )

    })

    it("(status) - Uma aula pode ter o status publicada com o conteúdo válido.", () => {

        const trailClass = new TrailClassBaseEntity()
        trailClass.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClass.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")
        trailClass.setStatus("not-published")

        const contentFilled = new ContentArchiveValueObject(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "filled",
            "pptx"
        )

        trailClass.setContent(contentFilled)
        trailClass.setStatus("published")

        expect(trailClass.getStatus()).toBe("published")
    })


    it("(status) - A aula pode ter o status 'not-published', mesmo com conteúdo válido.", () => {
        const trailClass = new TrailClassBaseEntity()
        trailClass.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClass.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const contentFilled = new ContentArchiveValueObject(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "in-upload",
            "pptx"
        )


        trailClass.setContent(contentFilled)
        trailClass.setStatus("not-published")
        expect(trailClass.getStatus()).toBe("not-published")

    })

    it("(status) - Não deve ser possível 'despublicar' uma aula.", () => {
        const trailClass = new TrailClassBaseEntity()
        trailClass.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClass.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const contentFilled = new ContentArchiveValueObject(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "filled",
            "pptx"
        )


        trailClass.setContent(contentFilled)
        trailClass.setStatus("published")

        expect(() => trailClass.setStatus("not-published")).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "status",
                `status inválido. Status: not-published. Não é possível 'despublicar' uma aula já publicada.`
            )
        )
    })

})