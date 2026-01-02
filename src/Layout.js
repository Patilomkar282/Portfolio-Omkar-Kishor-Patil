import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, User, Briefcase, Code, Trophy, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Home", href: "#hero", icon: Home },
  { title: "About", href: "#about", icon: User },
  { title: "Experience", href: "#experience", icon: Briefcase },
  { title: "Projects", href: "#projects", icon: Code },
  { title: "Achievements", href: "#achievements", icon: Trophy },
  { title: "Contact", href: "#contact", icon: Mail },
];

export default function Layout({ children, currentPageName }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-lg z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Omkar Patil
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => scrollToSection(item.href)}
                    className="text-slate-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-emerald-400"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => scrollToSection(item.href)}
                    className="text-slate-300 hover:text-emerald-400 px-3 py-2 text-base font-medium transition-colors duration-200 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}