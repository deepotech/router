import { SearchRepository } from "../repositories/search.repository";
import { AnalyticsService } from "./analytics.service";

export class SearchService {
  static async globalSearch(query: string) {
    if (!query || query.trim().length < 2) {
      return { routers: [], problems: [], ips: [] };
    }

    const cleanQuery = query.trim();

    // Run parallel searches
    const [routers, problems, ips] = await Promise.all([
      SearchRepository.searchRouters(cleanQuery),
      SearchRepository.searchProblems(cleanQuery),
      SearchRepository.searchIps(cleanQuery),
    ]);

    // Track analytics if there are no results
    const totalResults = routers.length + problems.length + ips.length;
    if (totalResults === 0) {
      await AnalyticsService.logEvent("SEARCH_NO_RESULTS", { query: cleanQuery });
    }

    return { routers, problems, ips };
  }
}
