
import { Note } from "@/model/note";
import { DbVersion } from "@/model/version";
import { Pool, QueryResultRow } from "pg";

const dbConfig: DbConfig = {
  user: process.env.DB_USER || "",
  host: process.env.DB_HOST || "",
  database: process.env.DB_DATABASE || "",
  password: process.env.DB_PASSWORD || "",
  port: parseInt(process.env.DB_PORT || "5432", 10),
};

interface DbConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

class Database {
  private pool: Pool;

  constructor(config: DbConfig) {
    this.pool = new Pool(config);
  }

  private async query<T extends QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query<T>(text, params);
      return result.rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  public async getVersion(): Promise<DbVersion[]> {
    return this.query("SELECT version();");
  }

  public async getNoteById(id: string): Promise<Note> {
    const queryText = `
      SELECT id, title, content, updated_at
      FROM notes
      WHERE id = $1;
    `;
    const result = await this.query<Note>(queryText, [id]);
    return result.length > 0 ? result[0] : {};
  }

  public async deleteNoteByID(id: string): Promise<void> {
    const queryText = `
      DELETE 
      FROM notes
      WHERE id = $1;
    `;
    await this.query(queryText, [id]);
  }

  public async getPaginatedNotes(
    limit: number,
    offset: number
  ): Promise<Note[]> {
    const queryText = `
      SELECT id, title, content, updated_at
      FROM notes
      ORDER BY updated_at DESC, id DESC
      LIMIT $1 OFFSET $2;
    `;
    return this.query<Note>(queryText, [limit, offset]);
  }

  public async upsertNote(note: Note): Promise<Note> {
    const queryText = `
      INSERT INTO notes (id, title, content, updated_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id)
      DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        updated_at = EXCLUDED.updated_at
      RETURNING id, title, content, updated_at;
    `;

    const result = await this.query<Note>(queryText, [
      note.id,
      note.title,
      note.content,
      note.updated_at,
    ]);

    return result[0];
  }
}

export const db = new Database(dbConfig);
