import { Star, GitFork, Circle } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const languageColors: Record<string, string> = {
  TypeScript: "hsl(210 80% 60%)",
  JavaScript: "hsl(45 90% 55%)",
  Python: "hsl(210 55% 55%)",
  Rust: "hsl(25 75% 55%)",
  Go: "hsl(195 65% 50%)",
  Java: "hsl(20 75% 55%)",
  Ruby: "hsl(0 65% 55%)",
  CSS: "hsl(280 55% 60%)",
  HTML: "hsl(15 75% 55%)",
  Shell: "hsl(140 45% 50%)",
  C: "hsl(210 40% 55%)",
  "C++": "hsl(340 50% 55%)",
};

const RepoCard = ({ repo }: { repo: Repo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block p-6 rounded-2xl glass hover:scale-[1.02] hover:soft-shadow-lg transition-all duration-300"
  >
    <h3 className="text-base font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
      {repo.name}
    </h3>
    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] leading-relaxed">
      {repo.description || "No description provided."}
    </p>
    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
      {repo.language && (
        <span className="flex items-center gap-1.5">
          <Circle className="w-3 h-3 fill-current" style={{ color: languageColors[repo.language] || "hsl(var(--muted-foreground))" }} />
          {repo.language}
        </span>
      )}
      <span className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
      </span>
      <span className="flex items-center gap-1">
        <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
      </span>
    </div>
  </a>
);

export default RepoCard;
export type { Repo };
