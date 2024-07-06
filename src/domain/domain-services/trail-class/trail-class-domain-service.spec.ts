import { ContentEmptyValueObject } from '@/domain/entity/value-objects/content-empty-value-object'
import { TrailDomainService } from '../trail/trail-domain-service'
import { CreateTrailClassDomainServiceInput, RestoreTrailClassDomainServiceInput, UpdateTrailClassDomainServiceInput } from './@types/trail-domain-service-types'
import { TrailClassDomainService } from './trail-class-domain-service'
import { InvalidTrailClassPropetyDomainException } from '@/domain/domain-exception/invalid-trail-class-propety-domain-exception'
import { ClassAlreadyPublishedDomainException } from '@/domain/domain-exception/class-already-published-domain-exception'
import { ContentArticleValueObject } from '@/domain/entity/value-objects/content-article-value-object'
import { ContentArchiveValueObject } from '@/domain/entity/value-objects/content-archive-value-object'

describe('TrailClassDomainService', () => {
  const trailDomainService = new TrailDomainService()
  const trailClassDomainService = new TrailClassDomainService()

  const defaultTrail = trailDomainService.createTrail({
    title: 'Título',
    subtitle: 'Subtítulo',
    description: 'Descrição',
  })

  const defaultTrailClass = trailClassDomainService.createTrailClass({
    idTrail: defaultTrail.getId()!,
    title: 'Título de teste, aaa',
    subtitle: 'Subtítulo teste',
    description: 'Description teste',
    duration: 10,
  })

  defaultTrail.addTrailClass(defaultTrailClass)

  it('(createTrailClass) - Deve ser possível criar uma aula', () => {
    const input: CreateTrailClassDomainServiceInput = {
      idTrail: defaultTrail.getId()!,
      title: 'Título de teste, aaa',
      subtitle: 'Subtítulo teste',
      description: 'Description teste',
      duration: 10,
    }

    const trailClass = trailClassDomainService.createTrailClass(input)

    expect(trailClass).toBeTruthy()
    expect(trailClass.getTitle()).toBe('Título de teste, aaa')
    expect(trailClass.getSubtitle()).toBe('Subtítulo teste')
    expect(trailClass.getDescription()).toBe('Description teste')
    expect(trailClass.getDuration()).toBe(10)
  })


  it('(createTrailClass) - Não deve ser possível criar uma aula com parâmetros inválidos', () => {
    const input: CreateTrailClassDomainServiceInput = {
      idTrail: defaultTrail.getId()!,
      title: '25930295325',
      subtitle: 'Subtítulo teste',
      description: 'aaaaaaaaaaaaaaaaaa',
      duration: 0,
    }

    expect(() => trailClassDomainService.createTrailClass(input)).toThrow()
  })

  it('(restoreTrailClass) - Deve ser possível restaurar uma aula', () => {
    const input: RestoreTrailClassDomainServiceInput = {
      id: defaultTrailClass.getId()!,
      idTrail: defaultTrailClass.getIdTrail()!,
      title: defaultTrailClass.getTitle()!,
      subtitle: defaultTrailClass.getSubtitle()!,
      content: defaultTrailClass.getContent()!,
      description: defaultTrailClass.getDescription()!,
      duration: defaultTrailClass.getDuration()!,
      createdAt: defaultTrailClass.getCreatedAt()!,
      updatedAt: defaultTrailClass.getUpdatedAt()!,
      status: defaultTrailClass.getStatus()!,
    }

    const restoredTrailClass = trailClassDomainService.restoreTrailClass(input)

    expect(restoredTrailClass).toBeTruthy()
    expect(restoredTrailClass.getTitle()).toBe('Título de teste, aaa')
    expect(restoredTrailClass.getSubtitle()).toBe('Subtítulo teste')
    expect(restoredTrailClass.getDescription()).toBe('Description teste')
    expect(restoredTrailClass.getDuration()).toBe(10)
  })

  it('(restoreTrailClass) - Não deve ser possível restaurar uma aula com parâmetros inválidos', () => {
    const input: RestoreTrailClassDomainServiceInput = {
      id: defaultTrailClass.getId()!,
      idTrail: defaultTrailClass.getIdTrail()!,
      title: defaultTrailClass.getTitle()!,
      subtitle: defaultTrailClass.getSubtitle()!,
      content: defaultTrailClass.getContent()!,
      description: defaultTrailClass.getDescription()!,
      duration: 0,
      createdAt: defaultTrailClass.getCreatedAt()!,
      updatedAt: defaultTrailClass.getUpdatedAt()!,
      status: defaultTrailClass.getStatus()!,
    }

    expect(() => trailClassDomainService.restoreTrailClass(input)).toThrow()
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar as informações de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      title: 'Testando alteração de título...',
      duration: 15,
      description: 'Testando alteração de descrição, descrição aleatória, teste, teste e teste.',
      subtitle: 'Testando alteração de subtítulo...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input)
    expect(updatedTrailClass.getTitle()).toBe('Testando alteração de título...')
    expect(updatedTrailClass.getDuration()).toBe(15)
    expect(updatedTrailClass.getDescription()).toBe('Testando alteração de descrição, descrição aleatória, teste, teste e teste.')
    expect(updatedTrailClass.getSubtitle()).toBe('Testando alteração de subtítulo...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente o título de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      title: 'Testando alteração de título...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input)
    expect(updatedTrailClass.getTitle()).toBe('Testando alteração de título...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente o subtítulo de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      subtitle: 'Testando alteração de teste do subtítulo...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input)
    expect(updatedTrailClass.getSubtitle()).toBe('Testando alteração de teste do subtítulo...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente o subtítulo de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      subtitle: 'Testando alteração de teste do subtítulo...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input)
    expect(updatedTrailClass.getSubtitle()).toBe('Testando alteração de teste do subtítulo...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente a descrição de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      description: 'Testando alteração de teste de descrição...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input)
    expect(updatedTrailClass.getDescription()).toBe('Testando alteração de teste de descrição...')
  })


  it('(updateTrailClassInfo) - Deve ser possível atualizar somente a duração de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      duration: 30
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input)
    expect(updatedTrailClass.getDuration()).toBe(30)
  })

  it('(updateTrailClassInfo) - Não deve ser possível atualizar a duração de uma aula com parâmetros inválidos', () => {
    const invalidDurationInput: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      duration: 2245
    }

    expect(() => trailClassDomainService.updateTrailClassInfo(invalidDurationInput)).toThrow()

    const invalidTitleAndSubtitleInput: UpdateTrailClassDomainServiceInput = {
      trailClass: defaultTrailClass,
      title: '',
      subtitle: '',
      duration: 0
    }

    expect(() => trailClassDomainService.updateTrailClassInfo(invalidTitleAndSubtitleInput)).toThrow()
  })


  it('(publishTrailClass) - Deve ser possível publicar uma aula', () => {
    const updatedTrailClassWithFilledArchiveContent = trailClassDomainService.updateContent(
      defaultTrailClass,
      new ContentArchiveValueObject(
        `trilhas/trail-${defaultTrailClass.getIdTrail()}/trailClass-${defaultTrailClass.getId()}/`,
        "filled",
        "pptx"
      )
    )

    const publishedTrailClass = trailClassDomainService.publishTrailClass(updatedTrailClassWithFilledArchiveContent)

    expect(publishedTrailClass.getStatus()).toBe('published')
  })

  it('(updateContent) - Deve lançar uma exceção se tentar atualizar o conteúdo com um tipo de conteúdo não suportado', () => {
    const unsupportedContent = { type: 'unsupported' } as any
    expect(() => trailClassDomainService.updateContent(defaultTrailClass, unsupportedContent)).toThrow(
      new InvalidTrailClassPropetyDomainException(
        "trail-class-base-entity.ts",
        "404",
        "content",
        "O tipo de conteúdo não é suportado."
      )
    )
  })

  it('(updateContent) - Deve lançar uma exceção se tentar atualizar o conteúdo de uma aula publicada', () => {
    expect(() => trailClassDomainService.updateContent(defaultTrailClass, new ContentArticleValueObject('Novo conteúdo'))).toThrow(
      new InvalidTrailClassPropetyDomainException(
        "trail-class-base-entity.ts",
        "241",
        "content",
        `Você não não pode alterar o conteúdo de uma aula já públicada!`
      )
    )

  })

  it('(updateContent) - Deve lançar uma exceção se tentar atualizar o conteúdo com um tipo de conteúdo vazio', () => {
    const emptyContent = new ContentEmptyValueObject()
    expect(() => trailClassDomainService.updateContent(defaultTrailClass, emptyContent)).toThrow(
      new InvalidTrailClassPropetyDomainException(
        "trail-class-base-entity.ts",
        "241",
        "content",
        `Você não não pode alterar o conteúdo de uma aula já públicada!`
      )
    )
  })


})  
