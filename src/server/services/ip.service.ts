import { IpRepository } from "@/server/repositories/ip.repository";
import type { IpAddress } from "@/types";

// =============================================================
// IP Address Service
// =============================================================

export const IpService = {
  async getAll(): Promise<IpAddress[]> {
    return IpRepository.getAll();
  },

  async getBySlug(slug: string): Promise<IpAddress | null> {
    return IpRepository.getBySlug(slug);
  },

  async getAllPaths(): Promise<{ ip: string }[]> {
    const slugs = await IpRepository.getAllSlugs();
    return slugs.map((slug) => ({ ip: slug }));
  },

  async getCount(): Promise<number> {
    return IpRepository.count();
  },
};
