import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import InteractiveEffects from "@/components/InteractiveEffects";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function HomePage() {
  return (
    <main className="app-shell min-h-screen overflow-x-hidden pb-10">
      <InteractiveEffects />
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(300px,390px)_minmax(0,1fr)]">
          <Hero />

          <div className="space-y-8">
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
