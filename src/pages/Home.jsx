import React, { useEffect } from 'react'
import FloatingDock from "../components/FloatingDock";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Achievements from "../components/Achivements";
import Contact from "../components/Contact";
import Spotlight from "../components/Spotlight";
import Education from "../components/Education";

function Home() {
    // Smooth scroll behavior
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground cursor-none">
            <Spotlight />
            <FloatingDock />

            <main className="pb-32"> {/* Added padding bottom so footer isn't covered by dock */}
                <div id="hero">
                    <Hero />
                </div>

                <div id="about">
                    <About />
                </div>

                <div id="education">
                    <Education />
                </div>

                <div id="skills">
                    <Skills />
                </div>
                <div id="experience">
                    <Experience />
                </div>

                <div id="projects">
                    <Projects />
                </div>

                <div id="achievements">
                    <Achievements />
                </div>

                <div id="contact">
                    <Contact />
                </div>
            </main>
        </div>
    )
}

export default Home;
