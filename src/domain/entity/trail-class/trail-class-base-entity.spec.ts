import { InvalidTrailClassPropetyDomainException } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception"
import { TrailClassBaseEntity } from "./trail-class-base-entity"
import { Content } from "../value-objects/content-value-object"
import { Release } from "../value-objects/release-value-object"



describe("TrailClassBaseEntity", () => {

    const trailClassBaseEntity = new TrailClassBaseEntity()

    it("Não deve alterar a aula se o id não for válido", () => {
        expect(() => trailClassBaseEntity.setId("aaaa")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id"))
        expect(() => trailClassBaseEntity.setId("")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id"))
        expect(() => trailClassBaseEntity.setId("12342542")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "35", "id"))
    })

    it("Não deve alterar a aula se idTrail não for válida", () => {
        expect(() => trailClassBaseEntity.setIdTrail("aaaa")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail"))
        expect(() => trailClassBaseEntity.setIdTrail("")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail"))
        expect(() => trailClassBaseEntity.setIdTrail("12342542")).toThrow(new InvalidTrailClassPropetyDomainException("trail-class-base-entity.ts", "47", "idTrail"))
    })

    it('Não deve alterar o título caso o título não seja válido', () => {
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

    it('Deve alterar o título se ele for válido', () => {
        trailClassBaseEntity.setTitle("Como ter mais inteligência emocional?")
        expect(trailClassBaseEntity.getTitle()).toEqual("Como ter mais inteligência emocional?")

        trailClassBaseEntity.setTitle("Inteligência Financeira, e teste. Teste!")
        expect(trailClassBaseEntity.getTitle()).toEqual("Inteligência Financeira, e teste. Teste!")

        trailClassBaseEntity.setTitle("Teste? Teste! Teste. têste ção são")
        expect(trailClassBaseEntity.getTitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailClassBaseEntity.setTitle("canção, são paulo. ácento cràse.")
        expect(trailClassBaseEntity.getTitle()).toEqual("canção, são paulo. ácento cràse.")
    })


    it("Não deve alterar o subtítulo caso não seja válido", () => {
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


    it("Deve alterar o subtítulo caso seja válido", () => {
        trailClassBaseEntity.setSubtitle("Como ter mais inteligência emocional?")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("Como ter mais inteligência emocional?")

        trailClassBaseEntity.setSubtitle("Inteligência Financeira, e teste. Teste!")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("Inteligência Financeira, e teste. Teste!")

        trailClassBaseEntity.setSubtitle("Teste? Teste! Teste. têste ção são")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailClassBaseEntity.setSubtitle("canção, são paulo. ácento cràse.")
        expect(trailClassBaseEntity.getSubtitle()).toEqual("canção, são paulo. ácento cràse.")
    })


    it("Não deve alterar a descrição caso não seja válida", () => {
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

    it("Deve alterar a descrição caso não seja válida", () => {

        trailClassBaseEntity.setDescription("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

        expect(trailClassBaseEntity.getDescription()).toEqual("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

        trailClassBaseEntity.setDescription("Entre no mundo do desenvolvimento de software com nosso curso de Programação para Iniciantes. A partir de conceitos básicos e linguagens fundamentais, como Python e JavaScript, você aprenderá a construir seus próprios programas e websites do zero. Este curso é projetado para proporcionar uma base sólida em lógica de programação, estruturas de dados e algoritmos, preparando você para sua jornada no campo da tecnologia.")

        expect(trailClassBaseEntity.getDescription()).toEqual("Entre no mundo do desenvolvimento de software com nosso curso de Programação para Iniciantes. A partir de conceitos básicos e linguagens fundamentais, como Python e JavaScript, você aprenderá a construir seus próprios programas e websites do zero. Este curso é projetado para proporcionar uma base sólida em lógica de programação, estruturas de dados e algoritmos, preparando você para sua jornada no campo da tecnologia.")

        trailClassBaseEntity.setDescription("Capture o mundo através de sua lente com nosso curso de Fotografia Digital. Aprenda as técnicas essenciais da fotografia, desde o manuseio da câmera até a composição e edição de imagens. Explore diferentes estilos e gêneros fotográficos e desenvolva seu olhar único como fotógrafo. Este curso é ideal para entusiastas da fotografia de todos os níveis que desejam aprimorar suas habilidades e transformar sua paixão em arte")

        expect(trailClassBaseEntity.getDescription()).toEqual("Capture o mundo através de sua lente com nosso curso de Fotografia Digital. Aprenda as técnicas essenciais da fotografia, desde o manuseio da câmera até a composição e edição de imagens. Explore diferentes estilos e gêneros fotográficos e desenvolva seu olhar único como fotógrafo. Este curso é ideal para entusiastas da fotografia de todos os níveis que desejam aprimorar suas habilidades e transformar sua paixão em arte")
    })

    it("Não deve alterar a key da aula caso a key não for válida", () => {
        trailClassBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClassBaseEntity.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")
        
        const emptyKey = ""
        expect(() => trailClassBaseEntity.setTrailClassStorageKey(emptyKey)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const invalidPatternKey = "12342542"
        expect(() => trailClassBaseEntity.setTrailClassStorageKey(invalidPatternKey)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const keyWithInvalidIdTrailClass = "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-07e4779b-8ab7-4d95-9905-d88c9aef924c/content.jpg"
        expect(() => trailClassBaseEntity.setTrailClassStorageKey(keyWithInvalidIdTrailClass)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `O id da aula presente na key da aula não é igual ao id da aula.`
            )
        )

        const keyWithInvalidIdTrail = "trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/trailClass-67e32e4c-568a-4779-b089-923148d32a97/content.jpg"
        expect(() => trailClassBaseEntity.setTrailClassStorageKey(keyWithInvalidIdTrail)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const keyWithInvalidPrefix = "tracks/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
        expect(() => trailClassBaseEntity.setTrailClassStorageKey(keyWithInvalidPrefix)).toThrow(
            new InvalidTrailClassPropetyDomainException(
                "trail-class-base-entity.ts",
                "241",
                "trailClassStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const keyWithInvalidFormat = "trilhas/trail-class-0799d17e-7e55-4d74-99d7-ab07de38ad7ex"
        expect(() => trailClassBaseEntity.setTrailClassStorageKey(keyWithInvalidFormat)).toThrow(InvalidTrailClassPropetyDomainException)
    })

    it("Deve alterar a key da aula, caso a key seja válida", () => {
        
        trailClassBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClassBaseEntity.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")
        const validKey = "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/"

        trailClassBaseEntity.setTrailClassStorageKey(validKey)
        expect(trailClassBaseEntity.getTrailClassStorageKey()).toEqual(validKey)

        const validKeyWithContentCreated = "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/content.pdf"
        trailClassBaseEntity.setTrailClassStorageKey(validKeyWithContentCreated)
        expect(trailClassBaseEntity.getTrailClassStorageKey()).toEqual(validKeyWithContentCreated)
    })


    it("Não deve alterar o conteúdo, caso ele não seja válido", () => {
        trailClassBaseEntity.setId("0799d17e-7e55-4d74-99d7-ab07de38ad7e")

        const invalidContent = new Content(
            "aaaaaaaaaaaaaaaaaaaaaaaaa/aaaaaaaaaaaaaaaaaaaaaaaaaaa/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        expect(() => trailClassBaseEntity.setContent(invalidContent)).toThrow(InvalidTrailClassPropetyDomainException)

        const contentWithEmptyKey = new Content(
            "",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        expect(() => trailClassBaseEntity.setContent(contentWithEmptyKey)).toThrow(InvalidTrailClassPropetyDomainException)

        const contentWithInvalidIdTrailOnKey = new Content(
            "trilhas/trail-aaaaa/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        expect(() => trailClassBaseEntity.setContent(contentWithInvalidIdTrailOnKey)).toThrow(InvalidTrailClassPropetyDomainException)

        const contentWithInvalidIdTrailClassOnKey = new Content(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-aaaaa/",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        expect(() => trailClassBaseEntity.setContent(contentWithInvalidIdTrailClassOnKey)).toThrow(InvalidTrailClassPropetyDomainException)

        const contentWithInvalidIdTrailOnKeyAndIdTrailClassOnKey = new Content(
            "trilhas/trail-aaaaa/trailClass-aaaaa/",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        expect(() => trailClassBaseEntity.setContent(contentWithInvalidIdTrailOnKeyAndIdTrailClassOnKey)).toThrow(InvalidTrailClassPropetyDomainException)

        trailClassBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClassBaseEntity.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const testingValidContentFirst = new Content(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        trailClassBaseEntity.setContent(testingValidContentFirst)
        trailClassBaseEntity.setStatus("published")

        const invalidContentForPublishedTrailClass = new Content(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "archive",
            "empty",
            {
                id: "id",
                status: "none",
            }
        )

        expect(() => trailClassBaseEntity.setContent(invalidContentForPublishedTrailClass)).toThrow(InvalidTrailClassPropetyDomainException)
    })

    it("Deve alterar o conteúdo, caso ele seja válido", () => {
        trailClassBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trailClassBaseEntity.setIdTrail("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const validContent = new Content(
            "trilhas/trail-07e4779b-8ab7-4d95-9905-d88c9aef924c/trailClass-67e32e4c-568a-4779-b089-923148d32a97/",
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )
        trailClassBaseEntity.setContent(validContent)
        expect(trailClassBaseEntity.getContent()).toEqual(validContent)
    })

})