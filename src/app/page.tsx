import CertificateSection from "@/components/CertificateSection";
import FeatureSection from "@/components/FeatureSection";
import Hero from "@/components/Hero";
import HowItWorksSection from "@/components/how-it-works";
import ProjectSection from "@/components/ProjectSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeatureSection />
      <HowItWorksSection />
      <ProjectSection />
      <CertificateSection />
    </main>
  );
}
