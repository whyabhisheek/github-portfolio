import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import HeroSection from "@/components/HeroSection";

const API_BASE = "/api/v1";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (username: string) => {
    setIsLoading(true);

    try {
      await axios.get(`${API_BASE}/github/${username}`);
      navigate(`/portfolio?user=${username}`);
      toast.success(`Portfolio generated for ${username}!`);
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

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onGenerate={handleGenerate} isLoading={isLoading} />
    </main>
  );
};

export default Index;
