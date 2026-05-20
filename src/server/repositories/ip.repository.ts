import { prisma } from "@/server/db/prisma";
import type { IpAddress } from "@/types";

// =============================================================
// IP Address Repository
// =============================================================

export const IpRepository = {
  async getAll(): Promise<IpAddress[]> {
    const ips = await prisma.ipAddress.findMany({
      orderBy: { address: "asc" },
    });
    return ips.map(mapIp);
  },

  async getBySlug(slug: string): Promise<IpAddress | null> {
    const ip = await prisma.ipAddress.findUnique({ where: { slug } });
    if (!ip) return null;
    return mapIp(ip);
  },

  async getByAddress(address: string): Promise<IpAddress | null> {
    const ip = await prisma.ipAddress.findUnique({ where: { address } });
    if (!ip) return null;
    return mapIp(ip);
  },

  async getAllSlugs(): Promise<string[]> {
    const ips = await prisma.ipAddress.findMany({ select: { slug: true } });
    return ips.map((ip) => ip.slug);
  },

  async count(): Promise<number> {
    return prisma.ipAddress.count();
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapIp(ip: any): IpAddress {
  return {
    id: ip.id,
    address: ip.address,
    slug: ip.slug,
    commonBrands: ip.commonBrands,
    description: ip.description,
    loginGuide: ip.loginGuide,
    faqs: ip.faqs as IpAddress["faqs"],
    metaTitle: ip.metaTitle,
    metaDescription: ip.metaDescription,
    createdAt: ip.createdAt,
    updatedAt: ip.updatedAt,
    diagnosticCategory: ip.diagnosticCategory,
    decayScore: ip.decayScore,
  };
}
