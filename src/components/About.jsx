import React from "react";
import { motion } from "framer-motion";
import { User, Code, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-secondary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Picture Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.3)] animate-pulse" />
              <div className="absolute inset-2 rounded-full border border-purple-500/30" />

              {/* Image Placeholder */}
              <div className="absolute inset-4 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center border border-white/10 group">
                <User className="w-32 h-32 text-muted-foreground/50 group-hover:text-primary transition-colors duration-500" />
                <img src="/images/profile.jpeg" alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-primary font-bold">Hello World!</span>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 p-3 bg-background border border-primary/30 rounded-xl shadow-lg flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <span className="text-xs font-bold">Dev</span>
              </div>
              <div className="absolute -bottom-4 -left-4 p-3 bg-background border border-purple-500/30 rounded-xl shadow-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-500" />
                <span className="text-xs font-bold">9.6 CGPA</span>
              </div>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p className="text-foreground font-medium text-xl">
              I'm <span className="text-primary">Omkar Patil</span>, a passionate technologist and problem solver.
            </p>
            <p>
              Currently pursuing my B.E. in Information Technology, I bridge the gap between academic theory and practical application. With a strong foundation in the <span className="text-primary">MERN stack</span> and a keen eye for UI/UX design, I build applications that are not just functional but also delightful to use.
            </p>
            <p>
              My journey involves deep dives into scalable backend architectures, crafting responsive frontends, and exploring the frontiers of AI/ML integration. I thrive in challenging environments where innovation is the currency.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h4 className="text-foreground font-bold mb-1">Location</h4>
                <p className="text-sm">Pune, India</p>
              </div>
              <div>
                <h4 className="text-foreground font-bold mb-1">Availability</h4>
                <p className="text-sm text-green-400">Open to Opportunities</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
