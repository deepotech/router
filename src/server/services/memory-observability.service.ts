import * as os from 'os';

export class MemoryObservabilityService {
  /**
   * Tracks system memory usage to prevent OOM errors on limited Railway containers.
   */
  static monitorMemory(): void {
    const totalMemoryMB = os.totalmem() / 1024 / 1024;
    const freeMemoryMB = os.freemem() / 1024 / 1024;
    const usedMemoryMB = totalMemoryMB - freeMemoryMB;
    const processMemoryMB = process.memoryUsage().heapUsed / 1024 / 1024;

    const memoryPressure = usedMemoryMB / totalMemoryMB;

    if (memoryPressure > 0.85) {
      console.warn(`[OOM WARNING] System memory pressure critically high: ${(memoryPressure * 100).toFixed(1)}%`);
    }

    if (processMemoryMB > 512) {
      console.error(`[OOM DANGER] Node process heap exceeding safe limits (${processMemoryMB.toFixed(1)}MB). Worker restart recommended.`);
      // Future integration: send SIGHUP or gracefully exit to let Railway restart container
    }
  }

  /**
   * Diagnostic snapshot for Admin Dashboard
   */
  static getSnapshot() {
    return {
      heapUsedMB: process.memoryUsage().heapUsed / 1024 / 1024,
      systemFreeMB: os.freemem() / 1024 / 1024,
      timestamp: new Date().toISOString()
    };
  }
}
