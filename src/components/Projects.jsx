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
    <section id="projects" className="py-24 relative perspective-1000">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[550px]">
          {/* Increased height for better spacing */}
          {projects.map((project, index) => {
            return (
              <div key={index} className="md:col-span-1">
                <TiltCard
                  className="group h-full w-full rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/50 shadow-lg hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all duration-500 overflow-hidden"
                >
                  {/* Glowing Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Grid Lines Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div>
                      {/* Tech Header */}
                      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                          <span className="text-xs font-mono text-primary tracking-widest uppercase">System Online</span>
                        </div>
                        <div className="px-2 py-1 rounded bg-white/5 border border-white/10">
                          <ArrowUpRight className="w-4 h-4 text-primary group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Title & Icons */}
                      <div className="mb-6">
                        <h3 className="text-4xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tight">
                          {project.title}
                        </h3>

                        {/* Tech Stack Bubbles - High Tech Look */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.icons && project.icons.map((iconName, i) => {
                            const Icon = getIcon(iconName);
                            if (!Icon) return null;
                            return (
                              <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-colors" title={iconName}>
                                <Icon className="w-5 h-5" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <p className="text-slate-300 text-lg leading-relaxed font-mono border-l-4 border-white/10 pl-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-4 border-t border-dashed border-white/10">
                      <div className="flex gap-4">
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 text-center rounded bg-transparent border border-white/20 text-sm font-mono text-white hover:bg-white/10 hover:border-white/40 transition-all cursor-none pointer-events-auto flex items-center justify-center gap-2 uppercase tracking-wide group/btn"
                        >
                          <Github className="w-5 h-5 group-hover/btn:text-primary transition-colors" /> <span className="group-hover/btn:text-primary transition-colors">:: Source ::</span>
                        </a>
                        {project.demoLink !== "#" && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-3 text-center rounded bg-primary/20 border border-primary/50 text-sm font-mono text-primary hover:bg-primary/30 hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all cursor-none pointer-events-auto flex items-center justify-center gap-2 uppercase tracking-wide"
                          >
                            <ExternalLink className="w-5 h-5" /> [ Execute ]
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
