import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch('https://portfolio-omkar-kishor-patil.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        alert("Failed to send message. Please try again.");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message.");
      setStatus("idle");
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "Patilomkar2820@gmail.com", href: "mailto:Patilomkar2820@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 8999937124", href: "tel:+918999937124" },
    { icon: MapPin, label: "Location", value: "Pune, Maharashtra", href: "#" }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Footer background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl pointer-events-none" />
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="text-xs font-mono text-primary uppercase tracking-widest block mb-2 ml-1">Identity Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary/50 text-lg py-6 rounded-xl font-medium placeholder:text-slate-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-primary uppercase tracking-widest block mb-2 ml-1">Electronic Mail</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary/50 text-lg py-6 rounded-xl font-medium placeholder:text-slate-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-primary uppercase tracking-widest block mb-2 ml-1">Transmission Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary/50 text-lg py-4 rounded-xl font-medium placeholder:text-slate-500 min-h-[150px] transition-all"
                  placeholder="Initiating contact protocol..."
                />
              </div>
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-black py-7 text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all rounded-xl"
              >
                {status === "submitting" ? "Transmitting..." : status === "success" ? "Transmission Sent!" : "Execute Transmission"}
                <Send className="w-5 h-5 ml-2 animate-pulse" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Frequency", value: "Patilomkar2820@gmail.com", href: "mailto:Patilomkar2820@gmail.com" },
                { icon: Phone, label: "Communication Line", value: "+91 8999937124", href: "tel:+918999937124" },
                { icon: MapPin, label: "Base Coordinates", value: "Pune, Maharashtra", href: "#" }
              ].map((item, idx) => (
                <a key={idx} href={item.href} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-primary/50 group cursor-pointer pointer-events-auto shadow-lg hover:translate-x-2 duration-300">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <h4 className="font-mono text-primary font-bold uppercase tracking-widest">Status: Operational</h4>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Currently available for <span className="text-white font-bold">full-time positions</span> and <span className="text-white font-bold">freelance projects</span>.
                Ready to deploy skills to your team.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 text-center text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Omkar Patil. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Patilomkar282" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/omkar-patil-373303224" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:patilomkar2820@gmail.com" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}