import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, Cpu, Trophy, FileText, Menu, X, GraduationCap } from "lucide-react";

export default function FloatingDock() {
    const [isOpen, setIsOpen] = useState(false);

    const dockItems = [
        { icon: Home, href: "#hero", label: "Home" },
        { icon: User, href: "#about", label: "About" },
        { icon: GraduationCap, href: "#education", label: "Education" },
        { icon: Cpu, href: "#skills", label: "Skills" },
        { icon: Briefcase, href: "#experience", label: "Work" },
        { icon: Code, href: "#projects", label: "Projects" },
        { icon: Trophy, href: "#achievements", label: "Awards" },
        { icon: FileText, href: "https://drive.google.com/file/d/1nzENDlgQpmfxLIcEWqCCtdgXxw1qiDSE/view?usp=sharing", label: "Resume" },
        { icon: Mail, href: "#contact", label: "Contact" },
    ];

    const radius = 200; // Large radius
    const totalItems = dockItems.length;

    const getItemVariants = (index) => {
        const step = Math.PI / (totalItems - 1);
        const angle = -Math.PI / 2 + index * step;

        const x = -radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return {
            closed: { x: 0, y: 0, opacity: 0, scale: 0 },
            open: {
                x,
                y,
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 250, damping: 20, delay: index * 0.05 }
            }
        };
    };

    return (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center interact-container">
            <AnimatePresence>
                {dockItems.map((item, index) => (
                    <motion.a
                        key={index}
                        href={item.href}
                        variants={getItemVariants(index)}
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        onClick={(e) => {
                            if (item.href.startsWith("#")) {
                                e.preventDefault();
                                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                                setIsOpen(false);
                            }
                        }}
                        className="absolute w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/40 z-40"
                        title={item.label}
                    >
                        <item.icon className="w-6 h-6" />

                        <span className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-sm font-bold opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                            {item.label}
                        </span>
                    </motion.a>
                ))}
            </AnimatePresence>

            {/* Main Trigger Icon */}
            <motion.div
                onClick={() => setIsOpen(!isOpen)}
                animate={{ scale: isOpen ? 1.1 : 1, rotate: isOpen ? 90 : 0 }}
                className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center shadow-2xl z-50 relative cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
                {isOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}

                {!isOpen && (
                    <span className="absolute inset-0 rounded-full border-2 border-foreground animate-ping opacity-20 duration-1000" />
                )}
            </motion.div>
        </div>
    );
}
