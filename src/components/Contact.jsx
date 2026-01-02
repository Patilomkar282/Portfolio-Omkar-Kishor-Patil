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
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
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
            className="glass p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-white/10 text-white focus:border-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-white/10 text-white focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-white/10 text-white focus:border-primary min-h-[150px]"
                  placeholder="Your message here..."
                />
              </div>
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-6 text-lg"
              >
                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                <Send className="w-5 h-5 ml-2" />
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
                { icon: Mail, label: "Email", value: "Patilomkar2820@gmail.com", href: "mailto:Patilomkar2820@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 8999937124", href: "tel:+918999937124" },
                { icon: MapPin, label: "Location", value: "Pune, Maharashtra", href: "#" }
              ].map((item, idx) => (
                <a key={idx} href={item.href} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-white/5 cursor-pointer pointer-events-auto">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="text-lg font-bold text-foreground">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <h4 className="font-bold text-lg mb-2">Open to Work</h4>
              <p className="text-muted-foreground">
                I am currently available for full-time positions and freelance projects.
                Let's discuss how I can contribute to your team.
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