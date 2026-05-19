"use client";

import { useEffect, useState } from "react";
import { Check, X, Server, Shield, BrainCircuit } from "lucide-react";

export default function ContentAdminDashboard() {
  const [data, setData] = useState<{ problems: any[]; routers: any[]; ips: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleAction = async (type: string, id: number, action: "APPROVE" | "REJECT") => {
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, action })
    });
    fetchContent(); // Refresh
  };

  if (loading) return <div className="text-white animate-pulse">Loading Staged Entities...</div>;
  if (!data) return null;

  const totalStaged = data.problems.length + data.routers.length + data.ips.length;

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Staged" value={totalStaged} icon={<Server className="w-5 h-5 text-blue-400" />} />
        <MetricCard title="Staged Problems" value={data.problems.length} icon={<BrainCircuit className="w-5 h-5 text-purple-400" />} />
        <MetricCard title="Staged Routers" value={data.routers.length} icon={<Server className="w-5 h-5 text-green-400" />} />
        <MetricCard title="Staged IPs" value={data.ips.length} icon={<Shield className="w-5 h-5 text-orange-400" />} />
      </div>

      {/* Content Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EntityList title="Problems" type="PROBLEM" items={data.problems} onAction={handleAction} />
        <EntityList title="Routers" type="ROUTER" items={data.routers} onAction={handleAction} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-neutral-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
      </div>
      <div className="p-3 bg-neutral-800 rounded-xl">{icon}</div>
    </div>
  );
}

function EntityList({ title, type, items, onAction }: { title: string; type: string; items: any[]; onAction: any }) {
  if (items.length === 0) return null;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="divide-y divide-neutral-800">
        {items.map(item => {
          const metrics = item.generationMetrics || {};
          const titleText = item.title || item.name || item.address;
          const tokens = (metrics.stage1_tokens || 0) + (metrics.stage2_tokens || 0) + (metrics.stage3_tokens || 0);

          return (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-medium text-lg">{titleText}</h4>
                {item.brand && <p className="text-neutral-400 text-sm">Brand: {item.brand.name}</p>}
                
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {item.status}
                  </span>
                  {metrics.trustScore && (
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      Trust: {metrics.trustScore * 100}%
                    </span>
                  )}
                  {tokens > 0 && (
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                      Tokens: {tokens}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAction(type, item.id, "REJECT")}
                  className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Reject (Set to DRAFT)"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onAction(type, item.id, "APPROVE")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
