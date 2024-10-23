
import { TrailInvalidUpdateDomainException } from '@/domain/domain-exception/trail-invalid-update-domain-expection'
import { GetFilledTrailClassesDomainServiceInput, GetPublishedTrailClassesDomainServiceInput, GetTrailClassesByContentTypeDomainServiceInput, GetTrailClassesDomainServiceInput, GetUnfilledTrailClassesDomainServiceInput, UpdateTrailDomainServiceInput } from './@types/trail-domain-service-types'
import {
  Trail,
  CreateTrailInputDomainService,
  RestoreTrailInputDomainService,
  GetTrailClassDomainServiceInput,
  TrailClassNotFoundOnTrailDomainException,
  InvalidTrailDomainException,
  TrailClass,
} from './index'
import { ContentBlock } from '@/domain/entity/value-objects/trail-content-item-value-object';
import { TextContentItem } from '@/domain/entity/value-objects/text-block-content-item';
import { ArchiveContent, ArchiveContentItem } from '@/domain/entity/value-objects/archive-block-content-item';
import { AlternativesContent, AlternativesContentItem } from '@/domain/entity/value-objects/alternatives-block-content-item';
import { DissertativeContent, DissertativeContentItem } from '@/domain/entity/value-objects/dissertatives-block-content-item';
import { VideoContent, VideoContentItem } from '@/domain/entity/value-objects/video-block-content-item';

interface createArchiveContentItemInput {
  idTrailClass: string
  index: number
  content: ArchiveContent
  status: 'pending' | 'uploaded' | 'error'
}

interface createTextContentItemInput {
  idTrailClass: string
  index: number
  content: string
  status: 'pending' | 'uploaded' | 'error'
}

interface createAlternativesContentItemInput {
  idTrailClass: string
  index: number
  content: AlternativesContent
  status: 'pending' | 'uploaded' | 'error'
}

interface createDissertativeContentItemInput {
  idTrailClass: string
  index: number
  content: DissertativeContent
  status: 'pending' | 'uploaded' | 'error'
}

interface createVideoContentItemInput {
  idTrailClass: string
  index: number
  content: VideoContent
  status: 'pending' | 'uploaded' | 'error'
}
export class TrailDomainService {
  constructor() { }

  createTrail(input: CreateTrailInputDomainService): Trail {
    return Trail.create(input)
  }

  createArchiveContentItem(input: createArchiveContentItemInput) {
    return new ArchiveContentItem(input.idTrailClass, input.index, input.content, { status: input.status })
  }

  createVideoContentItem(input: createVideoContentItemInput) {
    return new VideoContentItem(input.idTrailClass, input.index, input.content, { status: input.status, id: ''})
  }
  createTextContentItem(input: createTextContentItemInput) {
    return new TextContentItem(input.idTrailClass, input.index, input.content, { status: input.status })
  }

  createAlternativesContentItem(input: createAlternativesContentItemInput) {
    return new AlternativesContentItem(input.idTrailClass, input.index, input.content, { status: input.status })
  }

  createDissertativeContentItem(input: createDissertativeContentItemInput) {
    return new DissertativeContentItem(input.idTrailClass, input.index, input.content, { status: input.status })
  }

  createTrailClassContents(idTrailClass: string, contentBlocks: ContentBlock<any>[], files: any[]) {
    const createdContents: { archives: ArchiveContentItem[], 'videos': VideoContentItem[], 'texts': TextContentItem[], 'alternatives': AlternativesContentItem[], 'dissertatives': DissertativeContentItem[] } = {
      'archives': [],
      'videos': [],
      'texts': [],
      'alternatives': [],
      'dissertatives': []
    }

    for (const cb of contentBlocks) {
      switch (cb.type) {

        case 'file':
          let inMemoryFile = files.find(f => f.originalname === cb.content)
          if (!inMemoryFile) {
            throw new Error(`not found, name: ${cb.content}`)
          }

          let archiveContent: ArchiveContent = {
            title: cb.content,
            extension: inMemoryFile.mimetype,
            location: inMemoryFile.buffer
          }

          createdContents.archives.push(new ArchiveContentItem(
            idTrailClass, cb.index, archiveContent, { status: 'pending' }
          ))
          console.log('createdContents.archives', createdContents.archives)
          break;

        case 'video':
          let inMemoryVideo = files.find(f => f.originalname === cb.content)
          if (!inMemoryFile) {
            throw new Error(`not found, name: ${cb.content}`)
          }

          let videoContent: VideoContent = {
            title: cb.content,
            extension: inMemoryVideo.mimetype,
            location: inMemoryVideo.buffer
          }

          createdContents.videos.push(new VideoContentItem(

            idTrailClass, cb.index, videoContent, { status: 'pending', id: ''}
          ))
          break;

        case 'text':
          createdContents.texts.push(new TextContentItem(
            idTrailClass,
            cb.index,
            cb.content as string,
            { status: 'uploaded' }
          ))
          break;

        case 'alternatives':
          createdContents.alternatives.push(new AlternativesContentItem(
            idTrailClass,
            cb.index,
            cb.content as AlternativesContent,
            { status: 'uploaded' }
          ))
          break;

        case 'dissertative':
          createdContents.dissertatives.push(new DissertativeContentItem(
            idTrailClass,
            cb.index,
            cb.content as DissertativeContent,
            { status: 'uploaded' }
          ))
          break;
      }
    }

    return createdContents

  }


