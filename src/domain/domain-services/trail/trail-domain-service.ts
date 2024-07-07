import { TrailInvalidUpdateDomainException } from '@/domain/domain-exception/trail-invalid-update-domain-expection'
import { UpdateTrailDomainServiceInput } from './@types/trail-domain-service-types'
import {
  Trail,
  CreateTrailInputDomainService,
  RestoreTrailInputDomainService,
  GetTrailClassDomainServiceInput,
  TrailClassNotFoundOnTrailDomainException,
  InvalidTrailDomainException,
  TrailClass,
} from './index'

export class TrailDomainService {
  constructor() { }

  createTrail(input: CreateTrailInputDomainService): Trail {
    return Trail.create(input)
  }

  restoreTrail(input: RestoreTrailInputDomainService) {
    return Trail.restore(input)
  }

  publishTrail(trail: Trail) {
    trail.publish()
    return trail
  }

  getTrailClass(input: GetTrailClassDomainServiceInput) {
    const { trail, idTrailClass } = input

    if (!trail) {
      throw new InvalidTrailDomainException(
        'trailClass-domain-service.ts',
        '46',
        'trail',
      )
    }

    const trailClass: TrailClass | null = trail.getTrailClassById(idTrailClass)
    if (!trailClass) {
      throw new TrailClassNotFoundOnTrailDomainException(
        'trailClass-domain-service.ts',
        '97',
      )
    }
  }

  updateTrailInfo(input: UpdateTrailDomainServiceInput) {
    const trail = input.trail

    if (!trail) {
      throw new Error("Aula recebida é inválida, criar exception, 62 domain-service.");
    }

    if (input.title) {
      trail.updateTitle(input.title);
    }

    if (input.subtitle) {
      trail.updateSubtitle(input.subtitle);
    }

    if (input.description) {
      trail.updateDescription(input.description);
    }


    if (!input.title && !input.subtitle && !input.description) {
      throw new TrailInvalidUpdateDomainException("trail-domain-service.ts", "75");
    }

    return trail

  }
} 
