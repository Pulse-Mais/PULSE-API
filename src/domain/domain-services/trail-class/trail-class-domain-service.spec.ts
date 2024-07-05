import { TrailClassNotFoundOnTrailDomainException } from '@/domain/domain-exception/trail-class-not-found-on-trail-domain-exception'
import { TrailDomainService } from '../trail/trail-domain-service'
import { CreateTrailClassDomainServiceInput, RestoreTrailClassDomainServiceInput, UpdateTrailClassDomainServiceInput } from './@types/trail-domain-service-types'
import { TrailClassDomainService } from './trail-class-domain-service'

describe('TrailClassDomainService', () => {
  const trailDomainService = new TrailDomainService()
  const trailClassDomainService = new TrailClassDomainService()

  const defaultTrail = trailDomainService.createTrail({
    title: 'Título',
    subtitle: 'Subtítulo',
    description: 'Descrição',
  })


  const defaultTrailClass = trailClassDomainService.createTrailClass({
    trail: defaultTrail,
    title: 'Título de teste, aaa',
    subtitle: 'Subtítulo teste',
    description: 'Description teste',
    duration: 10,
  })

  defaultTrail.addTrailClass(defaultTrailClass)

  it('(createTrailClass) - Deve ser possível criar uma aula', () => {
    const input: CreateTrailClassDomainServiceInput = {
      trail: defaultTrail,
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
      trail: defaultTrail,
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
      trailClassStorageKey: defaultTrailClass.getTrailClassStorageKey()!
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
      trailClassStorageKey: defaultTrailClass.getTrailClassStorageKey()!
    }

    expect(() => trailClassDomainService.restoreTrailClass(input)).toThrow()
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar as informações de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      title: 'Testando alteração de título...',
      duration: 15,
      description: 'Testando alteração de descrição, descrição aleatória, teste, teste e teste.',
      subtitle: 'Testando alteração de subtítulo...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input, defaultTrail)
    expect(updatedTrailClass.getTitle()).toBe('Testando alteração de título...')
    expect(updatedTrailClass.getDuration()).toBe(15)
    expect(updatedTrailClass.getDescription()).toBe('Testando alteração de descrição, descrição aleatória, teste, teste e teste.')
    expect(updatedTrailClass.getSubtitle()).toBe('Testando alteração de subtítulo...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente o título de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      title: 'Testando alteração de título...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input, defaultTrail)
    expect(updatedTrailClass.getTitle()).toBe('Testando alteração de título...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente o subtítulo de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      subtitle: 'Testando alteração de teste do subtítulo...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input, defaultTrail)
    expect(updatedTrailClass.getSubtitle()).toBe('Testando alteração de teste do subtítulo...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente o subtítulo de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      subtitle: 'Testando alteração de teste do subtítulo...'
    }

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input, defaultTrail)
    expect(updatedTrailClass.getSubtitle()).toBe('Testando alteração de teste do subtítulo...')
  })

  it('(updateTrailClassInfo) - Deve ser possível atualizar somente a descrição de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      description: 'Testando alteração de teste de descrição...'
    }   

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input, defaultTrail)
    expect(updatedTrailClass.getDescription()).toBe('Testando alteração de teste de descrição...')
  })

  
  it('(updateTrailClassInfo) - Deve ser possível atualizar somente a duração de uma aula', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      duration: 30
    }   

    const updatedTrailClass = trailClassDomainService.updateTrailClassInfo(input, defaultTrail)
    expect(updatedTrailClass.getDuration()).toBe(30)
  })

  it('(updateTrailClassInfo) - Não deve ser possível atualizar a duração de uma aula com parâmetros inválidos', () => {
    const invalidDurationInput: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      duration: 2245
    }   

    expect(() => trailClassDomainService.updateTrailClassInfo(invalidDurationInput, defaultTrail)).toThrow()
    
    const invalidTitleAndSubtitleInput: UpdateTrailClassDomainServiceInput = {
      idTrailClass: defaultTrailClass.getId()!,
      title: '',
      subtitle: '',
      duration: 0
    }

    expect(() => trailClassDomainService.updateTrailClassInfo(invalidTitleAndSubtitleInput, defaultTrail)).toThrow()
    console.log(defaultTrailClass.getDuration())
  })

  it('(updateTrailClassInfo) - Não deve ser possível atualizar uma aula que não esteja presente na trilha', () => {
    const input: UpdateTrailClassDomainServiceInput = {
      idTrailClass: "0799d17e-7e55-4d74-99d7-ab07de38ad7e",
      duration: 30
    }   

    expect(() => trailClassDomainService.updateTrailClassInfo(input, defaultTrail)).toThrow(TrailClassNotFoundOnTrailDomainException)
  })

    

})  
