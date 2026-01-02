import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, User, Briefcase, Cpu, Mail, Star } from "lucide-react";

const navLinks = [
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Simple implementation of scroll spy
            const sections = navLinks.map((link) => link.href.substring(1));
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 200) {
                    current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
    };

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors">
                        <span className="text-xl font-bold text-primary group-hover:text-white transition-colors">O</span>
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-lg font-bold text-foreground font-mono tracking-tighter hover:text-primary transition-colors">
                        Omkar<span className="text-primary">.dev</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`relative text-sm font-medium transition-colors ${activeSection === link.href.substring(1)
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                {link.name}
                            </span>
                            {activeSection === link.href.substring(1) && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_var(--primary)]"
                                />
                            )}
                        </a>
                    ))}
                    <a
                        href="https://drive.google.com/file/d/1nzENDlgQpmfxLIcEWqCCtdgXxw1qiDSE/view?usp=sharing" // Placeholder path
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-all shadow-[0_0_10px_rgba(var(--primary),0.2)] hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-4 text-lg font-medium p-2 rounded-lg transition-colors ${activeSection === link.href.substring(1)
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        }`}
                                >
                                    <link.icon size={20} />
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="https://drive.google.com/file/d/1nzENDlgQpmfxLIcEWqCCtdgXxw1qiDSE/view?usp=sharing"
                                className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
