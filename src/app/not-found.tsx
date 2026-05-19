import Link from "next/link";
import { AlertCircle, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="glass-card p-10 max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-red-900/20 border border-red-800/50 flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-red-400" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          We couldn&apos;t find the router, guide, or IP address you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button variant="primary" size="md" fullWidth>
              <Home size={16} /> Return Home
            </Button>
          </Link>
          <Link href="/routers">
            <Button variant="secondary" size="md" fullWidth>
              <Search size={16} /> Browse Routers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
