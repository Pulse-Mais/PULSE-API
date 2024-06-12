import { createPool, Pool } from 'mysql2/promise';
import { TrailClass } from "@/domain/entity/trail-class/trail-class-entity";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";
import { RowDataPacket } from 'mysql2';

export class MySqlTrailClassAdapter implements ITrailClassRepository {
    private readonly tableName = 'trail_class';
    private pool: Pool;

    constructor() {
        this.pool = createPool({
            host: 'localhost',
            user: 'root',
            password: 'M1SQL_local4',
            port: 3388,
            database: 'pulse',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async findById(id: string): Promise<TrailClass | null> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE id = '?'`,
            [id]
        );
    
        if (rows.length === 0) {
            return null;
        }
    
        const trailClass = rows[0] as RowDataPacket;
        return this.mapToDomainEntity(trailClass);
    }

    async save(c: TrailClass): Promise<TrailClass> {
        const id = c.getId();
        if (!id) throw new Error()
        const idTrail = c.getIdTrail();
        if (!idTrail) throw new Error()
        const title = c.getTitle();
        if (!title) throw new Error()
        const description = c.getDescription();
        if (!description) throw new Error()
        const subtitle = c.getSubtitle();
        if (!subtitle) throw new Error()
        const status = c.getStatus();
        if (!status) throw new Error()
        const trailClassStorageKey = c.getTrailClassStorageKey();
        if (!trailClassStorageKey) throw new Error()
        const content = c.getContent();
        if (!content) throw new Error()
        const createdAt = c.getCreatedAt();
        if (!createdAt) throw new Error()
        const updatedAt = c.getUpdatedAt();
        if (!updatedAt) throw new Error()

        await this.pool.execute(
            `INSERT INTO ${this.tableName} (id, idTrail, title, description, subtitle, status, releaseSchedule, releaseStatus, trailClassStorageKey, contentUploadId, contentUploadStatus, contentStatus, contentKey, contentType, contentFormat, createAt, updateAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
            idTrail = VALUES(idTrail), title = VALUES(title), description = VALUES(description), subtitle = VALUES(subtitle), status = VALUES(status), releaseSchedule = VALUES(releaseSchedule), releaseStatus = VALUES(releaseStatus), trailClassStorageKey = VALUES(trailClassStorageKey), contentUploadId = VALUES(contentUploadId), contentUploadStatus = VALUES(contentUploadStatus), contentStatus = VALUES(contentStatus), contentKey = VALUES(contentKey), contentType = VALUES(contentType), contentFormat = VALUES(contentFormat), createAt = VALUES(createAt), updateAt = VALUES(updateAt)`,
            [
                id, idTrail, title, description, subtitle, status, new Date(), "locked", trailClassStorageKey,
                content.upload.id, content.upload.status, content.status, content.key, content.type, content.format,
                createdAt.toISOString().slice(0, 19).replace('T', ' '), 
                updatedAt.toISOString().slice(0, 19).replace('T', ' ')
            ]
        );

        return c;
    }

    async listByTrail(idTrail: string): Promise<TrailClass[]> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE idTrail = '${idTrail}'`,
            [idTrail]
        );

        return rows.map(this.mapToDomainEntity);
    }

    async findByTrailClassUploadId(idUpload: string): Promise<TrailClass | null> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE contentUploadId = ?`,
            [idUpload]
        );

        if (rows.length === 0) {
            return null;
        }

        const trailClass = rows[0];
        return this.mapToDomainEntity(trailClass);
    }

    async deleteById(id: string): Promise<boolean> {

        return false
          
    }

    async delete(id: TrailClass): Promise<boolean> {
        await this.pool.execute(
            `DELETE FROM ${this.tableName} WHERE id = ?`,
            [id]
        );

        return true
    }

    private mapToDomainEntity(trailClass: any): TrailClass {
        return TrailClass.restore({
            id: trailClass.id,
            idTrail: trailClass.idTrail,
            title: trailClass.title,
            description: trailClass.description,
            subtitle: trailClass.subtitle,
            status: trailClass.status,
            release: {
                schedule: trailClass.releaseSchedule,
                status: trailClass.releaseStatus
            },
            trailClassStorageKey: trailClass.trailClassStorageKey,
            content: {
                type: trailClass.contentType,
                format: trailClass.contentFormat,
                key: trailClass.contentKey,
                status: trailClass.contentStatus,
                upload: {
                    id: trailClass.contentUploadId,
                    status: trailClass.contentUploadStatus
                }
            },
            createAt: trailClass.createAt,
            updateAt: trailClass.updateAt
        });
    }
}
