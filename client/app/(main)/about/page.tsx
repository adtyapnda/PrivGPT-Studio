"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SplashScreen from "../../splashScreen";
import { useState, useEffect } from "react";
import {
  Github,
  Twitter,
  Mail,
  Zap,
  Shield,
  Users,
  Globe,
  Heart,
  Target,
  Award,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function AboutPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your data belongs to you. We champion privacy-preserving AI solutions that keep your conversations completely secure.",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Centric",
      description: "Every feature we build is designed with our users in mind, prioritizing simplicity and effectiveness above all.",
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-500/10",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Accessibility",
      description: "AI should be accessible to everyone, regardless of technical expertise or geographical location.",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Innovation",
      description: "We continuously push boundaries to bring you the latest advancements in AI technology.",
      gradient: "from-rose-500 to-pink-500",
      bg: "bg-rose-500/10",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users", gradient: "from-blue-500 to-cyan-400" },
    { value: "2M+", label: "Conversations", gradient: "from-violet-500 to-purple-400" },
    { value: "15+", label: "AI Models", gradient: "from-emerald-500 to-teal-400" },
    { value: "99.9%", label: "Uptime", gradient: "from-rose-500 to-pink-400" },
  ];

  const team = [
    {
      name: "Bob Walten",
      role: "Founder & CEO",
      bio: "Former AI researcher with 10+ years experience. Passionate about democratizing AI and building user-centric products.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      initials: "BW",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Alisa Jones",
      role: "Product Manager",
      bio: "Expert in product strategy and user experience. Focused on making complex AI interactions simple and intuitive.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      initials: "AJ",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      name: "Alice Roy",
      role: "Lead Developer",
      bio: "Full-stack developer specialized in AI integration and privacy-preserving technologies. Loves clean code and great UX.",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      initials: "AR",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const differentiators = [
    "Dual-mode architecture supporting both cloud and local AI",
    "Privacy-first design with optional offline capabilities",
    "Seamless model switching without losing conversation context",
    "Open-source commitment to transparency and community",
    "Enterprise-grade security with consumer-friendly UX",
  ];

  return (
    <>
      <Head>
        <title>About Us | PrivGPT Studio - Our Mission, Team &amp; AI Vision</title>
        <meta
          name="description"
          content="Meet the team behind PrivGPT Studio. Learn about our mission to democratize AI with privacy-first solutions."
        />
        <link rel="canonical" href="https://privgpt-studio.vercel.app/about" />
      </Head>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .fade-up   { animation: fadeUp 0.6s ease both; }
        .delay-1   { animation-delay: 0.1s; }
        .delay-2   { animation-delay: 0.2s; }
        .delay-3   { animation-delay: 0.3s; }
        .delay-4   { animation-delay: 0.4s; }
        .shimmer-text {
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #6366f1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .float-icon { animation: float 3s ease-in-out infinite; }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .gradient-border {
          position: relative;
          background: hsl(var(--card));
          border-radius: 16px;
        }
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1.5px;
          border-radius: 16px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gradient-border:hover::before { opacity: 1; }
      `}</style>

      <div className={`min-h-screen bg-background overflow-x-hidden ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>

        {/* ── Hero ── */}
        <section className="relative py-28 px-4 text-center overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="fade-up">
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                About PrivGPT Studio
              </Badge>
            </div>
            <h1 className="fade-up delay-1 text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="shimmer-text">Building AI</span>
              <br />
              <span className="text-foreground">That Respects You</span>
            </h1>
            <p className="fade-up delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              At{" "}
              <span className="font-semibold text-foreground">PrivGPT Studio</span>
              , we believe AI should be powerful, accessible, and private — giving you the best of cloud and local models without compromise.
            </p>
            <div className="fade-up delay-3 mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/chat">
                <Button size="lg" className="gap-2 px-8 rounded-full shadow-lg">
                  <Zap className="w-4 h-4" />
                  Try Our Chat
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2 px-8 rounded-full">
                <Mail className="w-4 h-4" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 px-4 bg-muted/40 border-y border-border/50">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`fade-up delay-${i + 1} text-center p-6 rounded-2xl bg-background border border-border/50 card-hover`}
                >
                  <div className={`text-4xl md:text-5xl font-extrabold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">How It All Began</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="gradient-border card-hover p-8 rounded-2xl border border-border/50 bg-card">
                <h3 className="text-2xl font-bold mb-4">The Vision</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Founded in 2024, PrivGPT Studio emerged from a simple yet powerful idea: AI should be accessible, private, and tailored to individual needs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We recognized the growing tension between the convenience of cloud-based AI and the necessity of data privacy — so we built a platform that offers both.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary/20 via-blue-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center float-icon border border-primary/20">
                    <Lightbulb className="w-28 h-28 text-primary drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 px-4 bg-muted/40 border-y border-border/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-4">What We Stand For</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                These principles guide every decision we make as we build the future of AI.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, i) => (
                <div
                  key={val.title}
                  className={`gradient-border card-hover fade-up delay-${i + 1} p-6 rounded-2xl border border-border/50 bg-card text-center`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.gradient} flex items-center justify-center mx-auto mb-5 text-white shadow-lg`}>
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission & Goals ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Mission &amp; Goals</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* What We Stand For */}
              <div className="gradient-border card-hover p-8 rounded-2xl border border-border/50 bg-card">
                <h3 className="text-xl font-bold mb-6">What We Stand For</h3>
                <div className="space-y-6">
                  {[
                    { icon: <Target className="w-5 h-5" />, title: "Empower Choice", desc: "Give users the freedom to choose between cloud and local AI models based on their specific needs and privacy requirements.", gradient: "from-blue-500 to-cyan-500" },
                    { icon: <Shield className="w-5 h-5" />, title: "Protect Privacy", desc: "Ensure that users maintain complete control over their data while still accessing powerful AI capabilities.", gradient: "from-violet-500 to-purple-500" },
                    { icon: <Award className="w-5 h-5" />, title: "Drive Innovation", desc: "Push the boundaries of what's possible with AI while maintaining ethical standards and user trust.", gradient: "from-emerald-500 to-teal-500" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Sets Us Apart */}
              <div className="gradient-border card-hover p-8 rounded-2xl border border-border/50 bg-card">
                <h3 className="text-xl font-bold mb-6">What Sets Us Apart</h3>
                <div className="space-y-4">
                  {differentiators.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-20 px-4 bg-muted/40 border-y border-border/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <Badge variant="outline" className="mb-4">The People</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Meet the Team</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Passionate builders working to make AI private, powerful, and accessible to everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  className={`gradient-border card-hover fade-up delay-${i + 1} p-6 rounded-2xl border border-border/50 bg-card text-center`}
                >
                  <div className="relative inline-block mb-4">
                    <div className={`w-2 h-full absolute -inset-1 bg-gradient-to-b ${member.gradient} rounded-full opacity-0`} />
                    <Avatar className="w-24 h-24 mx-auto ring-4 ring-border">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className={`text-lg font-bold bg-gradient-to-br ${member.gradient} text-white`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center`}>
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3 text-xs">{member.role}</Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    {[Github, Twitter, Mail].map((Icon, idx) => (
                      <Button key={idx} variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                        <Icon className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 container mx-auto text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Ready to get started?
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Let&apos;s Build Something{" "}
              <span className="shimmer-text">Amazing Together</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Have questions about our mission, want to join our team, or interested in partnerships? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 px-8 rounded-full shadow-lg">
                <Mail className="w-4 h-4" />
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/chat">
                <Button variant="outline" size="lg" className="gap-2 px-8 rounded-full">
                  <Zap className="w-4 h-4" />
                  Try Our Chat
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}