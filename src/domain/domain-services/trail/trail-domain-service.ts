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
} 
