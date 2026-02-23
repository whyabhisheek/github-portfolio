import { Star, GitFork, Code, Users, BookOpen, ExternalLink } from "lucide-react";
import RepoCard, { type Repo } from "./RepoCard";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface PortfolioDisplayProps {
  user: GitHubUser;
  repos: Repo[];
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  Ruby: "#cc342d",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  C: "#555555",
  "C++": "#f34b7d",
};

const getLanguageFromRepos = (repos: Repo[]): string[] => {
  const languages = new Set<string>();
  repos.forEach((repo) => {
    if (repo.language) languages.add(repo.language);
  });
  return Array.from(languages).slice(0, 8);
};

const PortfolioDisplay = ({ user, repos }: PortfolioDisplayProps) => {
  const topRepos = repos.slice(0, 8);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const languages = getLanguageFromRepos(repos);

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Section */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-32 h-32 rounded-full border-4 border-white/30 shadow-xl"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">{user.name || user.login}</h1>
              <p className="text-lg opacity-90">@{user.login}</p>
              <p className="mt-3 text-lg opacity-80 max-w-xl">
                Hi 👋, I'm {user.name || user.login}
                {user.bio && `. ${user.bio}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-wrap justify-center md:justify-start gap-8">
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold text-xl">{user.public_repos}</span>
            </div>
            <p className="text-sm text-gray-500">public repos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center text-gray-600">
              <Users className="w-5 h-5" />
              <span className="font-semibold text-xl">{user.followers}</span>
            </div>
            <p className="text-sm text-gray-500">followers</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center text-gray-600">
              <GitFork className="w-5 h-5" />
              <span className="font-semibold text-xl">{user.following}</span>
            </div>
            <p className="text-sm text-gray-500">following</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center text-gray-600">
              <Star className="w-5 h-5" />
              <span className="font-semibold text-xl">{totalStars}</span>
            </div>
            <p className="text-sm text-gray-500">total stars</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              As a developer, <span className="font-semibold">@{user.login}</span> has built an impressive portfolio of{' '}
              <span className="font-semibold">{user.public_repos} public repositories</span>, 
              showcasing their versatility across various programming languages and technologies.
            </p>
            <p>
              With <span className="font-semibold">{user.followers} followers</span> and{' '}
              <span className="font-semibold">{user.following} following</span>, they demonstrate strong community engagement 
              and the ability to collaborate on open-source projects.
            </p>
            <p>
              Their repositories have collectively earned <span className="font-semibold">{totalStars} stars</span>, 
              indicating significant impact and recognition from the developer community.
            </p>
            {user.bio && (
              <p>{user.bio}</p>
            )}
            <p>
              Through continuous learning and project development, {user.name || user.login} continues to expand their skills 
              in software engineering, contributing meaningfully to the tech ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {languages.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColors[lang] || "#666" }}
                  />
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Featured Repositories */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Work</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            Show all {user.public_repos} projects <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topRepos.map((repo, i) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100 hover:border-gray-200"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{repo.name}</h3>
                <div className="flex items-center gap-1 text-gray-500">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{repo.stargazers_count}</span>
                </div>
              </div>
              <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                {repo.description || "No description provided."}
              </p>
              <div className="mt-4 flex items-center gap-4">
                {repo.language && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: languageColors[repo.language] || "#666" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks_count}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDisplay;
export type { GitHubUser };
