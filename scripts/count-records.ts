import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const blogPostsCount = await prisma.blogPost.count();
  const publishedBlogPostsCount = await prisma.blogPost.count({ where: { published: true } });

  const problemsCount = await prisma.problem.count();
  const publishedProblemsCount = await prisma.problem.count({ where: { isPublished: true } });

  const routerModelsCount = await prisma.routerModel.count();
  const publishedRouterModelsCount = await prisma.routerModel.count({ where: { isPublished: true } });

  const ipAddressesCount = await prisma.ipAddress.count();
  const publishedIpAddressesCount = await prisma.ipAddress.count({ where: { isPublished: true } });

  const brandsCount = await prisma.brand.count();

  console.log(JSON.stringify({
    blogPosts: { total: blogPostsCount, published: publishedBlogPostsCount },
    problems: { total: problemsCount, published: publishedProblemsCount },
    routerModels: { total: routerModelsCount, published: publishedRouterModelsCount },
    ipAddresses: { total: ipAddressesCount, published: publishedIpAddressesCount },
    brands: { total: brandsCount }
  }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
