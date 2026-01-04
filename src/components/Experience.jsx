import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, Laptop, Layout, Database, ExternalLink } from "lucide-react";

// Helper for 3D Tilt Effect (Reusable Logic)
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      <div style={{ transform: "translateZ(20px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}

const experiences = [
  {
    title: "MERN Stack Developer Intern",
    company: "Nexrage",
    period: "Aug 2025 – Present",
    location: "Remote",
    description: "Architecting scalable web solutions using the MERN stack. Focusing on performance optimization, component reusability, and implementing modern React patterns.",
    skills: ["React", "Node.js", "Redux", "MongoDB"],
    icon: Laptop,
    gradient: "from-blue-500/10 to-indigo-500/10",
    iconColor: "text-blue-600",
    certificateLink: "https://drive.google.com/"
  },
  {
    title: "Full Stack Intern",
    company: "Athena Automation",
    period: "Dec 2024 – Feb 2025",
    location: "Hybrid (Pune)",
    description: "Developed automated workflows and integrated third-party APIs for seamless data synchronization. Enhanced system reliability by 20% through rigorous testing.",
    skills: ["MySQL", "Express", "API Integration", "Node.js"],
    icon: Database,
    gradient: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-600",
    certificateLink: "https://drive.google.com/file/d/11zoJp1dX9xUK8dXh_SmJ9OjcN573a_8y/view?usp=sharing"
  },
  {
    title: "Software Development Intern",
    company: "Educadd Software",
    period: "June 2022 – Aug 2022",
    location: "Latur",
    description: "Assisted in the development of educational software modules. Gained hands-on experience with version control (Git) and agile development methodologies.",
    skills: ["Java", "SQL", "Git", "OOPs"],
    icon: Layout,
    gradient: "from-orange-500/10 to-amber-500/10",
    iconColor: "text-orange-600",
    certificateLink: "https://drive.google.com/file/d/1kVS448MQYoAbFY0b9Gy4Umhcdx56ZO6D/view?usp=sharing"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world experience building robust applications and solving complex problems.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Center Line */}
          <div className="absolute left-0 md:left-1/2 top-4 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/5 md:-translate-x-1/2 rounded-full"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse"}`}
              >
                {/* Center Node */}
                <div className="absolute left-[-6px] md:left-1/2 top-0 w-5 h-5 rounded-full bg-background border-4 border-primary z-20 md:-translate-x-1/2 md:translate-y-6 shadow-[0_0_15px_rgba(var(--primary),0.5)] group-hover:scale-125 transition-transform" />

                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                  <TiltCard className="h-full">
                    <div className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl`} />

                      <div className="relative z-10">
                        <div className={`inline-block p-3 rounded-2xl bg-white shadow-md mb-4 ${exp.iconColor} ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                          <exp.icon className="w-8 h-8" />
                        </div>

                        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold mb-4 shadow-lg">
                          {exp.period}
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <h4 className="text-lg font-semibold text-slate-600 mb-4">{exp.company}</h4>

                        <p className="text-slate-500 leading-relaxed mb-6 font-medium">
                          {exp.description}
                        </p>

                        {/* Tech Stack Bubbles */}
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                          {exp.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-600 shadow-sm group-hover:border-primary/30 group-hover:text-primary transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className={`mt-4 flex flex-wrap items-center gap-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                            <MapPin className="w-4 h-4" /> {exp.location}
                          </div>

                          {exp.certificateLink && (
                            <a
                              href={exp.certificateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all duration-300"
                            >
                              View Certificate <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>

                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}