import { InvalidTrailDomainException } from "@/domain/domain-exception/invalid-trail-domain-exception"
import { TrailBaseEntity } from "./trail-base-entity"
import { TrailClassBaseEntity } from "../trail-class/trail-class-base-entity"
import { Content } from "../value-objects/content-value-object"
import { TrailClass } from "../trail-class/trail-class-entity"


describe("(UnityTest) - TrailBaseEntity \n\n", () => {

    const trailBaseEntity = new TrailBaseEntity()


    it("(id) - Não deve alterar o id se ele não for válido", () => {
        expect(() => trailBaseEntity.setId("aaaa")).toThrow(new InvalidTrailDomainException("trail-base-entity.ts", "35", "id"))
        expect(() => trailBaseEntity.setId("")).toThrow(new InvalidTrailDomainException("trail-base-entity.ts", "35", "id"))
        expect(() => trailBaseEntity.setId("12342542")).toThrow(new InvalidTrailDomainException("trail-base-entity.ts", "35", "id"))
    })

    it('(title) - Não deve alterar o título caso o título não seja válido', () => {
        expect(() => trailBaseEntity.setTitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "74",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
        expect(() => trailBaseEntity.setTitle("12342542")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        )
        expect(() => trailBaseEntity.setTitle("")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        )
    })

    it("(title) - O título não deve conter caracteres inválidos.", () => {
        expect(() => trailBaseEntity.setTitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "74",
                "title",
                `O título contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
    })

    it("(title) - O título não pode conter sequências numéricas.", () => {
        expect(() => trailBaseEntity.setTitle("12342542")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "85",
                "title",
                `O título não pode conter sequências numéricas.`
            )
        )
    })

    it("(title) - O título não pode ser vazio.", () => {
        expect(() => trailBaseEntity.setTitle("")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "55",
                "title",
                "O título não pode ser vazio!"
            )
        )
    })

    it('(title) - Deve alterar o título se ele for válido', () => {
        trailBaseEntity.setTitle("Como ter mais inteligência emocional?")
        expect(trailBaseEntity.getTitle()).toEqual("Como ter mais inteligência emocional?")

        trailBaseEntity.setTitle("Inteligência Financeira, e teste. Teste!")
        expect(trailBaseEntity.getTitle()).toEqual("Inteligência Financeira, e teste. Teste!")

        trailBaseEntity.setTitle("Teste? Teste! Teste. têste ção são")
        expect(trailBaseEntity.getTitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailBaseEntity.setTitle("canção, são paulo. ácento cràse.")
        expect(trailBaseEntity.getTitle()).toEqual("canção, são paulo. ácento cràse.")
    })

    it("(subtitle) - Não deve alterar o subtítulo caso não seja válido", () => {
        expect(() => trailBaseEntity.setSubtitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
        expect(() => trailBaseEntity.setSubtitle("12342542")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        )

        expect(() => trailBaseEntity.setSubtitle("abcd")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )

        expect(() => trailBaseEntity.setSubtitle("Você quer um quebrado ou um cara ocupado? Hum Chama o Igor Guilherme de seu namorado, hum Gatinha bronzeada, da cor do pecado Resort em Fortaleza, vários baseado Acordei charrado, comprei três ap na planta Tá mó paz na quebra que nós tá na liderança Pega a vibe Que dentro do cofre tá nosso Rolex Mama, Barbie Enriquecendo, ando sem estresse Domingão no Luciano Hulk Será que a coroa se orgulhou de mim? Hum, o maior inimigo do fim Rock in Rio, depois Vitrinni Meu filho tá boyzin de streaming e eu nesse ritmin DJ Glenner, é o Murillo e LT, vem, vem.")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )

        expect(() => trailBaseEntity.setSubtitle("")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        )
    })

    it("(subtitle) - O subtítulo não pode conter caracteres inválidos.", () => {
        expect(() => trailBaseEntity.setSubtitle("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "131",
                "subtitle",
                `O subtítulo contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
    })

    it("(subtitle) - O subtítulo não pode conter sequências numéricas.", () => {
        expect(() => trailBaseEntity.setSubtitle("12342542")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "140",
                "subtitle",
                `O subtítulo não pode conter sequências numéricas.`
            )
        )
    })

    it("(subtitle) - O subtítulo deve ter entre 5 e 70 caracteres.", () => {
        expect(() => trailBaseEntity.setSubtitle("abcd")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "149",
                "subtitle",
                `O subtítulo deve ter entre 5 e 70 caracteres.`
            )
        )
    })

    it("(subtitle) - O subtítulo não pode ser vazio!", () => {
        expect(() => trailBaseEntity.setSubtitle("")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "113",
                "subtitle",
                `O subtítulo não pode ser vazio!`
            )
        )
    })

    it("(subtitle) - Deve alterar o subtítulo caso seja válido", () => {
        trailBaseEntity.setSubtitle("Como ter mais inteligência emocional?")
        expect(trailBaseEntity.getSubtitle()).toEqual("Como ter mais inteligência emocional?")

        trailBaseEntity.setSubtitle("Inteligência Financeira, e teste. Teste!")
        expect(trailBaseEntity.getSubtitle()).toEqual("Inteligência Financeira, e teste. Teste!")

        trailBaseEntity.setSubtitle("Teste? Teste! Teste. têste ção são")
        expect(trailBaseEntity.getSubtitle()).toEqual("Teste? Teste! Teste. têste ção são")

        trailBaseEntity.setSubtitle("canção, são paulo. ácento cràse.")
        expect(trailBaseEntity.getSubtitle()).toEqual("canção, são paulo. ácento cràse.")
    })


    it("(description) - Não deve alterar a descrição caso não seja válida", () => {
        expect(() => trailBaseEntity.setDescription("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )

        expect(() => trailBaseEntity.setDescription("1234254210414014010401")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "189",
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        )

        expect(() => trailBaseEntity.setDescription("")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "166",
                "description",
                `A descrição não pode ser vazia!`
            )
        )
    })

    it("(description) - A descrição não deve ter caracteres inválidos", () => {
        expect(() => trailBaseEntity.setDescription("////////////aaaaa#$%&")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "180",
                "description",
                `A descrição contém caracteres inválidos. \n Caracteres inválidos encontrados: /`
            )
        )
    })

    it("(description) - A descrição não pode conter sequências numéricas muito longas.", () => {
        expect(() => trailBaseEntity.setDescription("1234254210414014010401")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "189",
                "description",
                `a descrição não pode conter sequências numéricas muito longas.`
            )
        )
    })

    it("(description) - A descrição não pode ser vazia!", () => {
        expect(() => trailBaseEntity.setDescription("")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "166",
                "description",
                `A descrição não pode ser vazia!`
            )
        )
    })


    it("(description) - Deve alterar a descrição caso não seja válida", () => {

        trailBaseEntity.setDescription("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

        expect(trailBaseEntity.getDescription()).toEqual("Eleve sua habilidade financeira com nosso curso de Inteligência Financeira. Ideal para iniciantes ou para aqueles que procuram aprimorar seus conhecimentos, este curso oferece estratégias para gerenciar melhor suas finanças pessoais. Você aprenderá sobre orçamento, investimentos, gestão de dívidas e planejamento financeiro para alcançar a segurança financeira. Transforme sua relação com o dinheiro e tome decisões financeiras mais inteligentes.")

        trailBaseEntity.setDescription("Entre no mundo do desenvolvimento de software com nosso curso de Programação para Iniciantes. A partir de conceitos básicos e linguagens fundamentais, como Python e JavaScript, você aprenderá a construir seus próprios programas e websites do zero. Este curso é projetado para proporcionar uma base sólida em lógica de programação, estruturas de dados e algoritmos, preparando você para sua jornada no campo da tecnologia.")

        expect(trailBaseEntity.getDescription()).toEqual("Entre no mundo do desenvolvimento de software com nosso curso de Programação para Iniciantes. A partir de conceitos básicos e linguagens fundamentais, como Python e JavaScript, você aprenderá a construir seus próprios programas e websites do zero. Este curso é projetado para proporcionar uma base sólida em lógica de programação, estruturas de dados e algoritmos, preparando você para sua jornada no campo da tecnologia.")

        trailBaseEntity.setDescription("Capture o mundo através de sua lente com nosso curso de Fotografia Digital. Aprenda as técnicas essenciais da fotografia, desde o manuseio da câmera até a composição e edição de imagens. Explore diferentes estilos e gêneros fotográficos e desenvolva seu olhar único como fotógrafo. Este curso é ideal para entusiastas da fotografia de todos os níveis que desejam aprimorar suas habilidades e transformar sua paixão em arte")

        expect(trailBaseEntity.getDescription()).toEqual("Capture o mundo através de sua lente com nosso curso de Fotografia Digital. Aprenda as técnicas essenciais da fotografia, desde o manuseio da câmera até a composição e edição de imagens. Explore diferentes estilos e gêneros fotográficos e desenvolva seu olhar único como fotógrafo. Este curso é ideal para entusiastas da fotografia de todos os níveis que desejam aprimorar suas habilidades e transformar sua paixão em arte")
    })

    it("(TrailStorageKey) - Não deve alterar a key da trilha caso a key não for válida", () => {
        trailBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")

        const emptyKey = ""
        expect(() => trailBaseEntity.setStorageKey(emptyKey)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const invalidPatternKey = "12342542"
        expect(() => trailBaseEntity.setStorageKey(invalidPatternKey)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const keyWithInvalidIdTrail = "trilhas/trail-20e32e4c-568a-4779-b089-923148d32a97/"
        expect(() => trailBaseEntity.setStorageKey(keyWithInvalidIdTrail)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `O id da trilha presente na key da trilha não é igual ao id da trilha.`
            )
        )

        const keyWithInvalidPrefix = "tracks/trail-0799d17e-7e55-4d74-99d7-ab07de38ad7e"
        expect(() => trailBaseEntity.setStorageKey(keyWithInvalidPrefix)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `o prexifo da key é inválido.`
            )
        )

        const keyWithInvalidFormat = "trilhas/trail-0799d17e-7e55-4d74-99d7-ab07de38ad7ex"
        expect(() => trailBaseEntity.setStorageKey(keyWithInvalidFormat)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `O formato do id da trilha presente da key da trilha é inválido.`
            )
        )
    })

    it("(TrailStorageKey) - O prexifo da key precisa ser válido", () => {
        trailBaseEntity.setId("07e4779b-8ab7-4d95-9905-d88c9aef924c")

        const emptyKey = ""
        expect(() => trailBaseEntity.setStorageKey(emptyKey)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `o prexifo da key é inválido.`
            )
        )
    })

    it("(TrailStorageKey) - O id da trilha presente na key da trilha precisa ser igual ao id da trilha na trilha.", () => {
        trailBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")

        const keyWithInvalidIdTrail = "trilhas/trail-20e32e4c-568a-4779-b089-923148d32a97/"
        expect(() => trailBaseEntity.setStorageKey(keyWithInvalidIdTrail)).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailStorageKey",
                `O id da trilha presente na key da trilha não é igual ao id da trilha.`
            )
        )
    })

    it("(TrailStorageKey) - Deve alterar a key da trilha, caso a key seja válida", () => {

        trailBaseEntity.setId("67e32e4c-568a-4779-b089-923148d32a97")
        const validKey = "trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/"

        trailBaseEntity.setStorageKey(validKey)
        console.log(trailBaseEntity.getStorageKey())
        expect(trailBaseEntity.getStorageKey()).toEqual(validKey)
    })

    it("(status) - Uma trilha não pode ter o status 'publicada' com caso não tenha ao menos uma aula publicada", () => {

        const trail = new TrailBaseEntity()
        trail.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trail.setStatus("not-published")
        
        const trailClass = TrailClass.create({
            idTrail: "67e32e4c-568a-4779-b089-923148d32a97",
            trailStorageKey: "trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/",
            title: "Teste? Teste! Teste. têste ção são",
            subtitle: "canção, são paulo. ácento cràse.",        
            description: "Teste teste teste",
            duration: 10,
        })

        const contentFilled = new Content(
            `trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/trailClass-${trailClass.getId()}/`,
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        trailClass.setContent(contentFilled)
        trail.setTrailClasses([trailClass])
        
        expect(() => trail.setStatus("published")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "status",
                `status inválido. O status não pode ser "published" se a trilha não tiver ao menos uma aula publicada.`
            )
        )

    })

    
    it("(status) - Uma trilha pode ser publicada caso tenha ao menos uma aula publicada", () => {

        const trail = new TrailBaseEntity()
        trail.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trail.setStatus("not-published")
        
        const trailClass = TrailClass.create({
            idTrail: "67e32e4c-568a-4779-b089-923148d32a97",
            trailStorageKey: "trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/",
            title: "Teste? Teste! Teste. têste ção são",
            subtitle: "canção, são paulo. ácento cràse.",        
            description: "Teste teste teste",
            duration: 10,
        })

        const contentFilled = new Content(
            `trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/trailClass-${trailClass.getId()}/`,
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        trailClass.setContent(contentFilled)
        trailClass.setStatus("published")
        trail.setTrailClasses([trailClass])

        trail.setStatus("published")

        expect(trail.getStatus()).toBe("published")

    })


    it("(status) - Não deve ser possível 'despublicar' uma trilha.", () => {
        const trail = new TrailBaseEntity()
        trail.setId("67e32e4c-568a-4779-b089-923148d32a97")
        trail.setStatus("not-published")
        
        const trailClass = TrailClass.create({
            idTrail: "67e32e4c-568a-4779-b089-923148d32a97",
            trailStorageKey: "trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/",
            title: "Teste? Teste! Teste. têste ção são",
            subtitle: "canção, são paulo. ácento cràse.",        
            description: "Teste teste teste",
            duration: 10,
        })

        const contentFilled = new Content(
            `trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/trailClass-${trailClass.getId()}/`,
            "archive",
            "filled",
            {
                id: "id",
                status: "none",
            }
        )

        trailClass.setContent(contentFilled)
        trailClass.setStatus("published")
        trail.setTrailClasses([trailClass])

        trail.setStatus("published")

        expect(trail.getStatus()).toBe("published")

        expect(() => trail.setStatus("not-published")).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "status",
                `status inválido. Status: not-published. Não é possível 'despublicar' uma trilha já publicada.`
            )
        )
    })

    it("(TrailClasses) - Não deve ser possível atribuir uma aula que não pertence a uma trilha.", () => {
        const trail = new TrailBaseEntity()
        trail.setId("67e32e4c-568a-4779-b089-923148d32a97")

        const trailClass = TrailClass.create({
            idTrail: "10e32e4c-568a-4779-b089-923148d32a97",
            trailStorageKey: "trilhas/trail-10e32e4c-568a-4779-b089-923148d32a97/",
            title: "Teste? Teste! Teste. têste ção são",
            subtitle: "canção, são paulo. ácento cràse.",        
            description: "Teste teste teste",
            duration: 10,
        })

        expect(() => trail.setTrailClasses([trailClass])).toThrow(
            new InvalidTrailDomainException(
                "trail-base-entity.ts",
                "241",
                "trailClasses",
                `A trilha contém trilhas de outra trilha. trilhas inválidas encontradas: ${trailClass}`
            )
        )

    })

    it("(TrailClasses) - Deve ser possível atribuir uma aula que pertence a uma trilha.", () => {
        const trail = new TrailBaseEntity()
        trail.setId("67e32e4c-568a-4779-b089-923148d32a97")

        const trailClass = TrailClass.create({
            idTrail: "67e32e4c-568a-4779-b089-923148d32a97",
            trailStorageKey: "trilhas/trail-67e32e4c-568a-4779-b089-923148d32a97/",
            title: "Teste? Teste! Teste. têste ção são",
            subtitle: "canção, são paulo. ácento cràse.",        
            description: "Teste teste teste",
            duration: 10,
        })

        trail.setTrailClasses([trailClass])
        expect(trail.getTrailClasses()).toEqual([trailClass])
    })

})  