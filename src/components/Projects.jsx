import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import api from "../services/api";
import { getIcon } from "../utils/iconMap";

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-300 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="py-24 text-center text-muted-foreground animate-pulse">Loading Projects...</div>
  );

  return (
    <section id="projects" className="py-24 bg-secondary/30 relative perspective-1000">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Interact with the cards to see the 3D depth effect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[450px]">
          {/* Increased height for better spacing */}
          {projects.map((project, index) => {
            // Determine colSpan based on index or property if you want to keep the layout (Optional)
            // For now, let's keep it dynamic or default to 1.
            // If you stored 'colSpan' in DB, use it. In seed I didn't explicitly add colSpan but I can add it if needed.
            // Actually, in the seed data I missed 'colSpan'. I will default to 1 for now to be safe.

            return (
              <div key={index} className="md:col-span-1">
                <TiltCard
                  className="group h-full w-full rounded-4xl bg-white border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle Color Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        {/* Floating Icon Row */}
                        <div className="flex -space-x-3">
                          {project.icons && project.icons.map((iconName, i) => {
                            const Icon = getIcon(iconName);
                            if (!Icon) return null;
                            return (
                              <div key={i} className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center relative z-10 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                                <Icon className="w-5 h-5 text-slate-700" />
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                          <ArrowUpRight className="w-6 h-6 text-foreground group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                      </div>

                      <h3 className="text-3xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Action Buttons */}
                      <div className="flex gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 text-center rounded-xl bg-white shadow-md hover:shadow-lg text-foreground font-bold text-sm transition-all cursor-none pointer-events-auto flex items-center justify-center gap-2 border border-slate-100"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                        {project.demoLink !== "#" && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 text-center rounded-xl bg-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 text-white font-bold text-sm transition-all cursor-none pointer-events-auto flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
