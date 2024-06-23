import { Trail } from "@/domain/entity/trail/trail-entity";
import { ITrailRepository } from "@/domain/repository/ITrail-Repository";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";
import { RowDataPacket } from 'mysql2';
import { MySqlDatabaseAdapter } from './mysql-database-adapter';
import { InvalidTrailPropetyDomainException } from "@/domain/domain-exception/invalid-trail-propety-domain-exception";

export class MySqlTrailRepository extends MySqlDatabaseAdapter implements ITrailRepository {
    private readonly tableName = 'trails';

    constructor(private readonly traiRepository: ITrailClassRepository) {
        super();
    }

    async findById(id: string): Promise<Trail | null> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName} WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const trailOrNull = this.mapToDomainEntity(rows[0]);
        return trailOrNull;
    }

    async save(trail: Trail): Promise<Trail> {
        if (!trail) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "57", "trail");
        }

        const id = trail.getId();
        if (!id) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "62", "id");
        }

        const title = trail.getTitle();
        if (!title) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "67", "title");
        }

        const description = trail.getDescription();
        if (!description) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "72", "description");
        }

        const subtitle = trail.getSubtitle();
        if (!subtitle) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "77", "subtitle");
        }

        const storageKey = trail.getStorageKey();
        if (!storageKey) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "82", "storageKey");
        }

        const status = trail.getStatus();
        if (!status) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "87", "status");
        }

        const createdAt = trail.getCreatedAt();
        if (!createdAt) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "92", "createdAt");
        }

        const updatedAt = trail.getUpdatedAt();
        if (!updatedAt) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "97", "updatedAt");
        }

        await this.pool.execute(
            `INSERT INTO ${this.tableName} (id, title, description, subtitle, storageKey, status, createAt, updateAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
             title = VALUES(title), description = VALUES(description), subtitle = VALUES(subtitle), storageKey = VALUES(storageKey), status = VALUES(status), createAt = VALUES(createAt), updateAt = VALUES(updateAt)`,
            [
                id, title, description, subtitle, storageKey, status,
                createdAt.toISOString().slice(0, 19).replace('T', ' '),
                updatedAt.toISOString().slice(0, 19).replace('T', ' ')
            ]
        );

        const courses = trail.getTrailClasss();
        for (const course of courses) {
            await this.traiRepository.save(course);
        }

        return trail;
    }

    async list(): Promise<Trail[]> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName}`
        );

        const trails: Trail[] = [];

        for (const row of rows) {
            const trail = await this.mapToDomainEntity(row);
            trails.push(trail);
        }

        return trails;
    }

    async delete(id: string): Promise<void> {
        await this.pool.execute(
            `DELETE FROM ${this.tableName} WHERE id = ?`,
            [id]
        );
    }

    private async mapToDomainEntity(row: RowDataPacket): Promise<Trail> {
        const id = row.id;
        if (!id) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "30", "id");
        }

        const title = row.title;
        if (!title) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "33", "title");
        }

        const description = row.description;
        if (!description) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "36", "description");
        }

        const subtitle = row.subtitle;
        if (!subtitle) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "39", "subtitle");
        }

        const storageKey = row.storageKey;
        if (!storageKey) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "42", "storageKey");
        }

        const status = row.status;
        if (!status) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "45", "status");
        }

        const createdAt = row.createAt;
        if (!createdAt) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "48", "createdAt");
        }

        const updatedAt = row.updateAt;
        if (!updatedAt) {
            throw new InvalidTrailPropetyDomainException("my-sql-trail-adapter.ts", "51", "updatedAt");
        }

        const trailClasses = await this.traiRepository.listByTrail(id);

        return Trail.restore({
            id,
            title,
            description,
            subtitle,
            storageTrailKey: storageKey,
            status,
            courses: trailClasses,
            createAt: createdAt,
            updateAt: updatedAt
        });
    }
}