  restoreTrail(input: RestoreTrailInputDomainService) {
    return Trail.restore(input)
  }

  publishTrail(trail: Trail) {
    trail.publish()
    return trail
  }

  getTrailClass(input: GetTrailClassDomainServiceInput): TrailClass {
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

    return trailClass
  }

  getTrailClasses(input: GetTrailClassesDomainServiceInput): TrailClass[] {
    const { trail } = input

    if (!trail) {
      throw new InvalidTrailDomainException(
        'trailClass-domain-service.ts',
        '46',
        'trail',
      )
    }

    return trail.getTrailClasses()
  }

  getPublishedTrailClasses(input: GetPublishedTrailClassesDomainServiceInput): TrailClass[] {
    const { trail } = input

    if (!trail) {
      throw new InvalidTrailDomainException(
        'trailClass-domain-service.ts',
        '46',
        'trail',
      )
    }

    const trailClasses = trail.getTrailClasses()
    const publishedTrailClasses = trailClasses.filter(trailClass => trailClass.getStatus() === "published")

    return publishedTrailClasses
  }

  getUnpublishedTrailClasses(input: GetPublishedTrailClassesDomainServiceInput): TrailClass[] {
    const { trail } = input

    if (!trail) {
      throw new InvalidTrailDomainException(
        'trailClass-domain-service.ts',
        '46',
        'trail',
      )
    }

    const trailClasses = trail.getTrailClasses()
    const unpublishedTrailClasses = trailClasses.filter(trailClass => trailClass.getStatus() === "not-published")

    return unpublishedTrailClasses
  }

  // getFilledTrailClasses(input: GetFilledTrailClassesDomainServiceInput): TrailClass[] {
  //   const { trail } = input
  //   if (!trail) {
  //     throw new InvalidTrailDomainException(
  //       'trailClass-domain-service.ts',
  //       '46',
  //       'trail',
  //     )
  //   }

  //   const trailClasses = trail.getTrailClasses()
  //   const filledTrailClasses = trailClasses.filter(
  //     (trailClass: TrailClass) => !(trailClass.getContent() instanceof ContentEmptyValueObject)
  //   )

  //   return filledTrailClasses
  // }

  // getUnfilledTrailClasses(input: GetUnfilledTrailClassesDomainServiceInput): TrailClass[] {
  //   const { trail } = input

  //   if (!trail) {
  //     throw new InvalidTrailDomainException(
  //       'trailClass-domain-service.ts',
  //       '46',
  //       'trail',
  //     )
  //   }

  //   const trailClasses = trail.getTrailClasses()
  //   const unfilledTrailClasses = trailClasses.filter(
  //     (trailClass: TrailClass) => trailClass.getContent() instanceof ContentEmptyValueObject
  //   )

  //   return unfilledTrailClasses
  // }

  getTrailClassesByContentType(input: GetTrailClassesByContentTypeDomainServiceInput): TrailClass[] {
    const { trail, contentType } = input;

    if (!trail) {
      throw new InvalidTrailDomainException(
        'trailClass-domain-service.ts',
        '46',
        'trail',
      );
    }

    const trailClasses: TrailClass[] = trail.getTrailClasses();

    const trailClassesByContentType = trailClasses.filter(
      (trailClass: TrailClass) => {
        const content = trailClass.getContent();
        return content && content.constructor.name === contentType;
      }
    );

    return trailClassesByContentType;
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
