import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { SiLeetcode, SiHackerrank } from "react-icons/si";
import { motion, useScroll, useTransform } from "framer-motion";

const TypingEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink(!blink);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-primary font-mono font-bold">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden w-full bg-background"
    >
      {/* Dynamic Background Particles (Light Mode Compatible) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/20 rounded-full blur-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100],
              x: [null, Math.random() * 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
            }}
          />
        ))}
        {/* Soft Gradient Mesh */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/10 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black text-foreground mb-6 tracking-tight">
            <span className="block">Hi, I'm</span>
            <span className="text-gradient">
              Omkar Patil
            </span>
          </h1>
        </motion.div>

        {/* Subtitle with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-20 md:h-24"
        >
          <p className="text-xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            I am a <TypingEffect words={["Full-Stack Developer", "MERN Stack Specialist", "UI/UX Enthusiast", "Problem Solver"]} />
          </p>
        </motion.div>

        {/* Buttons & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Button
            onClick={scrollToAbout}
            className="group relative px-8 py-6 text-lg font-bold overflow-hidden rounded-full bg-foreground text-background shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Work <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>

          <Button
            asChild
            className="group relative px-8 py-6 text-lg font-bold overflow-hidden rounded-full bg-white/5 text-foreground border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:border-primary/50 backdrop-blur-sm"
          >
            <a href="https://drive.google.com/file/d/1nzENDlgQpmfxLIcEWqCCtdgXxw1qiDSE/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <span className="relative z-10 flex items-center gap-2">
                Download Resume <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </a>
          </Button>

          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: "https://linkedin.com/in/omkar-patil-373303224" },
              { icon: Github, href: "https://github.com/Patilomkar282" },
              { icon: SiLeetcode, href: "https://leetcode.com/u/Omkar-282/" },
              { icon: SiHackerrank, href: "https://www.hackerrank.com/profile/Patilomkar2820" },
              { icon: Mail, href: "mailto:patilomkar2820@gmail.com" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="p-4 rounded-full bg-white/5 text-muted-foreground border border-white/10 shadow-md backdrop-blur-sm
                           hover:text-primary hover:border-primary hover:shadow-lg hover:bg-white/10
                           transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats Section with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-lg"
        >
          {[
            { value: "9.60", label: "CGPA", color: "text-primary" },
            { value: "2+", label: "Years Experience", color: "text-blue-500" },
            { value: "10+", label: "Projects", color: "text-purple-500" },
            { value: "5+", label: "Technologies", color: "text-orange-500" }
          ].map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className={`text-4xl font-black ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
