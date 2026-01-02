import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { getIcon } from "../utils/iconMap";

const Marquee = ({ skills, direction = "left", speed = 20 }) => {
    return (
        <div className="flex overflow-hidden w-full py-6 group relative">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{ ease: "linear", duration: speed, repeat: Infinity }}
                className="flex gap-12 sm:gap-20 shrink-0 px-6 sm:px-10"
            >
                {[...skills, ...skills].map((skill, index) => {
                    const Icon = getIcon(skill.icon);
                    return (
                        <div key={index} className="flex flex-col items-center gap-3 group/icon cursor-pointer">
                            <div
                                className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-white shadow-lg border border-slate-100 group-hover/icon:scale-110 group-hover/icon:shadow-xl transition-all duration-300"
                            >
                                {Icon &&
                                    <Icon
                                        className="w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300"
                                        style={{ color: skill.color }} // Always use brand color for "extraordinary" look
                                    />}
                            </div>
                            <span className="text-sm font-medium text-slate-600 group-hover/icon:text-primary transition-colors">
                                {skill.name}
                            </span>
                        </div>
                    )
                })}
            </motion.div>
        </div>
    );
};

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get('/skills');
                setSkills(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch skills", err);
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) return (
        <div className="py-24 text-center text-muted-foreground animate-pulse">Loading Skills...</div>
    );

    // Split skills if needed or just show all in duplicate marquees
    const firstHalf = skills.slice(0, Math.ceil(skills.length / 2));
    const secondHalf = skills.slice(Math.ceil(skills.length / 2));

    return (
        <section id="skills" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                        Technical <span className="text-gradient">Arsenal</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A collection of powerful tools and technologies I use to build digital experiences.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-col gap-8">
                <Marquee skills={firstHalf.length > 0 ? firstHalf : skills} direction="left" speed={30} />
                <Marquee skills={secondHalf.length > 0 ? secondHalf : skills} direction="right" speed={35} />
            </div>
        </section>
    );
}
