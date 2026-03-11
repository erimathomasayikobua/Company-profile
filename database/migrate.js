import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DatabaseMigrator {
    constructor() {
        this.db = null;
        this.dbPath = path.join(__dirname, 'revotechnologies.db');
        this.migrationsPath = path.join(__dirname, 'migrations');
    }

    async init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    resolve();
                }
            });
        });
    }

    async createMigrationsTable() {
        return new Promise((resolve, reject) => {
            const sql = `
                CREATE TABLE IF NOT EXISTS migrations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    filename VARCHAR(255) UNIQUE NOT NULL,
                    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getExecutedMigrations() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT filename FROM migrations ORDER BY id', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map(row => row.filename));
                }
            });
        });
    }

    async executeMigration(filename) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.migrationsPath, filename);
            const sql = fs.readFileSync(filePath, 'utf8');
            
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    // Record migration as executed
                    this.db.run(
                        'INSERT INTO migrations (filename) VALUES (?)',
                        [filename],
                        (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        }
                    );
                }
            });
        });
    }

    async migrate() {
        try {
            await this.createMigrationsTable();
            
            // Get list of migration files
            const migrationFiles = fs.readdirSync(this.migrationsPath)
                .filter(file => file.endsWith('.sql'))
                .sort();

            // Get already executed migrations
            const executedMigrations = await this.getExecutedMigrations();

            // Execute pending migrations
            for (const filename of migrationFiles) {
                if (!executedMigrations.includes(filename)) {
                    console.log(`Executing migration: ${filename}`);
                    await this.executeMigration(filename);
                    console.log(`✓ Migration ${filename} completed`);
                } else {
                    console.log(`- Migration ${filename} already executed`);
                }
            }

            console.log('All migrations completed successfully');
        } catch (error) {
            console.error('Migration error:', error);
            throw error;
        }
    }

    async close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connection closed');
                    resolve();
                }
            });
        });
    }
}

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const migrator = new DatabaseMigrator();
    
    migrator.init()
        .then(() => migrator.migrate())
        .then(() => migrator.close())
        .catch(error => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

export default DatabaseMigrator;
