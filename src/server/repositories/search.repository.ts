import { prisma } from "../db/prisma";

export class SearchRepository {
  static async searchRouters(query: string, limit = 5) {
    return prisma.routerModel.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { brand: { name: { contains: query, mode: "insensitive" } } },
        ],
      },
      include: { brand: true },
      take: limit,
    });
  }

  static async searchProblems(query: string, limit = 5) {
    return prisma.problem.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { excerpt: { contains: query, mode: "insensitive" } },
        ],
      },
      take: limit,
    });
  }

  static async searchIps(query: string, limit = 3) {
    return prisma.ipAddress.findMany({
      where: {
        address: { contains: query, mode: "insensitive" },
      },
      take: limit,
    });
  }
}
