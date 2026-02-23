import { useState, useEffect, useRef } from "react";
import { Github, ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onGenerate: (username: string) => void;
  isLoading: boolean;
}

const HeroSection = ({ onGenerate, isLoading }: HeroSectionProps) => {
  const [username, setUsername] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) onGenerate(username.trim());
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      >
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/80" />
      </div>

      {/* Glass Navbar */}
      <nav className="relative z-20 w-full px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="glass rounded-2xl px-5 py-2.5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground tracking-tight">GitFolio</span>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full glass text-sm font-medium text-foreground opacity-0 animate-fade-in-up"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Portfolio Generator
          </div>

          {/* Heading */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6 text-foreground opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.15s" }}
          >
            Your GitHub,
            <br />
            <span className="text-primary">Your Story</span>
          </h1>

          <p
            className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-10 opacity-0 animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            Transform your GitHub profile into a beautiful portfolio in seconds. Simple, elegant, effortless.
          </p>

          {/* Glassmorphism Input */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="relative w-full">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 text-sm"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm soft-shadow hover:scale-[1.03] hover:soft-shadow-lg active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin-slow" />
                  Generating...
                </>
              ) : (
                <>
                  Generate <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
