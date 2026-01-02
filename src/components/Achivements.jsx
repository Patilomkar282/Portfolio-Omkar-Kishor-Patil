import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, BadgeCheck, Users, Code, ExternalLink } from "lucide-react";
import api from "../services/api";
import { getIcon } from "../utils/iconMap";

// Stats are hardcoded for now, but Achievements are dynamic
const stats = [
  { label: "Problems Solved", value: "300+", icon: Code },
  { label: "Team Projects", value: "15+", icon: Users },
  { label: "Certifications", value: "5+", icon: BadgeCheck }
];

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get('/achievements');
        setAchievements(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch achievements", err);
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Achievements & <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recognition and milestones on my journey to excellence.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass p-6 rounded-xl hover:border-primary/30 transition-colors text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 text-primary mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Achievements Cards */}
        {loading ? (
          <div className="text-center text-muted-foreground animate-pulse">Loading Achievements...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.sort((a, b) => {
              // Prioritize Hackathon wins
              const isHackathonA = a.title.toLowerCase().includes("hackathon") || a.category.toLowerCase().includes("hackathon");
              const isHackathonB = b.title.toLowerCase().includes("hackathon") || b.category.toLowerCase().includes("hackathon");
              if (isHackathonA && !isHackathonB) return -1;
              if (!isHackathonA && isHackathonB) return 1;
              return 0;
            }).map((achievement, index) => {
              const Icon = getIcon(achievement.icon) || BadgeCheck;
              const isHackathonWin = achievement.title.toLowerCase().includes("hackathon") || achievement.category.toLowerCase().includes("hackathon");

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`
                    relative p-8 rounded-2xl group transition-all duration-300
                    ${isHackathonWin
                      ? "bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)] md:col-span-2 lg:col-span-1 lg:row-span-2 scale-105 z-10"
                      : "glass hover:bg-secondary/20 border-none"
                    }
                  `}
                >
                  {isHackathonWin && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                      <Star className="w-3 h-3 fill-current" /> Winner
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-lg ${isHackathonWin ? "bg-yellow-500/20 text-yellow-500" : "bg-primary/10 text-primary"}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isHackathonWin ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-white/5 text-muted-foreground border-white/5"}`}>
                      {achievement.category}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isHackathonWin ? "text-yellow-500" : "text-foreground group-hover:text-primary"}`}>
                    {achievement.title}
                  </h3>
                  {achievement.organization && (
                    <p className={`text-sm mb-3 font-medium ${isHackathonWin ? "text-amber-400" : "text-primary"}`}>
                      {achievement.organization}
                    </p>
                  )}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {achievement.description}
                  </p>

                  {achievement.certificateLink && (
                    <a
                      href={achievement.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        inline-flex items-center gap-2 text-sm font-bold bg-secondary/30 hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition-all duration-300
                        ${isHackathonWin ? "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500 hover:text-white mt-2" : "text-primary"}
                      `}
                    >
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  );
}
