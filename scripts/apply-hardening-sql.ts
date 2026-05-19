import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runSQL() {
  console.log("Applying S-04 and S-05 Database Hardening Migrations...");

  try {
    // 1. Enable pg_trgm for Tier 1.5 Fuzzy Search
    console.log("Enabling pg_trgm...");
    await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

    // 2. Create GIN Indexes for fast trigram searches
    // We create indexes on semantic_chunks since that's what the search orchestrator queries directly
    console.log("Creating GIN indexes for semantic_chunks...");
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_semantic_chunks_title_trgm 
      ON semantic_chunks USING GIN (title gin_trgm_ops);
    `);
    
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_semantic_chunks_content_trgm 
      ON semantic_chunks USING GIN (content gin_trgm_ops);
    `);

    // 3. Enable pgvector (should already be enabled by Prisma, but just to be safe)
    console.log("Ensuring vector extension exists...");
    await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS vector SCHEMA public;`);

    // 4. Create HNSW Indexes for fast vector searches
    console.log("Creating HNSW indexes on embedding_records...");
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_embedding_records_hnsw 
      ON embedding_records USING hnsw (embedding vector_cosine_ops);
    `);

    console.log("Creating HNSW indexes on router_embeddings...");
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS idx_router_embeddings_hnsw 
      ON router_embeddings USING hnsw (embedding vector_cosine_ops);
    `);

    console.log("✅ All migrations applied successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

runSQL();
