import { Metadata } from "next";
import ContentAdminDashboard from "./DashboardClient";

export const metadata: Metadata = {
  title: "Admin - Semantic Content Governance",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Semantic Operations Center</h1>
          <p className="text-neutral-400 mt-2">
            Review STAGED AI generation metrics, trust scores, and hallucination flags before releasing to the Knowledge Graph.
          </p>
        </div>
        
        <ContentAdminDashboard />
      </div>
    </div>
  );
}
