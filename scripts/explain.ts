import { prisma } from "../src/server/db/prisma";

async function runExplain() {
  const query = "tp link login";
  const exactQuery = `%${query}%`;
  
  const explain: any[] = await prisma.$queryRawUnsafe(`
    EXPLAIN ANALYZE
    SELECT 
      "chunkId",
      (
        CASE WHEN title ILIKE $1 THEN 2.0 WHEN content ILIKE $1 THEN 1.5 ELSE 0.0 END
        + GREATEST(similarity(title, $2), similarity(content, $2)) * 0.5
        + ts_rank_cd(textsearch, plainto_tsquery('english', $2)) * 1.5
      ) * "priorityScore" as combined_score
    FROM semantic_chunks
    WHERE 
      title ILIKE $1 OR 
      content ILIKE $1 OR 
      similarity(title, $2) > 0.15 OR 
      similarity(content, $2) > 0.15 OR
      textsearch @@ plainto_tsquery('english', $2)
    ORDER BY combined_score DESC
    LIMIT 5;
  `, exactQuery, query);

  console.log("=== Hybrid Query ===");
  explain.forEach(row => console.log(row["QUERY PLAN"]));

  const vectorExplain: any[] = await prisma.$queryRawUnsafe(`
    EXPLAIN ANALYZE
    SELECT "chunkId", 1 - (embedding <=> '[0.1,0.2,0.3]'::vector) as similarity
    FROM embedding_records
    ORDER BY embedding <=> '[0.1,0.2,0.3]'::vector ASC
    LIMIT 5;
  `);

  console.log("\n=== Vector Query ===");
  vectorExplain.forEach(row => console.log(row["QUERY PLAN"]));

  await prisma.$disconnect();
}

runExplain();
