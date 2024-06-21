import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";
import { RowDataPacket } from 'mysql2';
import { MySqlDatabaseAdapter } from './mysql-database-adapter';
import { InvalidTrailClassPropetyDomainException  } from "@/domain/domain-exception/invalid-trail-class-propety-domain-exception";

export class MySqlTrailClassAdapter extends MySqlDatabaseAdapter implements ITrailClassRepository {
    private readonly tableName = 'trail_class';

    constructor() {
        super();
    }

    async findById(id: string): Promise<TrailClass | null> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const trailClass = this.mapToDomainEntity(rows[0]);
        return trailClass;
    }

    async save(c: TrailClass): Promise<TrailClass> {
        const id = c.getId();
        if (!id) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "30", "id");
        }

        const idTrail = c.getIdTrail();
        if (!idTrail) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "33", "idTrail");
        }

        const title = c.getTitle();
        if (!title) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "36", "title");
        }

        const description = c.getDescription();
        if (!description) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "39", "description");
        }

        const subtitle = c.getSubtitle();
        if (!subtitle) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "42", "subtitle");
        }

        const status = c.getStatus();
        if (!status) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "45", "status");
        }

        const trailClassStorageKey = c.getTrailClassStorageKey();
        if (!trailClassStorageKey) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "48", "trailClassStorageKey");
        }

        const content = c.getContent();
        if (!content) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "51", "content");
        }

        const createdAt = c.getCreatedAt();
        if (!createdAt) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "54", "createdAt");
        }

        const updatedAt = c.getUpdatedAt();
        if (!updatedAt) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "57", "updatedAt");
        }

        await this.pool.execute(
            `INSERT INTO ${this.tableName} (id, idTrail, title, description, subtitle, status, releaseSchedule, releaseStatus, trailClassStorageKey, contentUploadId, contentUploadStatus, contentStatus, contentKey, contentType, contentFormat, createAt, updateAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            idTrail = VALUES(idTrail), title = VALUES(title), description = VALUES(description), subtitle = VALUES(subtitle), status = VALUES(status), releaseSchedule = VALUES(releaseSchedule), releaseStatus = VALUES(releaseStatus), trailClassStorageKey = VALUES(trailClassStorageKey), contentUploadId = VALUES(contentUploadId), contentUploadStatus = VALUES(contentUploadStatus), contentStatus = VALUES(contentStatus), contentKey = VALUES(contentKey), contentType = VALUES(contentType), contentFormat = VALUES(contentFormat), createAt = VALUES(createAt), updateAt = VALUES(updateAt)`,
            [
                id, idTrail, title, description, subtitle, status, new Date(), "locked", trailClassStorageKey,
                content.upload.id, content.upload.status, content.status, content.key, content.type,
                createdAt.toISOString().slice(0, 19).replace('T', ' '),
                updatedAt.toISOString().slice(0, 19).replace('T', ' ')
            ]
        );

        return c;
    }

    async listByTrail(idTrail: string): Promise<TrailClass[]> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE idTrail = ?`,
            [idTrail]
        );

        return rows.map(row => this.mapToDomainEntity(row));
    }

    async findByTrailClassUploadId(idUpload: string): Promise<TrailClass | null> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE contentUploadId = ?`,
            [idUpload]
        );

        if (rows.length === 0) {
            return null;
        }

        const trailClass = this.mapToDomainEntity(rows[0]);
        return trailClass;
    }

    async deleteById(id: string): Promise<boolean> {
        await this.pool.execute(
            `DELETE FROM ${this.tableName} WHERE id = ?`,
            [id]
        );
        return true;
    }

    async delete(trailClass: TrailClass): Promise<boolean> {
        const id = trailClass.getId();
        if (!id) throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "132", "id");

        await this.pool.execute(
            `DELETE FROM ${this.tableName} WHERE id = ?`,
            [id]
        );

        return true;
    }

    private mapToDomainEntity(row: RowDataPacket): TrailClass {

        const id = row.id;
        if (!id) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "30", "id");
        }
    
        const idTrail = row.idTrail;
        if (!idTrail) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "33", "idTrail");
        }
    
        const title = row.title;
        if (!title) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "36", "title");
        }
    
        const description = row.description;
        if (!description) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "39", "description");
        }
    
        const subtitle = row.subtitle;
        if (!subtitle) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "42", "subtitle");
        }
    
        const status = row.status;
        if (!status) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "45", "status");
        }
    
        const trailClassStorageKey = row.trailClassStorageKey;
        if (!trailClassStorageKey) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "48", "trailClassStorageKey");
        }
    
        const content = {
            type: row.contentType,
            format: row.contentFormat,
            key: row.contentKey,
            status: row.contentStatus,
            upload: {
                id: row.contentUploadId,
                status: row.contentUploadStatus
            }
        };
        if (!content) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "51", "content");
        }
    
        const createdAt = row.createAt;
        if (!createdAt) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "54", "createdAt");
        }
    
        const updatedAt = row.updateAt;
        if (!updatedAt) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "57", "updatedAt");
        }

        const release = {
            schedule: row.releaseSchedule,
            status: row.releaseStatus
        };
        if (!release) {
            throw new InvalidTrailClassPropetyDomainException("my-sql-trail-class-adapter.ts", "60", "release");
        }
    
        return TrailClass.restore({
            id,
            idTrail,
            title,
            description,
            subtitle,
            status,
            release,
            trailClassStorageKey,
            content,
            createAt: createdAt,
            updateAt: updatedAt
        });
    }
}
