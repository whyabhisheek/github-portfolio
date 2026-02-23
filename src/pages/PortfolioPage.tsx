import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import PortfolioDisplay, { type GitHubUser } from "@/components/PortfolioDisplay";
import type { Repo } from "@/components/RepoCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const API_BASE = "/api/v1";

const PortfolioPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const username = searchParams.get("user");
  
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (username) {
      handleGenerate(username);
    }
  }, [username]);

  const handleGenerate = async (username: string) => {
    setIsLoading(true);

    try {
      const userRes = await axios.get(`${API_BASE}/github/${username}`);
      const { profile, repos: reposData } = userRes.data;

      const transformedUser: GitHubUser = {
        login: username,
        avatar_url: profile.avatar_url,
        name: profile.name,
        bio: profile.bio,
        location: null,
        blog: null,
        public_repos: reposData.length,
        followers: profile.followers,
        following: profile.following,
        html_url: `https://github.com/${username}`,
      };

      const transformedRepos: Repo[] = reposData.map((repo: any) => ({
        id: Math.random(),
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stars,
        forks_count: 0,
        language: repo.language,
      }));

      await axios.post(`${API_BASE}/portfolio`, {
        github_username: username,
        data: userRes.data,
      });

      setUser(transformedUser);
      setRepos(transformedRepos);
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("User not found. Please check the username and try again.");
      } else {
        toast.error("Failed to generate portfolio. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating portfolio...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No portfolio data found</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>
      <PortfolioDisplay user={user} repos={repos} />
    </div>
  );
};

export default PortfolioPage;
