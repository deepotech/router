import { JsonLd } from "@/lib/seo/schema";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  slug: string;
  verified?: boolean;
}

export function AuthorBio({ name, role, bio, slug, verified = true }: AuthorBioProps) {
  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": role,
    "url": `https://routervia.com/authors/${slug}`,
  };

  return (
    <>
      <JsonLd data={authorSchema} />
      <div className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] mt-10">
        <div className="w-12 h-12 rounded-full bg-[var(--brand-800)] flex items-center justify-center text-[var(--brand-400)] font-bold text-xl flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/authors/${slug}`} className="font-bold text-[var(--text-primary)] hover:text-[var(--brand-400)] transition-colors">
              {name}
            </Link>
            {verified && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <CheckCircle size={12} /> Expert Verified
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--brand-400)] font-medium mb-2">{role}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {bio}
          </p>
        </div>
      </div>
    </>
  );
}
