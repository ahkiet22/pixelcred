import CertificateSection from "@/components/CertificateSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectSection from "@/components/ProjectSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeatureSection />
      <ProjectSection />
      <CertificateSection />
      <Footer />
    </main>
  );
}
