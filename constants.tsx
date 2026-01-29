import { CMSData } from './types';

export const INITIAL_CMS_DATA: CMSData = {
  config: {
    siteTitle: "METAFOR",
    tagline: "Integrated Brand Management Group",
    seoDescription: "METAFOR represents the convergence of DNA, strategy, and creative execution for global brands.",
    accentColor: "#FF5E00",
    contactEmail: "info@metaforkorea.com",
    address: "6F, Sejong Bldg. 732, Eonju-ro, Gangnam-gu, Seoul"
  },
  services: [
    {
      id: "1",
      title: "Brand DNA Analysis",
      description: "Decoding the core essence of your business to create a timeless strategic foundation.",
      icon: "Sparkles"
    },
    {
      id: "2",
      title: "Global Market Entry",
      description: "Navigating cross-border complexities with localized cultural intelligence.",
      icon: "Globe"
    },
    {
      id: "3",
      title: "Experiential Tech",
      description: "Blending physical environments with immersive digital layers using XR/AR.",
      icon: "Cpu"
    },
    {
      id: "4",
      title: "Growth Architecture",
      description: "Engineered marketing funnels that scale with your brand's evolution.",
      icon: "Target"
    }
  ],
  news: [
    {
      id: "n1",
      title: "The Convergence of DNA and Strategy",
      excerpt: "Exploring how internal brand values translate into external market dominance.",
      content: "Full article content about brand strategy...",
      date: "2024.10.15",
      category: "Insight",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "n2",
      title: "METAFOR expands to South East Asia",
      excerpt: "A new chapter for our integrated brand management services in Singapore.",
      content: "Full article content about expansion...",
      date: "2024.11.02",
      category: "News",
      imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2070&auto=format&fit=crop"
    }
  ],
  process: [
    { id: "p1", title: "Discovery & Audit", description: "Phase 01 involves rigorous deep-dives and stakeholder alignment." },
    { id: "p2", title: "Strategic Synthesis", description: "Phase 02 connects abstract data into a coherent brand metaphor." },
    { id: "p3", title: "Creative Engineering", description: "Phase 03 transforms strategy into tangible visual and digital assets." },
    { id: "p4", title: "Launch & Sustain", description: "Phase 04 ensures the brand survives and thrives in the open market." }
  ],
  contact: {
    phone: "+82 (0)2 555 1234",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.4446337299047!2d127.037418!3d37.521021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3f70359873d%3A0x6d9f34f77c38708c!2z7IS47KKF67mM65Sp!5e0!3m2!1sen!2skr!4v1715423000000!5m2!1sen!2skr"
  }
};