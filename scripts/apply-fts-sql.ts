import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runSQL() {
  console.log("Applying S-06 Database Hardening Migrations...");

  try {
    console.log("Adding tsvector column to semantic_chunks...");
    
    // Check if column exists first to avoid errors on rerun
    const columnExists: any[] = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='semantic_chunks' AND column_name='textsearch';
    `;

    if (columnExists.length === 0) {
      await prisma.$executeRawUnsafe(`
        ALTER TABLE semantic_chunks 
        ADD COLUMN textsearch tsvector 
        GENERATED ALWAYS AS (
          setweight(to_tsvector('english', coalesce(title, '')), 'A') || 
          setweight(to_tsvector('english', coalesce(content, '')), 'B')
        ) STORED;
      `);
      console.log("Added textsearch column.");
    } else {
      console.log("textsearch column already exists.");
    }

    console.log("Creating GIN index for textsearch...");
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_semantic_chunks_textsearch 
      ON semantic_chunks USING GIN (textsearch);
    `);

    console.log("✅ S-06 migrations applied successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runSQL();
