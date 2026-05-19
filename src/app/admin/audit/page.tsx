import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stage I-A Audit | RouterVia Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

async function getAuditData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/admin/audit`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function ScoreBadge({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 75 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: '9999px',
      fontSize: '12px', fontWeight: 700, color: '#fff',
      background: color,
    }}>
      {score}/{max}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const colors: Record<string, string> = { LOW: '#22c55e', MEDIUM: '#f59e0b', HIGH: '#ef4444' };
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: '6px',
      fontSize: '11px', fontWeight: 700, color: '#fff',
      background: colors[risk] || '#6b7280',
    }}>{risk}</span>
  );
}

function RecBadge({ rec }: { rec: string }) {
  const map: Record<string, { bg: string; icon: string }> = {
    APPROVE: { bg: '#166534', icon: '✅' },
    REVIEW: { bg: '#92400e', icon: '⚠️' },
    REJECT: { bg: '#7f1d1d', icon: '❌' },
  };
  const { bg, icon } = map[rec] || { bg: '#374151', icon: '?' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '2px 10px', borderRadius: '9999px', fontSize: '12px',
      fontWeight: 700, color: '#fff', background: bg,
    }}>{icon} {rec}</span>
  );
}

function MetricCard({ label, value, sub, color = '#6366f1' }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: '11px', color: '#6b7280' }}>{sub}</div>}
    </div>
  );
}

export default async function AuditPage() {
  const data = await getAuditData();
  const live = data?.liveMetrics;
  const report = data?.auditReport;
  const summary = report?.summary;
  const health = report?.rolloutHealth;
  const entities: any[] = report?.entities ?? [];
  const duplicates: any[] = report?.duplicateIntents ?? [];
  const thinRisks: any[] = report?.thinContentRisks ?? [];
  const best: any[] = report?.bestEntities ?? [];

  const rolloutColors: Record<string, string> = {
    ACCELERATE: '#22c55e', THROTTLE: '#f59e0b', LIMITED: '#6366f1',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f', color: '#f1f5f9',
      fontFamily: "'Inter', -apple-system, sans-serif", padding: '32px 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '28px' }}>🔬</span>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Stage I-A Governance Audit
            </h1>
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
            Quality validation & rollout health assessment — {data ? new Date(data.generatedAt).toLocaleString() : 'No data yet'}
          </p>
          {!data?.reportExists && (
            <div style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '10px', color: '#f59e0b', fontSize: '13px' }}>
              ⚠️ Audit report not generated yet. Run: <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>npx tsx src/server/scripts/audit-stage-1a.ts</code>
            </div>
          )}
        </div>

        {/* Live DB Metrics */}
        {live && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>Live Database Metrics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '12px' }}>
              <MetricCard label="Staged" value={live.totalStaged} color="#f59e0b" />
              <MetricCard label="Reviewed" value={live.totalReviewed} color="#60a5fa" />
              <MetricCard label="Published" value={live.totalPublished} color="#22c55e" />
              <MetricCard label="Chunks" value={live.totalChunks} color="#a78bfa" />
              <MetricCard label="Intent Relations" value={live.totalIntentRelations} color="#818cf8" />
              <MetricCard label="Tier 1 Hit Rate" value={`${live.tier1HitRate}%`} color="#34d399" sub="Last 20 queries" />
              <MetricCard label="Avg Latency" value={`${live.avgLatencyMs}ms`} color="#f472b6" />
              <MetricCard label="Gen Events" value={live.semanticEvents} color="#fb923c" />
            </div>
          </div>
        )}

        {/* Rollout Recommendation */}
        {health && (
          <div style={{ marginBottom: '32px', padding: '24px', background: 'rgba(99,102,241,0.08)', border: `1px solid ${rolloutColors[health.recommendation] || '#6366f1'}44`, borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Stage I-B Rollout Recommendation</div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: rolloutColors[health.recommendation] }}>
                  {health.recommendation === 'ACCELERATE' ? '🚀 ACCELERATE' : health.recommendation === 'THROTTLE' ? '🟡 THROTTLE' : '🔵 LIMITED'}
                </div>
                <div style={{ fontSize: '14px', color: '#d1d5db', marginTop: '8px' }}>
                  Next Cohort: <strong style={{ color: '#fff' }}>{health.nextCohortSize} entities</strong> &nbsp;|&nbsp; Best Cluster: <strong style={{ color: '#a78bfa' }}>{health.highestValueCluster}</strong>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: '240px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Tier 0 Potential</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: health.tier0HitPotential === 'HIGH' ? '#22c55e' : '#f59e0b' }}>{health.tier0HitPotential}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Semantic Reuse</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#60a5fa' }}>{health.semanticReuseProjection}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Cacheability</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#a78bfa' }}>{health.cacheabilityAvg}/100</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>Tier 1 Coverage</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#34d399' }}>{health.tier1DeterministicCoverage}</div>
                </div>
              </div>
            </div>

            {health.canonicalHubCandidates?.length > 0 && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>🏛️ Canonical Hub Candidates</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {health.canonicalHubCandidates.map((h: string, i: number) => (
                    <span key={i} style={{ padding: '4px 12px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '8px', fontSize: '13px', color: '#c4b5fd' }}>
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audit Summary Grid */}
        {summary && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>Audit Summary</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: '12px' }}>
              <MetricCard label="Total Audited" value={summary.total} color="#60a5fa" />
              <MetricCard label="✅ Approved" value={summary.approved} color="#22c55e" />
              <MetricCard label="⚠️ Review" value={summary.needsReview} color="#f59e0b" />
              <MetricCard label="❌ Rejected" value={summary.rejected} color="#ef4444" />
              <MetricCard label="Avg Density" value={`${summary.avgDensity}/100`} color="#a78bfa" />
              <MetricCard label="Avg Quality" value={`${summary.avgQuality}/100`} color="#818cf8" />
              <MetricCard label="Avg Overlap" value={`${summary.avgOverlap}%`} color="#f472b6" sub="Lower is better" />
              <MetricCard label="🚨 Hallucinations" value={summary.hallucinationFlags} color={summary.hallucinationFlags > 0 ? '#ef4444' : '#22c55e'} />
            </div>
          </div>
        )}

        {/* Issues Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
          {/* Duplicate Intents */}
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fca5a5', margin: '0 0 14px 0' }}>
              ⚠️ Duplicate Intent Pairs ({duplicates.length})
            </h3>
            {duplicates.length === 0 ? (
              <p style={{ color: '#22c55e', fontSize: '13px' }}>✅ No duplicate intents detected</p>
            ) : duplicates.map((d: any, i: number) => (
              <div key={i} style={{ marginBottom: '10px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: '#f87171' }}>{Math.round(d.similarity * 100)}% overlap</div>
                <div style={{ fontSize: '12px', color: '#d1d5db', marginTop: '4px' }}>"{d.titleA}"</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>↔ "{d.titleB}"</div>
              </div>
            ))}
          </div>

          {/* Thin Content */}
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fcd34d', margin: '0 0 14px 0' }}>
              🚨 Thin Content Risks ({thinRisks.length})
            </h3>
            {thinRisks.length === 0 ? (
              <p style={{ color: '#22c55e', fontSize: '13px' }}>✅ No thin content risks</p>
            ) : thinRisks.slice(0, 6).map((r: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px 10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#e5e7eb', fontWeight: 600 }}>{r.title}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{r.wordCount} words · {r.entityType}</div>
                </div>
                <RiskBadge risk={r.crawlRisk} />
              </div>
            ))}
          </div>
        </div>

        {/* Best Performers */}
        {best.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
              🏆 Best Performing Entities
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '12px' }}>
              {best.slice(0, 6).map((e: any, i: number) => (
                <div key={i} style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', padding: '2px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', color: '#9ca3af' }}>{e.entityType}</span>
                    <span style={{ fontSize: '11px', color: '#4ade80' }}>🏅 #{i + 1}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#e5e7eb', marginBottom: '10px', lineHeight: 1.3 }}>{e.title}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', color: '#9ca3af' }}>
                    <span>Density: <strong style={{ color: '#a78bfa' }}>{e.densityScore}</strong></span>
                    <span>Quality: <strong style={{ color: '#60a5fa' }}>{e.qualityScore}</strong></span>
                    <span>Cache: <strong style={{ color: '#34d399' }}>{e.cacheabilityScore}</strong></span>
                    <span>Tier 0: <strong style={{ color: '#fbbf24' }}>{e.tier0Potential}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Entity Table */}
        {entities.length > 0 && (
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>
              📋 All Entities ({entities.length})
            </h2>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['Type', 'Title', 'Words', 'Density', 'Quality', 'Overlap', 'Crawl Risk', 'Tier 0', 'Hallucination', 'Verdict'].map((h) => (
                        <th key={h} style={{ padding: '12px 14px', textAlign: 'left', color: '#9ca3af', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entities.map((e: any, i: number) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                        <td style={{ padding: '10px 14px', color: '#818cf8', fontWeight: 600, whiteSpace: 'nowrap' }}>{e.entityType}</td>
                        <td style={{ padding: '10px 14px', color: '#e5e7eb', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={e.title}>{e.title}</td>
                        <td style={{ padding: '10px 14px', color: e.wordCount < 150 ? '#ef4444' : '#6b7280' }}>{e.wordCount}</td>
                        <td style={{ padding: '10px 14px' }}><ScoreBadge score={e.densityScore} /></td>
                        <td style={{ padding: '10px 14px' }}><ScoreBadge score={e.qualityScore} /></td>
                        <td style={{ padding: '10px 14px', color: e.overlapScore > 0.5 ? '#ef4444' : '#6b7280' }}>{Math.round(e.overlapScore * 100)}%</td>
                        <td style={{ padding: '10px 14px' }}><RiskBadge risk={e.crawlRisk} /></td>
                        <td style={{ padding: '10px 14px', color: e.tier0Potential === 'HIGH' ? '#22c55e' : e.tier0Potential === 'MEDIUM' ? '#f59e0b' : '#6b7280' }}>{e.tier0Potential}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center' }}>{e.hallucinationFlag ? '🚨' : '✅'}</td>
                        <td style={{ padding: '10px 14px' }}><RecBadge rec={e.recommendation} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '32px', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#4b5563' }}>
          <span>RouterVia · Stage I-A Audit Dashboard · noindex protected</span>
          <span>Re-run: <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>npx tsx src/server/scripts/audit-stage-1a.ts</code></span>
        </div>
      </div>
    </div>
  );
}
