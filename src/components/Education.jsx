import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, BookOpen, Award, SchoolIcon } from "lucide-react";

// Use distinct icons/colors for each entry to make it "dynamic"
const educationData = [
    {
        degree: "B.E in Computer Engineering",
        institute: "Marathwada Mitra Mandal’s College of Engineering",
        location: "Karvenagar, Pune",
        year: "2026",
        score: "9.60 CGPA",
        description: "Focusing on core computer science concepts, rigorous academic curriculum, and advanced technical skills.",
        icon: GraduationCap,
        gradient: "from-blue-500/10 to-cyan-500/10",
        iconColor: "text-blue-500"
    },
    {
        degree: "Diploma in Computer Science",
        institute: "Puranmal Lahoti Government Polytechnic",
        location: "Latur",
        year: "2023",
        score: "88.11%",
        description: "Built a strong foundation in programming, algorithms, and system architecture with hands-on labs.",
        icon: BookOpen,
        gradient: "from-purple-500/10 to-pink-500/10",
        iconColor: "text-purple-500"
    },
    {
        degree: "Senior Secondary (HSC)",
        institute: "Dayanand Science College",
        location: "Latur",
        year: "2021",
        score: "96.67%",
        description: "Excelled in Science and Mathematics streams, developing strong analytical and problem-solving abilities.",
        icon: Award,
        gradient: "from-amber-500/10 to-orange-500/10",
        iconColor: "text-amber-500"
    },
    {
        degree: "Secondary (SSC)",
        institute: "Shri Mahatma Bashweshwar Vidyalaya",
        location: "Omerga",
        year: "2019",
        score: "92.80%",
        description: "Achieved academic excellence and actively participated in extra-curricular activities.",
        icon: SchoolIcon,
        gradient: "from-emerald-500/10 to-green-500/10",
        iconColor: "text-emerald-500"
    }
];

function TiltCard({ children, className }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]); // Subtle tilt
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

export default function Education() {
    return (
        <section id="education" className="py-24 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[80px]" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
                        Academic <span className="text-gradient">Milestones</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A timeline of my educational journey and qualifications.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Center Line for Desktop */}
                    <div className="absolute left-0 md:left-1/2 top-4 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/5 md:-translate-x-1/2 rounded-full"></div>

                    <div className="space-y-16">
                        {educationData.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse"}`}
                            >
                                {/* Center Dot */}
                                <div className="absolute left-[-6px] md:left-1/2 top-0 w-5 h-5 rounded-full bg-background border-4 border-primary z-20 md:-translate-x-1/2 md:translate-y-6 shadow-[0_0_15px_rgba(var(--primary),0.5)] group-hover:scale-125 transition-transform" />

                                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                                    <TiltCard className="h-full">
                                        <div className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                                            {/* Gradient Background */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl`} />

                                            <div className="relative z-10">
                                                <div className={`inline-block p-3 rounded-2xl bg-white shadow-md mb-4 ${edu.iconColor} ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                                                    <edu.icon className="w-8 h-8" />
                                                </div>

                                                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold mb-4 shadow-lg">
                                                    {edu.year}
                                                </div>

                                                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                    {edu.degree}
                                                </h3>
                                                <h4 className="text-lg font-semibold text-slate-600 mb-4 flex flex-col sm:flex-row gap-2 items-center md:inline-flex md:flex-col md:items-stretch lg:flex-row">
                                                    {edu.institute}
                                                </h4>

                                                <p className="text-slate-500 leading-relaxed mb-6 font-medium">
                                                    {edu.description}
                                                </p>

                                                <div className={`flex items-center gap-4 text-sm font-bold text-primary ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                                    <span className="bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                                                        Score: {edu.score}
                                                    </span>
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
