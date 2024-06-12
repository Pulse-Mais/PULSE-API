import { createPool, Pool } from 'mysql2/promise';
import { Trail } from "@/domain/entity/trail/trail-entity";
import { ITrailRepository } from "@/domain/repository/ITrail-Repository";
import { ITrailClassRepository } from "@/domain/repository/ITrail-class-Repository";
import { RowDataPacket } from 'mysql2';

interface TrailTable {
    id: string,
    title: string,
    description: string,
    subtitle: string,
    storageKey: string;
    status: "published" | "not-published",
    createAt: string,
    updateAt: string
}

export class MySqlTrailRepository implements ITrailRepository {
    private readonly tableName = 'trails';
    private pool: Pool;

    constructor(private readonly courseRepository: ITrailClassRepository) {
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

    async findById(id: string): Promise<Trail | null> {
        console.log("id aaa:",id)
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM pulse.trails WHERE id = '${id}'`,
            // [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const trailOrNull = rows[0] as TrailTable;

        const trailClasses = await this.courseRepository.listByTrail(trailOrNull.id);
     
         const teste = Trail.restore({
            id: trailOrNull.id,
            title: trailOrNull.title,
            description: trailOrNull.description,
            subtitle: trailOrNull.subtitle,
            storageTrailKey: trailOrNull.storageKey,
            status: trailOrNull.status,
            courses: trailClasses,
            createAt: trailOrNull.createAt,
            updateAt: trailOrNull.updateAt
        });

        return teste
    }

    async save(trail: Trail): Promise<Trail> {
        if (!trail) throw new Error("AAAAAAAAAAAAA");

        let id = trail.getId()
        if (!id) throw new Error("AAAAAAAAAAAAA");

        let title = trail.getTitle()
        if (!title) throw new Error("AAAAAAAAAAAAA");

        let description = trail.getDescription()
        if (!description) throw new Error("AAAAAAAAAAAAA");

        let subtitle = trail.getSubtitle()
        if (!subtitle) throw new Error("AAAAAAAAAAAAA");

        let storageKey = trail.getStorageKey()
        if (!storageKey) throw new Error("AAAAAAAAAAAAA");
 

        let status = trail.getStatus();
        if (!status) throw new Error("AAAAAAAAAAAAA");

        let createAt = trail.getCreatedAt()
        if (!createAt) throw new Error("AAAAAAAAAAAAA");

        let updateAt = trail.getUpdatedAt()
        if (!updateAt) throw new Error("AAAAAAAAAAAAA");

        

        await this.pool.execute(
            `INSERT INTO ${this.tableName} (id, title, description, subtitle, storageKey, status, createAt, updateAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
             title = VALUES(title), description = VALUES(description), subtitle = VALUES(subtitle), storageKey = VALUES(storageKey), status = VALUES(status), createAt = VALUES(createAt), updateAt = VALUES(updateAt)`,
            [
                id, title, description, subtitle, storageKey, status,
                createAt.toISOString().slice(0, 19).replace('T', ' '),
                updateAt.toISOString().slice(0, 19).replace('T', ' ')
            ]
        );

        // Salvar as classes associadas
        const courses = trail.getTrailClasss();
        for (const course of courses) {
            await this.courseRepository.save(course);
        }

        return trail;
    }

    async list(): Promise<Trail[]> {
        const [rows] = await this.pool.execute<RowDataPacket[]>(
            `SELECT * FROM ${this.tableName}`
        );

        const trails: Trail[] = [];

        for (const row of rows) {
            const trailData = row as TrailTable;
            const trailClasses = await this.courseRepository.listByTrail(trailData.id);
            const trail = Trail.restore({
                id: trailData.id,
                title: trailData.title,
                description: trailData.description,
                subtitle: trailData.subtitle,
                storageTrailKey: trailData.storageKey,
                status: trailData.status,
                courses: trailClasses,
                createAt: trailData.createAt,
                updateAt: trailData.updateAt
            });

            trails.push(trail);
        }

        return trails;
    }

    async delete(id: string): Promise<void> {
        await this.pool.execute(
            `DELETE FROM ${this.tableName} WHERE id = '?'`,
            [id]
        );
    }
}
